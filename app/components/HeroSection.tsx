type HeroACF = {
  video: string
  heading_h1: string
  hero_paragraph: string
  cta_button_text: string
  cta_button_link: string
}

export default function HeroSection({ acf }: { acf: HeroACF }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background video */}
      {acf.video && (
        <video
          suppressHydrationWarning
          className="absolute inset-0 w-full h-full object-cover"
          src={acf.video}
          autoPlay
          muted
          loop
          playsInline
        />
      )}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-[1440px] mx-auto">
        <h1
          suppressHydrationWarning
          className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6 [&_span]:text-[#00BCD4]"
          dangerouslySetInnerHTML={{ __html: acf.heading_h1 ?? '' }}
        />
        <div
          suppressHydrationWarning
          className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed"
          dangerouslySetInnerHTML={{ __html: acf.hero_paragraph ?? '' }}
        />
        {acf.cta_button_link && acf.cta_button_text && (
          <a
            href={acf.cta_button_link}
            className="inline-block px-8 py-4 border-2 border-white text-white font-semibold tracking-wide transition-colors duration-300 hover:bg-white hover:text-black"
          >
            {acf.cta_button_text}
          </a>
        )}
      </div>
    </section>
  )
}
