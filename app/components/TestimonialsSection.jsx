'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'

const TRUNCATE_AT = 180

function resolveUrl(raw) {
  if (!raw) return null
  return typeof raw === 'object' ? raw.url || null : raw
}

/* ── Single testimonial card ── */
function TestimonialCard({ item, slotWidth }) {
  const [expanded, setExpanded] = useState(false)
  const text = item.testimonial || ''
  const truncated = text.length > TRUNCATE_AT
  const displayed = !expanded && truncated ? text.slice(0, TRUNCATE_AT) + '...' : text
  const avatarSrc = resolveUrl(item.testimonial_avatar)
  const starsSrc  = resolveUrl(item.testimonial_stars)

  const cardW = slotWidth > 0 ? slotWidth - 24 : 300

  return (
    <div
      style={{
        flex: '0 0 auto',
        width: `${cardW}px`,
        margin: '0 12px',
        background: '#111111',
        padding: '32px',
        borderRadius: '12px',
        minHeight: '280px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        boxSizing: 'border-box',
      }}
    >
      {/* Review text */}
      <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', lineHeight: 1.7, flex: 1 }}>
        {displayed}
        {truncated && (
          <span
            onClick={() => setExpanded(e => !e)}
            style={{ color: '#0ebcc2', cursor: 'pointer', fontSize: '14px', marginLeft: '4px' }}
          >
            {expanded ? 'Show Less' : 'Show More'}
          </span>
        )}
      </div>

      {/* Avatar + author */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {avatarSrc && (
          <img
            src={avatarSrc?.url || avatarSrc}
            alt={item.testimonial_author_name || ''}
            style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
          />
        )}
        {item.testimonial_author_name && (
          <span style={{ color: '#0ebcc2', fontWeight: 600, fontSize: '15px' }}>
            {item.testimonial_author_name}
          </span>
        )}
      </div>

      {/* Stars */}
      {starsSrc && (
        <img src={starsSrc?.url || starsSrc} alt={item.testimonial_stars?.alt || ''} style={{ height: '24px', width: 'auto', objectFit: 'contain', display: 'block', alignSelf: 'flex-start' }} />
      )}
    </div>
  )
}

/* ── Main section ── */
export default function TestimonialsSection({ acf }) {
  const {
    testimonials_h2: heading,
    testimonials_badges: badgesRepeater,
    each_testimonial: testimonialsRepeater,
    testimonials_button_text: buttonText,
    testimonials_button_link: buttonLink,
  } = acf

  if (!Array.isArray(testimonialsRepeater) || testimonialsRepeater.length === 0) return null

  const items  = testimonialsRepeater
  const badges = Array.isArray(badgesRepeater) ? badgesRepeater : []

  /* ── Responsive visible count ── */
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])
  const visible = isMobile ? 1 : 3

  /* ── Infinite-loop carousel state ── */
  const cloneCount = visible
  const extended   = [...items.slice(-cloneCount), ...items, ...items.slice(0, cloneCount)]

  const [rawIndex, setRawIndex]   = useState(3) // desktop cloneCount default
  const [animate,  setAnimate]    = useState(true)
  const containerRef              = useRef(null)
  const [containerWidth, setCW]   = useState(0)
  const touchStartX               = useRef(null)
  const isHovered                 = useRef(false)
  const timerRef                  = useRef(null)

  /* Container width */
  useEffect(() => {
    const update = () => {
      if (containerRef.current) setCW(containerRef.current.offsetWidth)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  /* Reset on mobile ↔ desktop switch */
  useEffect(() => {
    setAnimate(false)
    setRawIndex(cloneCount)
    const t = setTimeout(() => setAnimate(true), 20)
    return () => clearTimeout(t)
  }, [visible]) // eslint-disable-line react-hooks/exhaustive-deps

  const slotWidth   = containerWidth / visible
  const translateX  = containerWidth > 0 ? -rawIndex * slotWidth : 0
  const realIndex   = ((rawIndex - cloneCount) % items.length + items.length) % items.length

  /* Snap after clone overrun */
  const doSnap = useCallback((targetIndex) => {
    setAnimate(false)
    setRawIndex(targetIndex)
    setTimeout(() => setAnimate(true), 20)
  }, [])

  const handleTransitionEnd = () => {
    if (rawIndex >= cloneCount + items.length) {
      doSnap(cloneCount)
    } else if (rawIndex < cloneCount) {
      doSnap(cloneCount + items.length - 1)
    }
  }

  const goNext = useCallback(() => { setAnimate(true); setRawIndex(i => i + 1) }, [])
  const goPrev = useCallback(() => { setAnimate(true); setRawIndex(i => i - 1) }, [])

  /* Auto-play */
  useEffect(() => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      if (!isHovered.current) goNext()
    }, 5000)
    return () => clearInterval(timerRef.current)
  }, [goNext])

  /* Touch / swipe */
  const handleTouchStart = e => { touchStartX.current = e.touches[0].clientX }
  const handleTouchEnd   = e => {
    if (touchStartX.current === null) return
    const diffX = e.changedTouches[0].clientX - touchStartX.current
    if (diffX < -50) goNext()
    else if (diffX > 50) goPrev()
    touchStartX.current = null
  }

  return (
    <section style={{ background: '#0a0a0a', padding: '80px 0' }}>
      <style>{`
        .ts-inner {
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 60px;
        }
        .ts-top-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 48px;
        }
        .ts-h2 {
          color: white;
          font-weight: 700;
          font-size: clamp(28px, 3vw, 42px);
          text-align: left;
          margin: 0;
        }
        .ts-badges {
          display: flex;
          gap: 20px;
          align-items: center;
          flex-wrap: wrap;
        }
        .ts-track-wrapper {
          overflow: hidden;
          width: 100%;
        }
        .ts-track {
          display: flex;
          will-change: transform;
        }
        .ts-nav {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 24px;
        }
        .ts-arrow {
          background: #0ebcc2;
          border: none;
          border-radius: 8px;
          width: 44px;
          height: 44px;
          color: #0a0a0a;
          font-size: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: opacity 0.2s ease;
          flex-shrink: 0;
        }
        .ts-arrow:hover { opacity: 0.85; }
        .ts-dots {
          display: flex;
          justify-content: center;
          gap: 6px;
          margin-top: 20px;
        }
        .ts-btn-wrap {
          display: flex;
          justify-content: center;
          margin-top: 32px;
        }
        .ts-btn {
          background: transparent;
          border: 1px solid white;
          color: white;
          padding: 14px 40px;
          border-radius: 6px;
          font-weight: 600;
          letter-spacing: 1px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-block;
          font-size: 14px;
        }
        .ts-btn:hover {
          background: white;
          color: #0a0a0a;
        }
        @media (max-width: 768px) {
          .ts-inner { padding: 0 20px; }
          .ts-nav { justify-content: center; }
          .ts-top-row {
            flex-direction: column;
            gap: 24px;
            align-items: center;
          }
          .ts-h2 { text-align: center; }
          .ts-badges { justify-content: center; }
        }
      `}</style>

      <div className="ts-inner">

        {/* Top row — H2 left, badges right */}
        <div className="ts-top-row">
          {heading && <h2 className="ts-h2">{heading}</h2>}
          {badges.length > 0 && (
            <div className="ts-badges">
              {badges.map((b, i) => {
                const badge = b.testimonials_badge
                const src = resolveUrl(badge)
                if (!src) return null
                return (
                  <img key={i} src={src} alt={badge?.alt || ''} style={{ height: '70px', width: 'auto', objectFit: 'contain' }} />
                )
              })}
            </div>
          )}
        </div>

        {/* Carousel */}
        <div
          className="ts-track-wrapper"
          ref={containerRef}
          onMouseEnter={() => { isHovered.current = true }}
          onMouseLeave={() => { isHovered.current = false }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="ts-track"
            style={{
              transform: `translateX(${translateX}px)`,
              transition: animate ? 'transform 0.4s ease' : 'none',
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {extended.map((item, i) => (
              <TestimonialCard key={i} item={item} slotWidth={slotWidth} />
            ))}
          </div>
        </div>

        {/* Arrows — right-aligned below carousel */}
        <div className="ts-nav">
          <button className="ts-arrow" onClick={goPrev} aria-label="Previous">‹</button>
          <button className="ts-arrow" onClick={goNext} aria-label="Next">›</button>
        </div>

        {/* Dots — centered */}
        <div className="ts-dots">
          {items.map((_, i) => (
            <div
              key={i}
              onClick={() => { setAnimate(true); setRawIndex(cloneCount + i) }}
              style={{
                height: '8px',
                width: i === realIndex ? '20px' : '8px',
                borderRadius: '4px',
                background: i === realIndex ? '#0ebcc2' : 'rgba(255,255,255,0.3)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
            />
          ))}
        </div>

        {/* CTA button */}
        {buttonLink && buttonText && (
          <div className="ts-btn-wrap">
            <Link href={buttonLink} className="ts-btn">{buttonText}</Link>
          </div>
        )}

      </div>
    </section>
  )
}
