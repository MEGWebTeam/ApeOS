'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'

/**
 * BuildYourEmpireSection
 * Renders the "Build Your Empire" CTA section of the MEG homepage.
 * Content is sourced from WordPress ACF fields via the REST API.
 *
 * ACF fields used:
 *   - build_your_empire_bg_image    — full-width background image URL (direct string)
 *   - build_your_empire_h2          — section heading
 *   - build_your_empire_button_text — CTA label
 *   - build_your_empire_button_link — CTA href
 *
 * Scroll effect:
 *   The outer wrapper is taller than the viewport (200vh), giving the browser
 *   scroll room while the inner content stays sticky at the top (position: sticky).
 *   As the user scrolls through the extra height, scroll progress (0 → 1) is
 *   calculated and mapped to a CSS scale transform (1.15 → 1.0), creating a
 *   zoom-out effect — zoomed in on arrival, settled at natural size on exit.
 *   Scrolling back up reverses the effect.
 */
export default function BuildYourEmpireSection({ acf }) {
  const {
    build_your_empire_h2: heading,
    build_your_empire_button_text: buttonText,
    build_your_empire_button_link: buttonLink,
  } = acf

  const bgImage = acf?.build_your_empire_bg_image?.url || acf?.build_your_empire_bg_image

  // Ref on the outer scroll-space wrapper so we can read its position
  const wrapperRef = useRef(null)

  // Scale starts at 1.15 (zoomed in), animates down to 1.0 as user scrolls through
  const [scale, setScale] = useState(1.15)

  useEffect(() => {
    const handleScroll = () => {
      const wrapper = wrapperRef.current
      if (!wrapper) return

      const rect = wrapper.getBoundingClientRect()
      const wrapperHeight = wrapper.offsetHeight
      const viewportHeight = window.innerHeight

      // scrolled: how many px of the wrapper have scrolled above the viewport top
      const scrolled = -rect.top
      // scrollable: total px the wrapper can scroll before its bottom leaves view
      const scrollable = wrapperHeight - viewportHeight

      // Clamp progress between 0 and 1
      const progress = Math.min(Math.max(scrolled / scrollable, 0), 1)

      // Map progress 0→1 to scale 1.15→1.0
      setScale(1.15 - progress * 0.15)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    // Run once on mount to set correct initial value
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    /*
     * Outer wrapper: 200vh gives the scroll room needed for the animation.
     * The browser scrolls through this extra height while the inner content
     * stays pinned to the viewport via `sticky top-0`.
     */
    <div ref={wrapperRef} className="relative h-[200vh]">

      {/* Sticky viewport-height panel — stays visible while user scrolls the wrapper */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">

        {/* Background image — scaled via scroll-driven transform */}
        {bgImage && (
          <div
            className="absolute inset-0 bg-cover bg-center will-change-transform"
            style={{
              backgroundImage: `url(${bgImage})`,
              transform: `scale(${scale})`,
              // Smooth out rapid scroll jank slightly; kept very short so it
              // doesn't lag behind the scroll position noticeably.
              transition: 'transform 80ms linear',
            }}
          />
        )}

        {/* Dark overlay for text legibility */}
        <div className="absolute inset-0 bg-black/55" />

        {/* Section content — centered over background */}
        <div className="relative z-10 text-center px-6 max-w-[1440px] mx-auto flex flex-col items-center gap-8">

          {/* H2 heading */}
          {heading && (
            <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              {heading}
            </h2>
          )}

          {/* CTA button */}
          {buttonLink && buttonText && (
            <Link
              href={buttonLink}
              className="inline-block px-8 py-4 border-2 border-white text-white font-semibold tracking-wide transition-colors duration-300 hover:bg-white hover:text-black"
            >
              {buttonText}
            </Link>
          )}

        </div>

      </div>
    </div>
  )
}
