export default function LandingPageFifthSection({ acf }) {
  const cards = acf.fifth_section_repeater ?? []

  const introText = (acf.fifth_section_paragraph ?? '').replace(/<\/?p>/g, '').trim()

  return (
    <section style={{ background: '#10272c', padding: '100px 0' }}>
      <div
        style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 48px' }}
        className="lp-fifth-wrap"
      >
        {/* Section header */}
        <div style={{ textAlign: 'center' }}>
          <p style={eyebrowStyle}>{acf.fifth_section_mini_heading}</p>
          <h2 style={h2Style}>{acf.fifth_section_h2}</h2>
        </div>

        {/* Intro paragraph */}
        {introText && (
          <p style={introStyle}>{introText}</p>
        )}

        {/* Cards grid */}
        <div className="ag-grid">
          {cards.map((card, i) => {
            const bullets = card.fifth_section_block_list ?? []
            return (
              <div key={i} className="lp-fifth-card">
                <p style={weekLabelStyle}>{card.fifth_section_block_mini_heading}</p>
                <h3 style={cardTitleStyle}>{card.fifth_section_block_h3}</h3>

                {bullets.length > 0 && (
                  <ul style={bulletListStyle}>
                    {bullets.map((b, j) => (
                      <li key={j} style={{ display: 'flex', gap: '7px', alignItems: 'flex-start', fontSize: '12.5px', color: 'rgb(160,160,160)' }}>
                        <span style={{ color: '#00BCD4', flexShrink: 0, marginTop: '1px' }}>→</span>
                        <span>{b.fifth_section_block_list_item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {card.fifth_section_block_paragraph && (
                  <p style={noteStyle}>{card.fifth_section_block_paragraph}</p>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <style>{`
        .lp-fifth-card {
          background: rgb(26, 26, 26);
          border-top: 2px solid transparent;
          border-right: 1px solid rgba(255,255,255,0.07);
          border-bottom: 1px solid rgba(255,255,255,0.07);
          border-left: none;
          border-radius: 8px;
          padding: 22px 18px;
          transition: transform 0.3s ease, border-top-color 0.3s ease;
          display: flex;
          flex-direction: column;
        }

        .lp-fifth-card:hover {
          border-top-color: #00BCD4;
          transform: translateY(-6px);
        }

        .ag-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
        }

        @media (max-width: 900px) {
          .ag-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .lp-fifth-wrap {
            padding-left: 24px !important;
            padding-right: 24px !important;
          }
        }

        @media (max-width: 480px) {
          .ag-grid {
            grid-template-columns: 1fr;
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
  textAlign: 'center',
  marginBottom: '16px',
  marginTop: 0,
}

const introStyle = {
  maxWidth: '760px',
  margin: '0 auto 44px',
  textAlign: 'center',
  fontSize: '15px',
  color: 'rgb(160,160,160)',
  lineHeight: 1.7,
}

const weekLabelStyle = {
  fontSize: '10px',
  fontWeight: 700,
  letterSpacing: '1px',
  textTransform: 'uppercase',
  color: '#00BCD4',
  marginBottom: '7px',
  marginTop: 0,
}

const cardTitleStyle = {
  fontSize: '14.5px',
  fontWeight: 700,
  color: 'white',
  marginBottom: '13px',
  marginTop: 0,
}

const bulletListStyle = {
  listStyle: 'none',
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  marginBottom: '14px',
  padding: 0,
  margin: '0 0 14px 0',
}

const bulletItemStyle = {
  display: 'flex',
  gap: '7px',
  alignItems: 'flex-start',
  fontSize: '12.5px',
  color: 'rgb(160,160,160)',
}

const noteStyle = {
  fontSize: '11.5px',
  color: 'rgb(107,107,107)',
  marginTop: '12px',
  paddingTop: '12px',
  borderTop: '1px solid rgba(255,255,255,0.07)',
  lineHeight: 1.6,
  marginBottom: 0,
}
