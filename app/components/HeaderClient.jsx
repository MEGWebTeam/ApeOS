'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'

const WP_BASE = process.env.NEXT_PUBLIC_WORDPRESS_URL ?? ''

/**
 * Converts an absolute WordPress URL to a relative path.
 * Truly external URLs (different domain) are returned unchanged.
 */
function resolveHref(url) {
  if (!url) return '/'
  if (url.startsWith('/')) return url
  if (WP_BASE && url.startsWith(WP_BASE)) {
    return url.slice(WP_BASE.length) || '/'
  }
  return url
}

function NavLink({ href, children, className, onClick, ...rest }) {
  const resolved = resolveHref(href)
  const isExternal = resolved.startsWith('http://') || resolved.startsWith('https://')
  if (isExternal) {
    return (
      <a
        href={resolved}
        className={className}
        onClick={onClick}
        target="_blank"
        rel="noopener noreferrer"
        {...rest}
      >
        {children}
      </a>
    )
  }
  return (
    <Link href={resolved} className={className} onClick={onClick} {...rest}>
      {children}
    </Link>
  )
}

function ChevronIcon({ className }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  )
}

function EnvelopeIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
      />
    </svg>
  )
}

export default function HeaderClient({ logo, buttonText, buttonLink, menuItems }) {
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  // Tracks which mobile accordion items are open (by item id)
  const [expandedItems, setExpandedItems] = useState([])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    let lastScrollY = window.scrollY
    const onScroll = () => {
      if (window.scrollY < lastScrollY || window.scrollY < 10) {
        setVisible(true)
      } else {
        setVisible(false)
      }
      lastScrollY = window.scrollY
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleMobileItem = useCallback((id) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }, [])

  const closeMobileMenu = useCallback(() => {
    setMenuOpen(false)
    setExpandedItems([])
  }, [])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a] transition-transform duration-300"
      style={{ transform: mounted && !visible ? 'translateY(-100%)' : 'translateY(0)' }}
    >
      <div className="max-w-[1440px] mx-auto px-6 flex items-center justify-between h-16">

        {/* Logo — links to home */}
        <Link href="/" className="flex-shrink-0">
          {logo ? (
            <img
              src={logo?.url || logo}
              alt={logo?.alt || ''}
              style={{ height: '40px', width: 'auto' }}
            />
          ) : (
            <span className="text-white font-bold text-xl tracking-widest">
              LOGO
            </span>
          )}
        </Link>

        {/* Desktop nav — visible at 1024px+ */}
        <nav className="hidden lg:flex items-center" aria-label="Primary navigation">
          <ul className="flex items-center gap-8">
            {menuItems.map((item) => {
              const hasChildren = item.child_items?.length > 0
              return (
                <li key={item.ID} className="relative group">
                  <NavLink
                    href={item.url}
                    className="flex items-center gap-1 text-white text-sm font-medium tracking-wide hover:text-[#00BCD4] transition-colors duration-200 py-5"
                  >
                    {item.title}
                    {hasChildren && (
                      <ChevronIcon className="w-3 h-3 opacity-60 group-hover:rotate-180 transition-transform duration-200" />
                    )}
                  </NavLink>

                  {/* Desktop dropdown panel */}
                  {hasChildren && (
                    <ul className="absolute top-full left-0 mt-0 min-w-[200px] bg-[#111111] border border-white/10 py-2 hidden group-hover:block z-20">
                      {item.child_items.map((child) => (
                        <li key={child.ID}>
                          <NavLink
                            href={child.url}
                            className="block px-4 py-2.5 text-white text-sm hover:text-[#00BCD4] hover:bg-white/5 transition-colors duration-200"
                          >
                            {child.title}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Right side: CTA / envelope / hamburger */}
        <div className="flex items-center gap-3">

          {/* CTA button — visible at 768px+ */}
          {buttonText && buttonLink && (
            <NavLink
              href={buttonLink}
              className="hidden md:inline-flex items-center px-4 py-1.5 border border-[#00BCD4] text-[#00BCD4] text-sm font-semibold tracking-wide transition-colors duration-300 hover:bg-[#00BCD4] hover:text-black"
            >
              {buttonText}
            </NavLink>
          )}

          {/* Envelope icon — visible below 768px */}
          {buttonLink && (
            <NavLink
              href={buttonLink}
              aria-label="Contact"
              className="md:hidden text-[#00BCD4]"
            >
              <EnvelopeIcon />
            </NavLink>
          )}

          {/* Hamburger — visible below 1024px */}
          <button
            className="lg:hidden flex flex-col justify-center items-center gap-1.5 w-8 h-8 ml-1"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span
              className={`block h-0.5 w-6 bg-white transition-transform duration-300 ${
                menuOpen ? 'translate-y-2 rotate-45' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-white transition-opacity duration-300 ${
                menuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-white transition-transform duration-300 ${
                menuOpen ? '-translate-y-2 -rotate-45' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile drawer — visible below 1024px */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 bg-[#0a0a0a] border-t border-white/10 ${
          menuOpen ? 'max-h-[600px]' : 'max-h-0'
        }`}
      >
        <ul className="flex flex-col px-6 py-3">
          {menuItems.map((item) => {
            const hasChildren = item.child_items?.length > 0
            const isExpanded = expandedItems.includes(item.ID)

            return (
              <li key={item.ID} className="border-b border-white/5 last:border-b-0">

                {/* Row: title + optional expand button */}
                <div className="flex items-center justify-between py-3">
                  {hasChildren ? (
                    /* Parent items with children toggle accordion, don't navigate */
                    <button
                      onClick={() => toggleMobileItem(item.ID)}
                      className="flex-1 text-left text-white text-sm font-medium tracking-wide hover:text-[#00BCD4] transition-colors duration-200"
                    >
                      {item.title}
                    </button>
                  ) : (
                    <NavLink
                      href={item.url}
                      onClick={closeMobileMenu}
                      className="flex-1 text-white text-sm font-medium tracking-wide hover:text-[#00BCD4] transition-colors duration-200"
                    >
                      {item.title}
                    </NavLink>
                  )}

                  {hasChildren && (
                    <button
                      onClick={() => toggleMobileItem(item.ID)}
                      className="p-1 text-white/50 hover:text-white transition-colors duration-200"
                      aria-label={isExpanded ? 'Collapse' : 'Expand'}
                    >
                      <ChevronIcon
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  )}
                </div>

                {/* Mobile accordion children */}
                {hasChildren && (
                  <ul
                    className={`overflow-hidden transition-all duration-300 pl-4 border-l border-white/10 ${
                      isExpanded ? 'max-h-96 pb-2' : 'max-h-0'
                    }`}
                  >
                    {item.child_items.map((child) => (
                      <li key={child.ID}>
                        <NavLink
                          href={child.url}
                          onClick={closeMobileMenu}
                          className="block py-2.5 text-white/70 text-sm hover:text-[#00BCD4] transition-colors duration-200"
                        >
                          {child.title}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </header>
  )
}
