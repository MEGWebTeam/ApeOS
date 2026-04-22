'use client'

import { useState, useCallback, useRef } from 'react'

/* ─────────────────────────────────────────────
   ImageSlider
   Reusable standalone slider — accepts slides[]
   ───────────────────────────────────────────── */
export function ImageSlider({ slides }) {
  const [current, setCurrent] = useState(0)
  const [lightbox, setLightbox] = useState(null)
  const touchStartX = useRef(null)
  const lbTouchStartX = useRef(null)

  const prev = useCallback(() =>
    setCurrent(i => (i - 1 + slides.length) % slides.length), [slides.length])
  const next = useCallback(() =>
    setCurrent(i => (i + 1) % slides.length), [slides.length])

  const lbPrev = useCallback(() =>
    setLightbox(i => (i - 1 + slides.length) % slides.length), [slides.length])
  const lbNext = useCallback(() =>
    setLightbox(i => (i + 1) % slides.length), [slides.length])

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const diffX = e.changedTouches[0].clientX - touchStartX.current
    if (diffX < -50) next()
    else if (diffX > 50) prev()
    touchStartX.current = null
  }

  const handleLbTouchStart = (e) => {
    lbTouchStartX.current = e.touches[0].clientX
  }

  const handleLbTouchEnd = (e) => {
    if (lbTouchStartX.current === null) return
    const diffX = e.changedTouches[0].clientX - lbTouchStartX.current
    if (diffX < -50) lbNext()
    else if (diffX > 50) lbPrev()
    lbTouchStartX.current = null
  }

  if (!slides || slides.length === 0) return null

  return (
    <>
      <style>{`
        .prs-slider-wrapper {
          position: relative;
          overflow: visible;
          max-width: 1024px;
          margin: 60px auto 0;
          padding-left: 20px;
          padding-right: 20px;
        }
        .prs-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;
          z-index: 0;
          background: radial-gradient(ellipse at center, rgba(14,188,194,0.2) 0%, transparent 65%);
          pointer-events: none;
        }
        .prs-slide-track {
          position: relative;
          z-index: 1;
          overflow: hidden;
        }
        .prs-slide {
          position: absolute;
          inset: 0;
          opacity: 0;
          transform: translateX(24px);
          transition: opacity 0.4s ease, transform 0.4s ease;
          pointer-events: none;
        }
        .prs-slide.active {
          opacity: 1;
          transform: translateX(0);
          pointer-events: auto;
          position: relative;
        }
        .prs-slide img {
          width: 100%;
          height: auto;
          max-height: 520px;
          object-fit: contain;
          display: block;
          border-radius: 0;
          cursor: pointer;
        }
        .prs-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 2;
          width: 44px;
          height: 44px;
          border-radius: 8px;
          background: #0ebcc2;
          border: none;
          color: #0a0a0a;
          font-size: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: opacity 0.2s ease;
        }
        .prs-arrow:hover {
          opacity: 0.85;
        }
        .prs-arrow-left  { left: 20px; z-index: 10; }
        .prs-arrow-right { right: 20px; z-index: 10; }
        .prs-dots {
          display: none;
        }
        .prs-lightbox {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.92);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .prs-lightbox-img {
          max-width: 90vw;
          max-height: 90vh;
          object-fit: contain;
          border-radius: 12px;
          position: relative;
          z-index: 1;
        }
        .prs-lb-close {
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
        .prs-lb-arrow {
          position: fixed;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10000;
          width: 44px;
          height: 44px;
          border-radius: 8px;
          background: #0ebcc2;
          border: none;
          color: #0a0a0a;
          font-size: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: opacity 0.2s ease;
        }
        .prs-lb-arrow:hover {
          opacity: 0.85;
        }
        .prs-lb-arrow-left  { left: 20px; }
        .prs-lb-arrow-right { right: 20px; }
        .prs-lb-dots {
          display: none;
        }
        @media (max-width: 768px) {
          .prs-lb-arrow {
            display: none;
          }
          .prs-lb-dots {
            display: flex;
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            gap: 6px;
            z-index: 10000;
          }
        }
        @media (max-width: 768px) {
          .prs-arrows-mobile {
            display: none;
          }
          .prs-slider-wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .prs-dots {
            display: flex;
            justify-content: center;
            gap: 6px;
            margin-top: 16px;
          }
        }
      `}</style>

      <div className="prs-slider-wrapper">
        <div className="prs-glow" />

        {/* Slide track with touch handlers */}
        <div
          className="prs-slide-track"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {slides.map((slide, i) => (
            <div key={i} className={`prs-slide${i === current ? ' active' : ''}`}>
              <img
                src={slide?.url || slide}
                alt={slide?.alt || ''}
                onClick={() => setLightbox(i)}
              />
            </div>
          ))}
        </div>

        {/* Desktop arrows */}
        {slides.length > 1 && (
          <div className="prs-arrows-mobile">
            <button className="prs-arrow prs-arrow-left" onClick={prev} aria-label="Previous">‹</button>
            <button className="prs-arrow prs-arrow-right" onClick={next} aria-label="Next">›</button>
          </div>
        )}

        {/* Mobile dot indicators */}
        {slides.length > 1 && (
          <div className="prs-dots">
            {slides.map((_, i) => (
              <div
                key={i}
                onClick={() => setCurrent(i)}
                style={{
                  height: '8px',
                  width: i === current ? '20px' : '8px',
                  borderRadius: '4px',
                  background: i === current ? '#0ebcc2' : 'rgba(255,255,255,0.3)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="prs-lightbox"
          onClick={() => setLightbox(null)}
          onTouchStart={handleLbTouchStart}
          onTouchEnd={handleLbTouchEnd}
        >
          <button
            className="prs-lb-close"
            onClick={() => setLightbox(null)}
            aria-label="Close"
          >
            &times;
          </button>

          <img
            className="prs-lightbox-img"
            src={slides[lightbox]?.url || slides[lightbox]}
            alt={slides[lightbox]?.alt || ''}
            onClick={e => e.stopPropagation()}
          />

          {slides.length > 1 && (
            <>
              <button
                className="prs-lb-arrow prs-lb-arrow-left"
                onClick={e => { e.stopPropagation(); lbPrev() }}
                aria-label="Previous"
              >
                ‹
              </button>
              <button
                className="prs-lb-arrow prs-lb-arrow-right"
                onClick={e => { e.stopPropagation(); lbNext() }}
                aria-label="Next"
              >
                ›
              </button>

              {/* Mobile dot indicators */}
              <div className="prs-lb-dots" onClick={e => e.stopPropagation()}>
                {slides.map((_, i) => (
                  <div
                    key={i}
                    onClick={e => { e.stopPropagation(); setLightbox(i) }}
                    style={{
                      height: '8px',
                      width: i === lightbox ? '20px' : '8px',
                      borderRadius: '4px',
                      background: i === lightbox ? '#0ebcc2' : 'rgba(255,255,255,0.3)',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                    }}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}

/* ─────────────────────────────────────────────
   ProvenResultsSection
   Full section with ACF heading + slider
   ───────────────────────────────────────────── */
export default function ProvenResultsSection({ acf }) {
  const {
    results_h2: heading,
    results_paragraph: paragraph,
    results_slider: sliderRepeater,
  } = acf

  if (!heading) return null

  const slides = Array.isArray(sliderRepeater)
    ? sliderRepeater
        .map(item => item.results_slider_image || null)
        .filter(Boolean)
    : []

  return (
    <section style={{ background: '#0a0a0a', padding: '80px 0', textAlign: 'center' }}>

      {/* H2 + paragraph */}
      <div style={{ maxWidth: '850px', margin: '0 auto', padding: '0 24px' }}>
        <h2
          style={{
            color: 'white',
            fontWeight: 700,
            fontSize: 'clamp(32px, 4vw, 52px)',
            lineHeight: 1.15,
          }}
        >
          {heading}
        </h2>

        {paragraph && (
          <div
            style={{
              color: 'rgba(255,255,255,0.75)',
              fontSize: '18px',
              marginTop: '16px',
              lineHeight: 1.7,
            }}
            dangerouslySetInnerHTML={{ __html: paragraph }}
            suppressHydrationWarning
          />
        )}
      </div>

      {/* Slider */}
      {slides.length > 0 && <ImageSlider slides={slides} />}

    </section>
  )
}
