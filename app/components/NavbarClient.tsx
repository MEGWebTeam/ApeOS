'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

type MenuItem = {
  id: number
  title: string
  url: string
}

export default function NavbarClient({ items }: { items: MenuItem[] }) {
  const [visible, setVisible] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)

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

  const lastIndex = items.length - 1

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a] transition-transform duration-300"
      style={{ transform: visible ? 'translateY(0)' : 'translateY(-100%)' }}
    >
      <div className="max-w-[1440px] mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="text-white font-bold text-xl tracking-widest">
          EMPIRE
        </Link>

        {/* Desktop menu */}
        <ul className="hidden md:flex items-center gap-8">
          {items.map((item, index) => (
            <li key={item.id}>
              {index === lastIndex ? (
                <a
                  href={item.url}
                  className="px-4 py-1.5 border border-[#00BCD4] text-[#00BCD4] text-sm font-semibold tracking-wide transition-colors duration-300 hover:bg-[#00BCD4] hover:text-black"
                >
                  {item.title}
                </a>
              ) : (
                <a
                  href={item.url}
                  className="text-white text-sm font-medium tracking-wide hover:text-[#00BCD4] transition-colors duration-200"
                >
                  {item.title}
                </a>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col justify-center items-center gap-1.5 w-8 h-8"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
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

      {/* Mobile menu dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 bg-black/95 ${
          menuOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <ul className="flex flex-col px-6 py-4 gap-4">
          {items.map((item, index) => (
            <li key={item.id}>
              {index === lastIndex ? (
                <a
                  href={item.url}
                  onClick={() => setMenuOpen(false)}
                  className="inline-block px-4 py-1.5 border border-[#00BCD4] text-[#00BCD4] text-sm font-semibold tracking-wide"
                >
                  {item.title}
                </a>
              ) : (
                <a
                  href={item.url}
                  onClick={() => setMenuOpen(false)}
                  className="text-white text-sm font-medium tracking-wide hover:text-[#00BCD4] transition-colors duration-200"
                >
                  {item.title}
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
