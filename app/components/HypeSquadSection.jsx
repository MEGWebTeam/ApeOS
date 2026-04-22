import Link from 'next/link'

/**
 * HypeSquadSection
 * Renders the "Hype Squad" section of the MEG homepage.
 * Content is sourced from WordPress ACF fields via the REST API.
 *
 * ACF fields used:
 *   - hype_squad_image        — section image URL (direct string)
 *   - hype_squad_h2           — section heading
 *   - hype_squad_paragraph    — body copy (WYSIWYG / HTML)
 *   - hype_squad_button_text  — CTA label
 *   - hype_squad_button_link  — CTA href
 *
 * Layout: two-column card (left = text, right = image)
 * Stats line is hardcoded per design: "47 Influencers + 75 Businesses + 127 Events"
 */
export default function HypeSquadSection({ acf }) {
  const {
    hype_squad_image: image,
    hype_squad_h2: heading,
    hype_squad_paragraph: paragraph,
    hype_squad_button_text: buttonText,
    hype_squad_button_link: buttonLink,
  } = acf

  return (
    <section className="bg-black px-6" style={{ paddingTop: '200px', paddingBottom: '200px' }}>
      {/* Outer card — teal glow border */}
      <div
        className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center p-8 md:p-12"
        style={{
          border: '1px solid #0ebcc2',
          borderRadius: '15px',
          boxShadow: '0px 0px 120px 0px #0ebcc299',
        }}
      >

        {/* ── Left column: text ── */}
        <div className="flex flex-col items-start gap-6">

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

          {/* Stats line — hardcoded per Figma design */}
          <p className="text-[#00BCD4] font-semibold tracking-wide text-base md:text-lg">
            47 Influencers&nbsp;&nbsp;+&nbsp;&nbsp;75 Businesses&nbsp;&nbsp;+&nbsp;&nbsp;127 Events
          </p>

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

        {/* ── Right column: image ── */}
        {image && (
          <div className="flex justify-center">
            <img
              src={image?.url || image}
              alt={image?.alt || ''}
              style={{
                maxWidth: '350px',
                width: '100%',
                objectFit: 'contain',
              }}
            />
          </div>
        )}

      </div>
    </section>
  )
}
