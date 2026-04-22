'use client'

import { useState } from 'react'

export default function LandingPageFAQ({ acf }) {
  const items = acf.faq_accordion ?? []
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section style={{ background: '#121212', padding: '100px 0' }}>
      <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 48px' }} className="lp-faq-wrap">
        <div className="lp-faq-grid">

          {/* LEFT COLUMN */}
          <div>
            {acf.faq_mini_heading && (
              <p style={eyebrowStyle}>{acf.faq_mini_heading}</p>
            )}
            {acf.faq_h2 && (
              <h2 style={h2Style}>{acf.faq_h2}</h2>
            )}
            {acf.faq_paragraph && (
              <p style={paraStyle}>{acf.faq_paragraph}</p>
            )}
            {acf.faq_cta_pre_para && (
              <p style={ctaPreStyle}>{acf.faq_cta_pre_para}</p>
            )}
            {acf.faq_cta_link && acf.faq_cta_text && (
              <a href={acf.faq_cta_link} style={ctaLinkStyle}>{acf.faq_cta_text}</a>
            )}
          </div>

          {/* RIGHT COLUMN — Accordion */}
          <div>
            {items.map((item, i) => {
              const isOpen = activeIndex === i
              return (
                <div
                  key={i}
                  style={{
                    ...(i > 0 ? { borderTop: '1px solid rgba(255,255,255,0.07)' } : {}),
                    ...(i < items.length - 1 ? { borderBottom: '1px solid rgba(255,255,255,0.07)' } : {}),
                  }}
                >
                  <div
                    style={questionRowStyle}
                    onClick={() => { if (i !== activeIndex) setActiveIndex(i) }}
                  >
                    <span style={{ ...questionTextStyle, color: isOpen ? 'white' : 'rgb(200,200,200)' }}>
                      {item.accordion_header}
                    </span>
                    <span style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '50%',
                      background: isOpen ? '#00BCD4' : 'rgba(255,255,255,0.07)',
                      color: 'white',
                      fontSize: '13px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      lineHeight: 1,
                      userSelect: 'none',
                    }}>
                      {isOpen ? '−' : '+'}
                    </span>
                  </div>
                  <div style={{
                    maxHeight: isOpen ? '500px' : '0',
                    overflow: 'hidden',
                    transition: 'max-height 0.35s ease',
                  }}>
                    <p style={answerStyle}>{item.faq_content}</p>
                  </div>
                </div>
              )
            })}
          </div>

        </div>
      </div>

      <style>{`
        .lp-faq-grid {
          display: grid;
          grid-template-columns: 340px 1fr;
          gap: 80px;
          align-items: start;
        }

        @media (max-width: 900px) {
          .lp-faq-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 600px) {
          .lp-faq-wrap {
            padding-left: 24px !important;
            padding-right: 24px !important;
          }
        }
      `}</style>
    </section>
  )
}

const eyebrowStyle = {
  fontSize: '15px',
  color: 'rgb(160,160,160)',
  fontWeight: 700,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  marginBottom: '12px',
  marginTop: 0,
}

const h2Style = {
  fontSize: 'clamp(28px, 3vw, 42px)',
  fontWeight: 800,
  color: 'white',
  lineHeight: 1.1,
  marginBottom: '16px',
  marginTop: 0,
}

const paraStyle = {
  fontSize: '15px',
  color: 'rgb(160,160,160)',
  lineHeight: 1.7,
  marginBottom: '28px',
  marginTop: 0,
}

const ctaPreStyle = {
  fontSize: '14px',
  color: 'rgb(160,160,160)',
  marginBottom: '4px',
  marginTop: 0,
}

const ctaLinkStyle = {
  color: '#00BCD4',
  fontSize: '14px',
  fontWeight: 600,
  textDecoration: 'none',
  display: 'inline-block',
}

const questionRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 0',
  cursor: 'pointer',
}

const questionTextStyle = {
  fontSize: '15px',
  fontWeight: 600,
}

const answerStyle = {
  padding: '0 0 18px 0',
  fontSize: '14px',
  color: 'rgb(160,160,160)',
  lineHeight: 1.7,
  margin: 0,
}
