'use client'

import { useEffect, useRef } from 'react'

export default function LandingPageHero({ acf }) {
  const sectionRef = useRef(null)
  const cardRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const card = cardRef.current
    if (!section || !card) return

    const handleMouseMove = (e) => {
      const rect = section.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const rotateX = ((y - centerY) / centerY) * -3
      const rotateY = ((x - centerX) / centerX) * 3
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
    }

    const handleMouseLeave = () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
      card.style.transition = 'transform 0.5s ease'
    }

    const handleMouseEnter = () => {
      card.style.transition = 'transform 0.1s ease'
    }

    section.addEventListener('mousemove', handleMouseMove)
    section.addEventListener('mouseleave', handleMouseLeave)
    section.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      section.removeEventListener('mousemove', handleMouseMove)
      section.removeEventListener('mouseleave', handleMouseLeave)
      section.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [])

  return (
    <section ref={sectionRef} className="lp-section lp-hero-section">
      {/* Dot grid */}
      <div className="lp-dot-grid" />

      {/* Orb */}
      <div className="lp-orb" />

      {/* Hero card */}
      <div ref={cardRef} className="lp-hero-card hero-body">
        {/* Eyebrow row */}
        <div className="ew">
          <span className="el" />
          <span className="eyebrow">{acf.lp_hero_badge}</span>
          <span className="el" />
        </div>

        {/* H1 */}
        <h1
          dangerouslySetInnerHTML={{ __html: acf.lp_hero_h1_white }}
          suppressHydrationWarning
        />

        {/* Subtext */}
        <p className="lp-hero-sub">{(acf.lp_hero_subtext ?? '').replace(/<\/?p>/g, '').trim()}</p>

        {/* CTA */}
        <div className="lp-cta-wrap">
          <a href={acf.lp_hero_cta_link} className="btn-float">
            {acf.lp_hero_cta_text}
          </a>
        </div>

        {/* Below CTA */}
        <p
          className="lp-micro"
          dangerouslySetInnerHTML={{ __html: acf.lp_hero_below_cta }}
          suppressHydrationWarning
        />
      </div>

      {/* Scroll cue */}
      <div
        className="lp-scroll-cue"
        onClick={() => {
          const hero = document.querySelector('.lp-hero-section')
          const nextSection = hero?.nextElementSibling
          if (nextSection) nextSection.scrollIntoView({ behavior: 'smooth' })
        }}
      >
        <span className="lp-scroll-label">Scroll</span>
        <div className="lp-sc-mouse">
          <div className="lp-sc-wheel" />
        </div>
      </div>

      <style>{`
        .lp-section {
          min-height: 100vh;
          background-color: #191a1f;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          overflow: hidden;
          padding-top: 80px;
          padding-bottom: 80px;
        }

        .lp-dot-grid {
          position: absolute;
          inset: 0;
          z-index: 0;
          background-image: radial-gradient(circle, rgba(255,255,255,0.18) 1px, transparent 1px);
          background-size: 20px 20px;
        }

        .lp-orb {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          background:
            radial-gradient(50% 38% at 22% 24%, rgba(78,197,220,0.07) 0%, transparent 70%),
            radial-gradient(35% 45% at 78% 68%, rgba(16,39,44,0.55) 0%, transparent 65%);
          pointer-events: none;
        }

        .hero-body {
          position: relative;
          z-index: 10;
          max-width: 840px;
          width: 100%;
          background: rgba(25, 26, 31, 0.55);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border-width: 1px;
          border-style: solid;
          border-color: rgba(255,255,255,0.13) rgba(255,255,255,0.08) rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 72px 64px 60px;
          box-shadow:
            rgba(0,0,0,0.4) 0px 0px 0px 1px,
            rgba(0,0,0,0.55) 0px 24px 56px,
            rgba(255,255,255,0.06) 0px 1px 0px inset;
          margin: 0 16px;
        }

        @media (max-width: 640px) {
          .hero-body {
            padding: 40px 28px 44px;
          }
        }

        .ew {
          display: flex;
          align-items: center;
          gap: 12px;
          justify-content: center;
          margin-bottom: 20px;
        }

        .el {
          width: 36px;
          height: 1px;
          background: rgb(255,191,0);
          opacity: 0.6;
          flex-shrink: 0;
          display: block;
        }

        .eyebrow {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #FFBF00;
        }

        .hero-body h1 {
          font-size: clamp(38px, 5.5vw, 70px);
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -0.03em;
          color: white;
          text-align: center;
          margin-bottom: 20px;
          margin-top: 0;
        }

        .hero-body h1 span {
          color: #00BCD4;
        }

        .lp-hero-sub {
          font-size: 18px;
          color: rgb(160,160,160);
          text-align: center;
          max-width: 560px;
          margin: 0 auto 36px;
          line-height: 1.6;
        }

        .lp-cta-wrap {
          text-align: center;
          margin-bottom: 16px;
        }

        .btn-float {
          display: inline-block;
          padding: 16px 38px;
          border: 1px solid rgb(255,191,0);
          border-radius: 6px;
          background: transparent;
          color: white;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0.75px;
          text-transform: uppercase;
          text-decoration: none;
          cursor: pointer;
          animation: lpFloatY 3.6s ease-in-out infinite;
          transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
        }

        .btn-float:hover {
          background: #FFBF00;
          color: #121212;
          animation-play-state: paused;
          transform: translateY(-3px) scale(1.02);
        }

        .lp-micro {
          font-size: 12.5px;
          color: #FFBF00;
          text-align: center;
          margin: 0;
        }

        .lp-micro span {
          color: #a0a0a0;
        }

        .lp-micro strong {
          color: #FFBF00;
        }

        .lp-scroll-cue {
          position: absolute;
          bottom: 32px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          z-index: 10;
          cursor: pointer;
          color: rgba(255,255,255,0.3);
          transition: color 0.3s ease;
        }

        .lp-scroll-cue:hover {
          color: rgba(255,255,255,0.9);
        }

        .lp-scroll-label {
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }

        .lp-sc-mouse {
          width: 22px;
          height: 34px;
          border: 1px solid currentColor;
          border-radius: 11px;
          position: relative;
        }

        .lp-sc-wheel {
          position: absolute;
          top: 6px;
          left: 50%;
          transform: translateX(-50%);
          width: 3px;
          height: 6px;
          background: currentColor;
          border-radius: 2px;
          animation: lpScrollBounce 1.6s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}
