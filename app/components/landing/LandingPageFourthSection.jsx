export default function LandingPageFourthSection({ acf }) {
  const listItems = acf.fourth_section_list ?? []
  const repeaterItems = acf.fourth_section_right_col_repeater ?? []

  const paragraph = (acf.fourth_section_paragraph ?? '').replace(/<\/?p>/g, '').trim()

  return (
    <section style={{ background: '#121212', padding: '100px 0' }}>
      <div
        style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 48px' }}
        className="lp-fs-wrap"
      >
        <div className="lp-fs-grid">

          {/* Left column */}
          <div>
            <p style={eyebrowStyle}>{acf.fourth_section_mini_heading}</p>
            <h2 style={h2Style}>{acf.fourth_section_heading_h2}</h2>
            {paragraph && <p style={paraStyle}>{paragraph}</p>}

            {/* Checklist */}
            <ul style={{ listStyle: 'none', margin: '8px 0 0', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {listItems.map((item, i) => (
                <li key={i} style={{ display: 'flex', gap: '11px', alignItems: 'flex-start', fontSize: '14.5px', color: 'rgb(160,160,160)' }}>
                  <span style={chkStyle}>
                    <svg viewBox="0 0 9 9" fill="none" width="9" height="9">
                      <path d="M1.5 4.5l2.5 2.5L7.5 2" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  {item.fourth_section_list_item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right column — Inside card */}
          <div style={cardStyle}>
            {/* Card header */}
            <div style={cardHeaderStyle}>{acf.fourth_section_right_col_h3}</div>

            {/* Repeater items */}
            {repeaterItems.map((item, i) => (
              <div
                key={i}
                style={{
                  padding: '18px 22px',
                  borderBottom: i === repeaterItems.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.07)',
                }}
              >
                <p style={insideH4Style}>{item.fourth_section_right_col_bold}</p>
                <p style={insideParaStyle}>{item.fourth_section_right_col_paragraph}</p>
              </div>
            ))}

            {/* Footer */}
            {acf.fourth_section_right_col_last_paragraph && (
              <div style={cardFooterStyle}>{acf.fourth_section_right_col_last_paragraph}</div>
            )}
          </div>

        </div>
      </div>

      <style>{`
        .lp-fs-grid {
          display: grid;
          grid-template-columns: 1fr 420px;
          gap: 64px;
          align-items: start;
        }

        @media (max-width: 900px) {
          .lp-fs-grid {
            grid-template-columns: 1fr;
          }
          .lp-fs-wrap {
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
  letterSpacing: '-0.02em',
  marginBottom: '18px',
  marginTop: 0,
}

const paraStyle = {
  fontSize: '15px',
  color: 'rgb(160,160,160)',
  lineHeight: 1.72,
  marginBottom: '24px',
  marginTop: 0,
}

const chkStyle = {
  width: '19px',
  height: '19px',
  minWidth: '19px',
  borderRadius: '50%',
  background: 'rgba(34,197,94,0.1)',
  border: '1px solid rgba(34,197,94,0.25)',
  flexShrink: 0,
  marginTop: '2px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

const cardStyle = {
  background: 'rgb(26,26,26)',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: '8px',
  padding: 0,
  overflow: 'hidden',
}

const cardHeaderStyle = {
  background: 'rgb(16,39,44)',
  padding: '14px 22px',
  color: 'rgb(160,160,160)',
  fontSize: '11px',
  fontWeight: 700,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  borderBottom: '1px solid rgba(255,255,255,0.07)',
}

const insideH4Style = {
  fontSize: '13.5px',
  fontWeight: 700,
  color: 'white',
  marginBottom: '5px',
  marginTop: 0,
}

const insideParaStyle = {
  fontSize: '13px',
  color: 'rgb(160,160,160)',
  lineHeight: 1.6,
  margin: 0,
}

const cardFooterStyle = {
  background: 'rgba(78,197,220,0.04)',
  padding: '14px 22px',
  color: 'rgb(160,160,160)',
  fontSize: '12.5px',
  fontStyle: 'italic',
}
