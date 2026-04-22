import Link from 'next/link'

/**
 * EmpireInsightsSection
 * Renders the "Empire Insights" section of the MEG homepage.
 * Content is sourced from WordPress ACF fields via the REST API.
 *
 * ACF fields used:
 *   - empire_insights_image        — section image URL (direct string)
 *   - empire_insights_h2           — section heading
 *   - empire_insights_paragraph    — body copy (WYSIWYG / HTML)
 *   - empire_insights_button_text  — CTA label
 *   - empire_insights_button_link  — CTA href
 *
 * Layout: flexbox two-column
 *   Left  — image, max-width 215px, flex-shrink 0
 *   Right — text block with teal glow border, padding 90px 40px
 */
export default function EmpireInsightsSection({ acf }) {
  const {
    empire_insights_image: image,
    empire_insights_h2: heading,
    empire_insights_paragraph: paragraph,
    empire_insights_button_text: buttonText,
    empire_insights_button_link: buttonLink,
  } = acf

  return (
    <section className="bg-black py-24 px-6">
      {/* Outer wrapper — max-width 1000px, centered */}
      <div
        className="flex flex-col lg:flex-row items-stretch gap-0"
        style={{ maxWidth: '1024px', margin: '0 auto' }}
      >

        {/* ── Left column: image ── */}
        {image && (
          <div
            className="flex items-end justify-center"
            style={{ maxWidth: '215px', flexShrink: 0, marginRight: '-10px', zIndex: 10, marginTop: '-95px' }}
          >
            <img
              src={image?.url || image}
              alt={image?.alt || ''}
              className="w-full h-auto"
            />
          </div>
        )}

        {/* ── Right column: text with teal glow border ── */}
        <div
          className="flex flex-col items-start gap-6 flex-1"
          style={{
            border: '1px solid rgb(14, 188, 194)',
            boxShadow: 'rgba(78, 197, 220, 0.4) 0px 0px 10px 5px',
            padding: '90px 40px',
            borderRadius: '5px',
          }}
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
