import Link from 'next/link'

export default function IndustryHeroSection({ acf, darkTheme }) {
  const {
    hero_h1: heading,
    hero_para: paragraph,
    hero_button_text: buttonText,
    hero_button_link: buttonLink,
    hero_image: heroImage,
  } = acf

  const imageUrl = heroImage?.url ?? heroImage

  const sectionBg = darkTheme ? 'bg-[#0a0a0a]' : 'bg-white'
  const headingColor = darkTheme ? 'text-white' : 'text-gray-900'
  const paraColor = darkTheme ? 'text-gray-300 [&_strong]:text-white' : 'text-gray-600 [&_strong]:text-gray-900'

  return (
    <section className={`${sectionBg} pt-[80px] pb-[50px] px-6`}>
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Left column */}
        <div className="flex flex-col gap-6">
          {heading && (
            <h1
              className={`text-4xl md:text-5xl font-bold leading-tight [&_span]:text-[#0ebcc2] ${headingColor}`}
              dangerouslySetInnerHTML={{ __html: heading }}
            />
          )}

          {paragraph && (
            <div
              className={`text-lg leading-relaxed [&_a]:text-[#0ebcc2] ${paraColor}`}
              dangerouslySetInnerHTML={{ __html: paragraph }}
            />
          )}

          {buttonLink && buttonText && (
            <div>
              <Link
                href={buttonLink}
                className="inline-block px-8 py-3 bg-[#0ebcc2] text-white font-semibold rounded-md transition-colors duration-300 hover:bg-[#0ca8ae]"
              >
                {buttonText}
              </Link>
            </div>
          )}
        </div>

        {/* Right column */}
        {imageUrl && (
          <div className="flex justify-center lg:justify-end">
            <img
              src={imageUrl}
              alt={heroImage?.alt || ''}
            />
          </div>
        )}

      </div>
    </section>
  )
}
