'use client'

import { useEffect, useRef, useState } from 'react'

function parseNumber(raw) {
  // Extract leading numeric part (digits and commas), preserve trailing non-numeric suffix
  const match = (raw ?? '').match(/^([\d,]+)(.*)$/)
  if (!match) return { value: 0, suffix: raw ?? '', hasCommas: false }
  const hasCommas = match[1].includes(',')
  const value = parseInt(match[1].replace(/,/g, ''), 10)
  return { value, suffix: match[2], hasCommas }
}

function formatNumber(n, hasCommas) {
  if (!hasCommas) return String(n)
  return n.toLocaleString('en-US')
}

function StatBox({ item, animate, isLast }) {
  const { value, suffix: numSuffix, hasCommas } = parseNumber(item.counter_number)
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!animate) return
    const duration = 2000
    const start = performance.now()

    const tick = (now) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // ease-out: 1 - (1 - t)^3
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(eased * value))
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [animate, value])

  return (
    <div
      style={{
        padding: '40px 32px',
        textAlign: 'center',
        borderRight: isLast ? 'none' : '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', flexWrap: 'nowrap', margin: '0 auto', justifyContent: 'center' }}>
        {item.counter_prefix && (
          <span style={numberStyle}>{item.counter_prefix}</span>
        )}
        <span style={numberStyle}>{formatNumber(display, hasCommas)}</span>
        {numSuffix && (
          <span style={{ ...numberStyle, color: '#00BCD4' }}>{numSuffix}</span>
        )}
        {item.counter_suffix && (
          <span style={{ ...numberStyle, color: '#00BCD4' }}>{item.counter_suffix}</span>
        )}
      </div>
      <div style={{ ...labelStyle, margin: '8px auto 0' }}>{item.counter_text}</div>
    </div>
  )
}

const numberStyle = {
  color: '#ffffff',
  fontSize: 'clamp(28px, 3vw, 42px)',
  fontWeight: 800,
  lineHeight: 1,
}

const labelStyle = {
  color: '#a0a0a0',
  fontSize: '11px',
  fontWeight: 600,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  marginTop: '8px',
}

export default function LandingPageCounter({ acf }) {
  const sectionRef = useRef(null)
  const [animate, setAnimate] = useState(false)

  const items = acf.counter_repeater ?? []

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  if (!items.length) return null

  return (
    <section ref={sectionRef} style={{ backgroundColor: '#10272c', width: '100%', borderTop: '1px solid rgba(255,255,255,0.07)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
      <div style={{ width: '100%', padding: '0 24px' }}>
        <div className="lp-counter-grid">
          {items.map((item, i) => (
            <StatBox
              key={i}
              item={item}
              animate={animate}
              isLast={i === items.length - 1}
            />
          ))}
        </div>
      </div>

      <style>{`
        .lp-counter-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          width: 100%;
        }

        @media (max-width: 768px) {
          .lp-counter-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .lp-counter-grid > div {
            border-right: none !important;
          }
        }

        @media (max-width: 480px) {
          .lp-counter-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}
