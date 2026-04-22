import Link from 'next/link'

/**
 * IndustriesSection
 * Renders the "Marketing That Speaks Your Language" section.
 * Content is sourced from WordPress ACF fields via the REST API.
 *
 * ACF fields used:
 *   - industries_we_serve_h2                      — section heading
 *   - industries_we_serve_paragraph               — body copy (WYSIWYG / HTML)
 *   - industries_we_serve_button_text             — CTA label
 *   - industries_we_serve_button_link             — CTA href
 *   - industries_we_serve_images                  — repeater: image grid (left col)
 *       └ industries_we_serve_each_image          — image URL
 *   - industries_we_serve_icon_list_repeater      — repeater: icon list (right col)
 *       ├ industries_we_serve_icon               — icon image URL
 *       └ industries_we_serve_h3                 — item label
 *
 * Layout: two-column (left = image grid, right = copy + icon list + CTA)
 */
export default function IndustriesSection({ acf }) {
  const {
    industries_we_serve_h2: heading,
    industries_we_serve_paragraph: paragraph,
    industries_we_serve_button_text: buttonText,
    industries_we_serve_button_link: buttonLink,
    industries_we_serve_images: images,
    industries_we_serve_icon_list_repeater: iconList,
  } = acf

  const hasImages = Array.isArray(images) && images.length > 0
  const hasIcons = Array.isArray(iconList) && iconList.length > 0

  return (
    <section className="bg-black py-24 px-6" style={{ overflowX: 'hidden' }}>
      <style>{`
        .iws-img-wrapper {
          overflow: hidden;
          border-radius: 12px;
        }
        .iws-img-wrapper img {
          width: 100%;
          height: 220px;
          object-fit: cover;
          display: block;
          transition: transform 0.3s ease;
        }
        .iws-img-wrapper:hover img {
          transform: scale(1.07);
        }
        @media (max-width: 1024px) {
          .industries-wrapper {
            flex-direction: column;
          }
          .industries-images-grid {
            width: 100%;
          }
          .industries-right-col {
            max-width: 100%;
            width: 100%;
          }
        }
        @media (max-width: 768px) {
          .industries-icon-list {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .industries-images-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
      <div
        className="max-w-[1440px] mx-auto items-center industries-wrapper"
        style={{ display: 'flex', gap: '60px', alignItems: 'center' }}
      >

        {/* ── Left column — image grid ── */}
        <div style={{ flex: 1 }}>
          {hasImages && (
            <div
              className="industries-images-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '12px',
              }}
            >
              {[0, 3, 1, 4, 2, 5].map((idx) => {
                const item = images[idx]
                if (!item) return null
                const raw = item.industries_we_serve_each_image
                if (!raw) return null
                return (
                  <div key={idx} className="iws-img-wrapper">
                    <img src={raw?.url || raw} alt={raw?.alt || ''} />
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* ── Right column — text + icon list + CTA ── */}
        <div
          className="flex flex-col items-start gap-6 industries-right-col"
          style={{ flex: 1, maxWidth: '620px' }}
        >

          {/* H2 heading */}
          {heading && (
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              {heading}
            </h2>
          )}

          {/* Body copy — WYSIWYG HTML from WordPress */}
          {paragraph && (
            <div
              className="text-lg text-gray-300 leading-relaxed [&_a]:text-[#00BCD4] [&_strong]:text-white"
              dangerouslySetInnerHTML={{ __html: paragraph }}
            />
          )}

          {/* Icon list */}
          {hasIcons && (
            <div
              className="industries-icon-list"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '16px 24px',
                width: '100%',
              }}
            >
              {iconList.map((item, i) => {
                const iconSrc = item.industries_we_serve_icon
                const label = item.industries_we_serve_h3
                return (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: '10px',
                    }}
                  >
                    {iconSrc && (
                      <img
                        src={item.industries_we_serve_icon?.url || item.industries_we_serve_icon}
                        alt={item.industries_we_serve_icon?.alt || ''}
                        style={{
                          width: '28px',
                          height: '28px',
                          objectFit: 'contain',
                          flexShrink: 0,
                        }}
                      />
                    )}
                    {label && (
                      <span
                        style={{
                          color: 'white',
                          fontSize: '15px',
                          fontWeight: 700,
                        }}
                      >
                        {label}
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
          )}

          {/* CTA button */}
          {buttonLink && buttonText && (
            <Link
              href={buttonLink}
              className="inline-block mt-2 px-8 py-4 border-2 border-white text-white font-semibold tracking-wide transition-colors duration-300 hover:bg-white hover:text-black"
            >
              {buttonText}
            </Link>
          )}

        </div>

      </div>
    </section>
  )
}
