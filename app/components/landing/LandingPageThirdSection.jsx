const ICONS = [
  <svg key={0} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
    <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>,
  <svg key={1} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
    <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>,
  <svg key={2} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
    <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>,
]

export default function LandingPageThirdSection({ acf }) {
  const blocks = acf.third_section_block_repeater ?? []

  const subtext = (acf.third_section_paragraph ?? '').replace(/<\/?p>/g, '').trim()

  return (
    <section style={{ background: '#10272c', padding: '100px 0' }}>
      <div
        style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 80px' }}
        className="lp-ts-wrap"
      >
        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <p style={eyebrowStyle}>{acf.third_section_mini_heading}</p>
          <h2 style={h2Style}>{acf.third_section_h2}</h2>
          {subtext && (
            <p style={subParaStyle}>{subtext}</p>
          )}
        </div>

        {/* Cards grid */}
        <div className="lp-ts-grid">
          {blocks.map((block, i) => (
            <div key={i} className="lp-third-card">
              {/* Icon box */}
              <div style={iconBoxStyle} aria-hidden="true">
                <span style={{ color: '#00BCD4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {ICONS[i % ICONS.length]}
                </span>
              </div>

              {/* Card title */}
              <p style={cardTitleStyle}>{block.third_section_block_h3}</p>

              {/* Card text */}
              <p style={cardTextStyle}>{block.third_section_block_paragraph}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .lp-third-card {
          background: rgb(26, 26, 26);
          border-top: 2px solid transparent;
          border-right: 1px solid rgba(255,255,255,0.07);
          border-bottom: 1px solid rgba(255,255,255,0.07);
          border-left: none;
          border-radius: 8px;
          padding: 26px 22px;
          transition: transform 0.3s ease, border-top-color 0.3s ease;
          cursor: default;
        }
        .lp-third-card:hover {
          border-top-color: #00BCD4;
          transform: translateY(-6px);
        }

        .lp-ts-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }

        @media (max-width: 768px) {
          .lp-ts-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .lp-ts-wrap {
            padding-left: 24px !important;
            padding-right: 24px !important;
          }
        }

        @media (max-width: 480px) {
          .lp-ts-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}

const eyebrowStyle = {
  fontSize: '17px',
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
  textAlign: 'center',
  lineHeight: 1.1,
  letterSpacing: '-0.02em',
  marginBottom: '16px',
  marginTop: 0,
}

const subParaStyle = {
  fontSize: '17px',
  color: 'rgb(160,160,160)',
  textAlign: 'center',
  maxWidth: '600px',
  margin: '0 auto',
}


const iconBoxStyle = {
  width: '42px',
  height: '42px',
  background: 'rgba(78,197,220,0.08)',
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '14px',
}

const cardTitleStyle = {
  fontSize: '15px',
  fontWeight: 700,
  color: 'white',
  marginBottom: '9px',
  marginTop: 0,
}

const cardTextStyle = {
  fontSize: '13.5px',
  color: 'rgb(160,160,160)',
  lineHeight: 1.65,
  margin: 0,
}
