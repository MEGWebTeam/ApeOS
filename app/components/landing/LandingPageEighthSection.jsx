export default function LandingPageEighthSection({ acf }) {
  const repeaterItems = acf.eighth_section_right_col_repeater ?? []

  const rawParagraph = (acf.eighth_section_paragraph ?? '')
    .replace(/<\/?p>/g, '')
  const paragraphLines = rawParagraph
    .split('\n')
    .filter((line) => line.trim() !== '')

  return (
    <section style={{ background: '#10272c', padding: '100px 0' }}>
      <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 48px' }} className="lp-eighth-wrap">
        <div className="lp-eighth-grid">

          {/* LEFT COLUMN */}
          <div>
            {acf.eighth_section_mini_heading && (
              <p style={eyebrowStyle}>{acf.eighth_section_mini_heading}</p>
            )}
            {acf.eighth_section_h2 && (
              <h2 style={h2Style}>{acf.eighth_section_h2}</h2>
            )}
            {acf.eighth_section_h4 && (
              <h4 style={h4Style}>{acf.eighth_section_h4}</h4>
            )}
            {paragraphLines.map((line, i) => (
              <p key={i} style={paraStyle}>{line}</p>
            ))}
          </div>

          {/* RIGHT COLUMN */}
          <div>
            {repeaterItems.map((item, i) => (
              <div
                key={i}
                style={{
                  background: 'rgb(26,26,26)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '8px',
                  padding: '18px 20px',
                  marginBottom: i === repeaterItems.length - 1 ? 0 : '10px',
                }}
              >
                {item.eighth_section_repeater_bold && (
                  <p style={cardLabelStyle}>{item.eighth_section_repeater_bold}</p>
                )}
                {item.eighth_section_repeater_paragraph && (
                  <p style={cardParaStyle}>{item.eighth_section_repeater_paragraph}</p>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>

      <style>{`
        .lp-eighth-grid {
          display: grid;
          grid-template-columns: 1fr 420px;
          gap: 64px;
          align-items: start;
        }

        @media (max-width: 900px) {
          .lp-eighth-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 600px) {
          .lp-eighth-wrap {
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
  marginBottom: '8px',
  marginTop: 0,
}

const h4Style = {
  fontSize: '20px',
  fontWeight: 700,
  color: '#00BCD4',
  marginBottom: '20px',
  marginTop: 0,
}

const paraStyle = {
  fontSize: '15px',
  color: 'rgb(160,160,160)',
  lineHeight: 1.72,
  marginBottom: '14px',
  marginTop: 0,
}

const cardLabelStyle = {
  fontSize: '11px',
  fontWeight: 700,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: '#00BCD4',
  marginBottom: '8px',
  marginTop: 0,
}

const cardParaStyle = {
  fontSize: '13px',
  color: 'rgb(160,160,160)',
  lineHeight: 1.6,
  margin: 0,
}
