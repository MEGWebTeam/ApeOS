import Link from 'next/link'

export default function IndustryLegacySection({ acf, darkTheme }) {
  const {
    legacy_h2: heading,
    legacy_paragraph: paragraph,
    legacy_button_text: buttonText,
    legacy_button_link: buttonLink,
  } = acf

  if (!heading && !paragraph) return null

  const sectionBg = darkTheme ? 'bg-[#0a0a0a]' : 'bg-white'
  const headingColor = darkTheme ? 'text-white' : 'text-gray-900'
  const paraColor = darkTheme ? 'text-gray-300 [&_strong]:text-white' : 'text-gray-600 [&_strong]:text-gray-900'

  return (
    <section className={`${sectionBg} pt-[50px] pb-[80px] px-6`}>
      <div className="max-w-[1440px] mx-auto text-center flex flex-col items-center gap-6">

        {heading && (
          <h2
            className={`text-3xl md:text-5xl font-bold leading-tight [&_span]:text-[#0ebcc2] ${headingColor}`}
            dangerouslySetInnerHTML={{ __html: heading }}
          />
        )}

        {paragraph && (
          <div
            className={`text-lg leading-relaxed text-center [&_a]:text-[#0ebcc2] ${paraColor}`}
            dangerouslySetInnerHTML={{ __html: paragraph }}
          />
        )}

        {buttonLink && buttonText && (
          <Link
            href={buttonLink}
            className="inline-block px-8 py-3 bg-[#0ebcc2] text-white font-semibold rounded-md transition-colors duration-300 hover:bg-[#0ca8ae]"
          >
            {buttonText}
          </Link>
        )}

      </div>
    </section>
  )
}
