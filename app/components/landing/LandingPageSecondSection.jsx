export default function LandingPageSecondSection({ acf }) {
  const items = acf.second_section_list ?? []

  // Strip all <p> tags from WYSIWYG, split into lines
  const paragraphs = (acf.second_section_paragraph ?? '')
    .replace(/<\/?p>/g, '')
    .split('\n')
    .map(s => s.trim())
    .filter(Boolean)

  return (
    <section style={{ padding: '100px 0', background: '#121212' }}>
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          paddingLeft: '80px',
          paddingRight: '80px',
        }}
        className="lp-ss-wrap"
      >
        <div className="lp-ss-grid">
          {/* Left column */}
          <div>
            {/* Eyebrow */}
            <p style={eyebrowStyle}>{acf.second_section_mini_heading}</p>

            {/* H2 */}
            <h2 style={h2Style}>{acf.second_section_heading_h2}</h2>

            {/* Paragraphs */}
            {paragraphs.map((text, i) => (
              <p key={i} style={paraStyle}>{text}</p>
            ))}
          </div>

          {/* Right column — Glance card */}
          <div style={cardStyle}>
            {/* Card heading */}
            <p style={cardHeadingStyle}>{acf.second_section_right_col_heading}</p>

            {/* Checklist */}
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {items.map((item, i) => (
                <li key={i} style={listItemStyle}>
                  <span style={iconWrapStyle}>
                    <svg
                      width="9"
                      height="9"
                      viewBox="0 0 9 9"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ display: 'block', margin: 'auto' }}
                    >
                      <polyline
                        points="1.5,4.5 3.5,6.5 7.5,2.5"
                        stroke="#00BCD4"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span
                    className="lp-ss-gt"
                    style={itemTextStyle}
                    dangerouslySetInnerHTML={{ __html: item.second_section_list_item }}
                    suppressHydrationWarning
                  />
                </li>
              ))}
            </ul>

            {/* Footer text */}
            {acf.second_section_right_col_paragraph && (
              <p style={footerTextStyle}>{acf.second_section_right_col_paragraph}</p>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .lp-ss-grid {
          display: grid;
          grid-template-columns: 1fr 390px;
          gap: 64px;
          align-items: start;
        }

        .lp-ss-gt strong {
          color: white;
          font-weight: 600;
        }

        @media (max-width: 900px) {
          .lp-ss-grid {
            grid-template-columns: 1fr;
          }
          .lp-ss-wrap {
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
  letterSpacing: '0.12em',
  fontWeight: 700,
  textTransform: 'uppercase',
  marginBottom: '12px',
  marginTop: 0,
}

const h2Style = {
  fontSize: 'clamp(28px, 3vw, 42px)',
  fontWeight: 800,
  color: 'white',
  lineHeight: 1.1,
  letterSpacing: '-0.02em',
  marginBottom: '18px',
  marginTop: 0,
}

const paraStyle = {
  color: 'rgb(160,160,160)',
  fontSize: '15px',
  lineHeight: 1.72,
  marginBottom: '14px',
  marginTop: 0,
}

const cardStyle = {
  background: 'rgb(26,26,26)',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: '8px',
  padding: '26px',
}

const cardHeadingStyle = {
  fontSize: '12px',
  fontWeight: 700,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'rgb(160,160,160)',
  paddingBottom: '14px',
  borderBottom: '1px solid rgba(255,255,255,0.07)',
  marginBottom: '16px',
  marginTop: 0,
}

const listItemStyle = {
  display: 'flex',
  gap: '11px',
  alignItems: 'flex-start',
  marginBottom: '13px',
}

const iconWrapStyle = {
  width: '17px',
  height: '17px',
  minWidth: '17px',
  background: 'rgba(78,197,220,0.1)',
  border: '1px solid rgba(78,197,220,0.25)',
  borderRadius: '50%',
  flexShrink: 0,
  marginTop: '2px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

const itemTextStyle = {
  fontSize: '13.5px',
  color: 'rgb(160,160,160)',
  lineHeight: 1.5,
}

const footerTextStyle = {
  fontSize: '13px',
  color: 'rgb(107,107,107)',
  fontStyle: 'italic',
  marginTop: '18px',
  marginBottom: 0,
  borderTop: '1px solid rgba(255,255,255,0.07)',
  paddingTop: '16px',
}
