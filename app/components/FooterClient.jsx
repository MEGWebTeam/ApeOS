'use client'

import Link from 'next/link'

const WP_BASE = process.env.NEXT_PUBLIC_WORDPRESS_URL ?? ''

function resolveHref(url) {
  if (!url) return '/'
  if (url.startsWith('/')) return url
  if (WP_BASE && url.startsWith(WP_BASE)) {
    return url.slice(WP_BASE.length) || '/'
  }
  return url
}

export default function FooterClient({
  siteUrl,
  footerLogo,
  contactInfo,
  socialLinks,
  formH3,
  formScript,
  partnersHeading,
  partnerLogos,
  footerLocations,
  menus,
}) {
  return (
    <footer className="bg-[#0a0a0a] text-white pt-[70px]">

      {/* ── Row 1: Main Footer Columns ── */}
      <div className="max-w-[1440px] mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-8">

        {/* Column 1 — Logo, contact info, social icons */}
        <div className="flex flex-col gap-6">

          {footerLogo && (
            <a href={siteUrl}>
              <img src={footerLogo?.url || footerLogo} alt={footerLogo?.alt || ''} />
            </a>
          )}

          {contactInfo && (
            <div
              suppressHydrationWarning
              className="text-sm text-gray-400 leading-relaxed [&_a]:text-gray-400 [&_a:hover]:text-white [&_a]:transition-colors [&_a]:duration-200 [&_p]:mb-1"
              dangerouslySetInnerHTML={{ __html: contactInfo }}
            />
          )}

          {socialLinks.length > 0 && (
            <div className="flex flex-wrap items-center gap-4">
              {socialLinks.map((item, index) => (
                <a
                  key={index}
                  href={item.social_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.social_link_name}
                >
                  <span className="footer-tooltip-wrap" data-tooltip={item.social_link_name}>
                    <img src={item.social_icon?.url || item.social_icon} alt={item.social_icon?.alt || item.social_link_name || ''} />
                  </span>
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Columns 2–5 — Menu links */}
        {[
          { heading: 'Solutions', items: menus.solutions },
          { heading: 'Industries', items: menus.industries },
          { heading: 'Company', items: menus.company },
          { heading: 'Resources', items: menus.resources },
        ].map(({ heading, items }) => (
          <div key={heading} className="flex flex-col gap-4">
            <p className="text-white font-bold text-sm tracking-wide">{heading}</p>
            {items.length > 0 && (
              <ul className="flex flex-col gap-3 list-none">
                {items.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={resolveHref(item.url)}
                      className="text-gray-400 text-sm hover:text-white transition-colors duration-200"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}

      </div>

      {/* ── Row 2: Partners + Newsletter ── */}
      {(partnersHeading || partnerLogos.length > 0 || formH3 || formScript) && (
        <div className="max-w-[1440px] mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* Partners */}
          {(partnersHeading || partnerLogos.length > 0) && (
            <div className="flex flex-col gap-6">
              {partnersHeading && (
                <h3 className="text-white font-bold text-lg">{partnersHeading}</h3>
              )}
              {partnerLogos.length > 0 && (
                <div className="grid grid-cols-[repeat(2,auto)] md:grid-cols-[repeat(3,auto)] lg:grid-cols-[repeat(5,auto)] gap-6 items-center">
                  {partnerLogos.map((partner, index) => (
                    <span key={index} className="footer-tooltip-wrap" data-tooltip={partner.partnerbrand_name}>
                      <img src={partner.partnerbrand_logo?.url || partner.partnerbrand_logo} alt={partner.partnerbrand_logo?.alt || partner.partnerbrand_name || ''} />
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Newsletter form */}
          {(formH3 || formScript) && (
            <div className="flex flex-col gap-4">
              {formH3 && (
                <h3 className="text-white font-bold text-lg">{formH3}</h3>
              )}
              {formScript && (
                <div
                  suppressHydrationWarning
                  dangerouslySetInnerHTML={{ __html: formScript }}
                />
              )}
            </div>
          )}

        </div>
      )}

      {/* ── Row 3: Footer Locations ── */}
      {footerLocations && (
        <div className="max-w-[1440px] mx-auto px-6 py-8">
          <div
            suppressHydrationWarning
            className="text-sm text-gray-400 leading-relaxed [&_a]:text-gray-400 [&_a:hover]:text-white [&_a]:transition-colors [&_a]:duration-200"
            dangerouslySetInnerHTML={{ __html: footerLocations }}
          />
        </div>
      )}

      {/* ── Row 4: Bottom Bar — Legal menu ── */}
      {menus.footerLegal.length > 0 && (
        <div className="max-w-[1440px] mx-auto px-6 py-4">
          <div className="flex flex-wrap justify-center items-center gap-2 text-xs text-gray-500">
            {menus.footerLegal.map((item, index) => (
              <span key={index} className="flex items-center gap-2">
                {index > 0 && <span aria-hidden="true">|</span>}
                <Link
                  href={resolveHref(item.url)}
                  className="hover:text-white transition-colors duration-200"
                >
                  {item.title}
                </Link>
              </span>
            ))}
          </div>
        </div>
      )}

    </footer>
  )
}
