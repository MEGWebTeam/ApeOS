export default function LandingPageContact({ acf }) {
  const listItems = acf.contact_list ?? []

  const rawParagraph = (acf.contact_paragraph ?? '').replace(/<\/?p>/g, '')
  const paragraphLines = rawParagraph.split('\n').filter((l) => l.trim() !== '')

  const rawSecond = (acf.contact_second_paragraph ?? '').replace(/<\/?p>/g, '').trim()

  return (
    <section style={{ background: '#10272c', padding: '100px 0' }}>
      <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 48px' }} className="lp-contact-wrap">
        <div className="lp-contact-grid">

          {/* LEFT COLUMN */}
          <div>
            {acf.contact_mini_heading && (
              <p style={eyebrowStyle}>{acf.contact_mini_heading}</p>
            )}
            {acf.contact_h2 && (
              <h2 style={h2Style}>{acf.contact_h2}</h2>
            )}
            {paragraphLines.map((line, i) => (
              <p key={i} style={paraStyle}>{line}</p>
            ))}

            {listItems.length > 0 && (
              <div style={listWrapStyle}>
                {listItems.map((item, i) => (
                  <div key={i} style={stepRowStyle}>
                    <span style={badgeStyle}>{i + 1}</span>
                    <p
                      style={stepTextStyle}
                      dangerouslySetInnerHTML={{ __html: item.contact_list_item }}
                      suppressHydrationWarning
                    />
                  </div>
                ))}
              </div>
            )}

            {rawSecond && (
              <p style={secondParaStyle}>{rawSecond}</p>
            )}
          </div>

          {/* RIGHT COLUMN — Form card */}
          <div style={cardWrapStyle}>
            <div style={cardHeaderStyle}>
              {acf.contact_right_col_h3 && (
                <p style={cardHeadingStyle}>{acf.contact_right_col_h3}</p>
              )}
              {acf.contact_right_col_paragraph && (
                <p style={cardSubtextStyle}>{acf.contact_right_col_paragraph}</p>
              )}
            </div>
            <div
              style={formAreaStyle}
              dangerouslySetInnerHTML={{ __html: acf.contact_right_col_embed_script ?? '' }}
              suppressHydrationWarning
            />
          </div>

        </div>
      </div>

      <style>{`
        .lp-contact-grid {
          display: grid;
          grid-template-columns: 1fr 480px;
          gap: 80px;
          align-items: start;
        }

        .lp-contact-grid strong {
          color: white;
          font-weight: 600;
        }

        @media (max-width: 900px) {
          .lp-contact-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 600px) {
          .lp-contact-wrap {
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
  marginBottom: '14px',
  marginTop: 0,
}

const listWrapStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',
  marginBottom: '24px',
}

const stepRowStyle = {
  display: 'flex',
  gap: '14px',
  alignItems: 'flex-start',
}

const badgeStyle = {
  width: '26px',
  height: '26px',
  borderRadius: '50%',
  background: 'rgba(78,197,220,0.15)',
  border: '1px solid rgba(78,197,220,0.3)',
  color: '#00BCD4',
  fontSize: '12px',
  fontWeight: 700,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  marginTop: '2px',
}

const stepTextStyle = {
  fontSize: '14px',
  color: 'rgb(160,160,160)',
  lineHeight: 1.6,
  margin: 0,
}

const secondParaStyle = {
  fontSize: '13px',
  color: 'rgb(107,107,107)',
  fontStyle: 'italic',
  lineHeight: 1.6,
  margin: 0,
}

const cardWrapStyle = {
  background: 'rgb(26,26,26)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '12px',
  overflow: 'hidden',
}

const cardHeaderStyle = {
  background: 'rgb(16,39,44)',
  padding: '20px 24px',
  borderBottom: '1px solid rgba(255,255,255,0.07)',
}

const cardHeadingStyle = {
  fontSize: '15px',
  fontWeight: 700,
  color: 'white',
  marginBottom: '4px',
  marginTop: 0,
}

const cardSubtextStyle = {
  fontSize: '12px',
  color: 'rgb(160,160,160)',
  margin: 0,
}

const formAreaStyle = {
  background: 'white',
  padding: '24px',
}
