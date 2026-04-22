'use client'

import { useEffect, useRef, useState } from 'react'

export default function LandingPageKyleSection({ acf }) {
  const counters = acf.kyle_onstott_counter ?? []

  const paragraphs = (acf.kyle_onstott_paragraph ?? '')
    .replace(/<\/?p>/g, '')
    .split('\n')
    .map(s => s.trim())
    .filter(Boolean)

  const statsRef = useRef(null)
  const [counts, setCounts] = useState(
    (acf.kyle_onstott_counter ?? []).map(() => 0)
  )

  useEffect(() => {
    const el = statsRef.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.unobserve(el);
      (acf.kyle_onstott_counter ?? []).forEach((item, i) => {
        const raw = (item.kyle_onstott_counter_number ?? '').replace(/[^0-9.]/g, '')
        const target = parseFloat(raw) || 0
        const hasComma = item.kyle_onstott_counter_number?.includes(',')
        const suffix = item.kyle_onstott_counter_number?.replace(/[0-9,\.]/g, '') || ''
        const duration = 2000
        const start = performance.now()
        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1)
          const ease = 1 - Math.pow(1 - progress, 3)
          const current = Math.floor(ease * target)
          setCounts(prev => {
            const next = [...prev]
            next[i] = hasComma ? current.toLocaleString() : current + suffix
            return next
          })
          if (progress < 1) requestAnimationFrame(tick)
          else setCounts(prev => {
            const next = [...prev]
            next[i] = hasComma ? target.toLocaleString() : target + suffix
            return next
          })
        }
        requestAnimationFrame(tick)
      })
    }, { threshold: 0.3 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section style={{ background: '#10272c', padding: '100px 0' }}>
      <div
        style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 48px' }}
        className="lp-kyle-wrap"
      >
        <div className="fac-grid">

          {/* Left column — Image */}
          <div style={photoStyle}>
            {acf.kyle_onstott_image && (
              <img
                src={acf.kyle_onstott_image?.url || acf.kyle_onstott_image}
                alt={acf.kyle_onstott_image?.alt || ''}
                style={{ width: '100%', display: 'block', objectFit: 'cover' }}
              />
            )}
          </div>

          {/* Right column */}
          <div className="fac-copy">
            <p style={eyebrowStyle}>{acf.kyle_onstott_mini_heading}</p>
            <h2 style={h2Style}>{acf.kyle_onstott_h2}</h2>
            <p style={titleStyle}>{acf.kyle_onstott_title}</p>

            {paragraphs.map((text, i) => (
              <p key={i} style={paraStyle}>{text}</p>
            ))}

            {/* Stats row */}
            {counters.length > 0 && (
              <div ref={statsRef} className="fac-stats">
                {counters.map((item, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span className="fac-sn">
                      {item.kyle_onstott_counter_prefix}
                      {counts[i]}
                      {item.kyle_onstott_counter_suffix && (
                        <span style={{ fontSize: '18px' }}>{item.kyle_onstott_counter_suffix}</span>
                      )}
                    </span>
                    <span className="fac-sl">{item.kyle_onstott_counter_text}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      <style>{`
        .fac-grid {
          display: grid;
          grid-template-columns: 260px 1fr;
          gap: 64px;
          align-items: start;
        }

        .fac-stats {
          display: flex;
          gap: 32px;
          margin-top: 26px;
          padding-top: 24px;
          border-top: 1px solid rgba(255,255,255,0.07);
          flex-wrap: wrap;
        }

        .fac-sn {
          font-size: 28px;
          font-weight: 900;
          color: white;
        }

        .fac-sl {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.7px;
          text-transform: uppercase;
          color: rgb(160,160,160);
        }

        @media (max-width: 768px) {
          .fac-grid {
            grid-template-columns: 1fr;
          }
          .lp-kyle-wrap {
            padding-left: 24px !important;
            padding-right: 24px !important;
          }
        }
      `}</style>
    </section>
  )
}

const photoStyle = {
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: '8px',
  overflow: 'hidden',
  width: '100%',
}

const eyebrowStyle = {
  fontSize: '15px',
  color: 'rgb(160,160,160)',
  fontWeight: 700,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  marginBottom: '10px',
  marginTop: 0,
}

const h2Style = {
  fontSize: 'clamp(28px, 3vw, 42px)',
  fontWeight: 800,
  color: 'white',
  marginBottom: '6px',
  marginTop: 0,
}

const titleStyle = {
  fontSize: '15px',
  color: 'rgb(160,160,160)',
  fontWeight: 600,
  marginBottom: '14px',
  marginTop: 0,
}

const paraStyle = {
  fontSize: '15px',
  color: 'rgb(160,160,160)',
  lineHeight: 1.72,
  marginBottom: '14px',
  marginTop: 0,
}
