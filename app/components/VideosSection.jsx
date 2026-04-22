'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

export default function VideosSection({ acf }) {
  const { video_repeater: repeater } = acf

  if (!Array.isArray(repeater) || repeater.length === 0) return null

  const items = repeater

  /* ── Responsive visible count ── */
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])
  const visible = isMobile ? 1 : 3

  /* ── Carousel state — NO clones, all items rendered once ── */
  const [index, setIndex]       = useState(0)
  const [animate, setAnimate]   = useState(true)
  const prevIndexRef            = useRef(0)
  const containerRef            = useRef(null)
  const [containerWidth, setCW] = useState(0)
  const touchStartX             = useRef(null)
  const isHovered               = useRef(false)
  const timerRef                = useRef(null)
  const [lightbox, setLightbox] = useState(null)

  /* Container width */
  useEffect(() => {
    const update = () => {
      if (containerRef.current) setCW(containerRef.current.offsetWidth)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  /* Reset position on mobile ↔ desktop switch */
  useEffect(() => {
    setAnimate(false)
    setIndex(0)
    prevIndexRef.current = 0
    const t = setTimeout(() => setAnimate(true), 20)
    return () => clearTimeout(t)
  }, [visible]) // eslint-disable-line react-hooks/exhaustive-deps

  /* Detect wrap-around: disable animation for instant jump, re-enable after */
  useEffect(() => {
    const prev = prevIndexRef.current
    const curr = index
    const wrapForward  = prev === items.length - 1 && curr === 0
    const wrapBackward = prev === 0 && curr === items.length - 1
    if (wrapForward || wrapBackward) {
      setAnimate(false)
      const t = setTimeout(() => setAnimate(true), 20)
      prevIndexRef.current = curr
      return () => clearTimeout(t)
    }
    setAnimate(true)
    prevIndexRef.current = curr
  }, [index, items.length])

  const slotWidth  = containerWidth / visible
  const translateX = containerWidth > 0 ? -index * slotWidth : 0

  /* Navigation — modular index, no clones needed */
  const goNext = useCallback(() => {
    setIndex(prev => (prev + 1) % items.length)
  }, [items.length])

  const goPrev = useCallback(() => {
    setIndex(prev => (prev - 1 + items.length) % items.length)
  }, [items.length])

  /* Auto-play — paused while lightbox is open */
  useEffect(() => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      if (!isHovered.current && !lightbox) goNext()
    }, 6000)
    return () => clearInterval(timerRef.current)
  }, [goNext, lightbox])

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
        .vs-wrapper {
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 60px;
        }
        .vs-track-wrapper {
          overflow: hidden;
          width: 100%;
        }
        .vs-track {
          display: flex;
          will-change: transform;
        }
        /* Fix 1 — square card with absolutely-positioned iframe */
        .vs-card {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
          overflow: hidden;
          border-radius: 12px;
          cursor: pointer;
        }
        .vs-card iframe {
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          width: 100% !important;
          height: 100% !important;
          pointer-events: none;
          border: none;
          display: block;
        }
        .vs-nav {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 24px;
        }
        .vs-arrow {
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
        .vs-arrow:hover { opacity: 0.85; }
        .vs-dots {
          display: flex;
          justify-content: center;
          gap: 6px;
          margin-top: 20px;
        }
        .vs-lightbox {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.92);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .vs-lb-content {
          max-width: 420px;
          width: 90vw;
          aspect-ratio: 9 / 16;
          position: relative;
        }
        .vs-lb-content iframe {
          width: 100% !important;
          height: 100% !important;
          display: block;
          pointer-events: auto;
          border: none;
        }
        .vs-lb-close {
          position: fixed;
          top: 20px;
          right: 28px;
          color: white;
          font-size: 32px;
          cursor: pointer;
          z-index: 10000;
          background: none;
          border: none;
          line-height: 1;
        }
        @media (max-width: 768px) {
          .vs-wrapper { padding: 0 20px; }
          .vs-nav { justify-content: center; }
        }
      `}</style>

      <div className="vs-wrapper">

        {/* Carousel track — all items mounted once, never re-created */}
        <div
          className="vs-track-wrapper"
          ref={containerRef}
          onMouseEnter={() => { isHovered.current = true }}
          onMouseLeave={() => { isHovered.current = false }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="vs-track"
            style={{
              transform: `translateX(${translateX}px)`,
              transition: animate ? 'transform 0.4s ease' : 'none',
            }}
          >
            {items.map((item, i) => (
              /* Slot — controls spacing; card inside controls aspect-ratio */
              <div
                key={i}
                style={{
                  flex: '0 0 auto',
                  width: slotWidth > 0 ? `${slotWidth}px` : `${100 / visible}%`,
                  padding: '0 12px',
                  boxSizing: 'border-box',
                }}
              >
                {item.video_iframe ? (
                  <div
                    className="vs-card"
                    onClick={() => setLightbox(item)}
                    dangerouslySetInnerHTML={{ __html: item.video_iframe }}
                    suppressHydrationWarning
                  />
                ) : null}
              </div>
            ))}
          </div>
        </div>

        {/* Arrows */}
        <div className="vs-nav">
          <button className="vs-arrow" onClick={goPrev} aria-label="Previous">‹</button>
          <button className="vs-arrow" onClick={goNext} aria-label="Next">›</button>
        </div>

        {/* Dots */}
        <div className="vs-dots">
          {items.map((_, i) => (
            <div
              key={i}
              onClick={() => setIndex(i)}
              style={{
                height: '8px',
                width: i === index ? '20px' : '8px',
                borderRadius: '4px',
                background: i === index ? '#0ebcc2' : 'rgba(255,255,255,0.3)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
            />
          ))}
        </div>

      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="vs-lightbox" onClick={() => setLightbox(null)}>
          <button
            className="vs-lb-close"
            onClick={() => setLightbox(null)}
            aria-label="Close"
          >
            &times;
          </button>
          <div
            className="vs-lb-content"
            onClick={e => e.stopPropagation()}
            dangerouslySetInnerHTML={{ __html: lightbox.video_iframe }}
            suppressHydrationWarning
          />
        </div>
      )}
    </section>
  )
}
