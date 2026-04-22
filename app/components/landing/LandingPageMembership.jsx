export default function LandingPageMembership({ acf }) {
  const listItems = acf.membership_list ?? []
  const openNewTab = acf.open_cta_in_new_tab === true

  return (
    <section style={{ background: '#10272c', padding: '100px 0' }}>
      <div
        style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 48px' }}
        className="lp-mem-wrap"
      >
        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <p style={eyebrowStyle}>{acf.membership_mini_heading}</p>
          <h2 style={h2Style}>{acf.membership_h2}</h2>
          {acf.membership_paragraph && (
            <p style={subParaStyle}>{acf.membership_paragraph}</p>
          )}
        </div>

        {/* Card wrapper */}
        <div style={{ maxWidth: '660px', margin: '0 auto' }}>
          <div style={cardStyle}>

            {/* Card header */}
            <div style={cardHeaderStyle}>
              <div>
                <p style={cardTitleStyle}>{acf.membership_white_h3}</p>
                <p style={cardBlurbStyle}>{acf.membership_blurb}</p>
              </div>
              {acf.membership_yellow_price_badge && (
                <span style={badgeStyle}>{acf.membership_yellow_price_badge}</span>
              )}
            </div>

            {/* Items list */}
            <div style={{ padding: '0 30px', display: 'flex', flexDirection: 'column' }}>
              {listItems.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    gap: '13px',
                    alignItems: 'flex-start',
                    padding: '13px 0',
                    borderBottom: i === listItems.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.07)',
                    fontSize: '14px',
                    color: 'rgb(160,160,160)',
                  }}
                >
                  <span style={chkStyle}>
                    <svg viewBox="0 0 9 9" fill="none" width="9" height="9">
                      <path d="M1.5 4.5l2.5 2.5L7.5 2" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  {item.membership_list_item}
                </div>
              ))}
            </div>

            {/* Card footer */}
            <div style={cardFooterStyle}>
              {/* Price row */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                <span style={priceNumStyle}>{acf.membership_yellow_price}</span>
                <span style={pricePerMonthStyle}>{acf.membership_price_per_month}</span>
              </div>

              {/* Price note */}
              {acf.membership_regular_price_statement && (
                <p style={priceNoteStyle}>{acf.membership_regular_price_statement}</p>
              )}

              {/* CTA Button */}
              <a
                href={acf.membership_cta_link}
                className="lp-mem-btn"
                {...(openNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {acf.membership_cta_text}
              </a>

              {/* Disclaimer */}
              {acf.membership_last_paragraph && (
                <p style={disclaimerStyle}>{acf.membership_last_paragraph}</p>
              )}
            </div>

          </div>
        </div>
      </div>

      <style>{`
        .lp-mem-btn {
          display: block;
          width: 100%;
          text-align: center;
          padding: 15px;
          border: 1px solid rgb(255,191,0);
          border-radius: 5px;
          background: transparent;
          color: white;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.7px;
          text-transform: uppercase;
          text-decoration: none;
          box-sizing: border-box;
          transition: background 0.2s ease, color 0.2s ease;
        }

        .lp-mem-btn:hover {
          background: rgb(255,191,0);
          color: rgb(18,18,18);
        }

        @media (max-width: 600px) {
          .lp-mem-wrap {
            padding-left: 24px !important;
            padding-right: 24px !important;
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
  marginBottom: '14px',
  marginTop: 0,
}

const subParaStyle = {
  fontSize: '17px',
  color: 'rgb(160,160,160)',
  textAlign: 'center',
  margin: 0,
}

const cardStyle = {
  background: 'rgb(26,26,26)',
  border: '2px solid #00BCD4',
  borderRadius: '12px',
  overflow: 'hidden',
  width: '100%',
}

const cardHeaderStyle = {
  background: 'rgb(16,39,44)',
  padding: '26px 30px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
}

const cardTitleStyle = {
  fontSize: '17px',
  fontWeight: 800,
  color: 'white',
  marginBottom: '4px',
  marginTop: 0,
}

const cardBlurbStyle = {
  fontSize: '12px',
  color: 'rgb(160,160,160)',
  margin: 0,
}

const badgeStyle = {
  background: 'rgb(255,191,0)',
  color: 'rgb(18,18,18)',
  fontSize: '10px',
  fontWeight: 700,
  borderRadius: '20px',
  padding: '5px 12px',
  whiteSpace: 'nowrap',
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

const cardFooterStyle = {
  background: 'rgb(16,39,44)',
  padding: '26px 30px',
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',
}

const priceNumStyle = {
  fontSize: '52px',
  fontWeight: 900,
  color: '#FFBF00',
  lineHeight: 1,
}

const pricePerMonthStyle = {
  fontSize: '18px',
  fontWeight: 600,
  color: 'rgb(160,160,160)',
}

const priceNoteStyle = {
  fontSize: '12px',
  color: 'rgb(107,107,107)',
  margin: 0,
}

const disclaimerStyle = {
  fontSize: '11.5px',
  color: 'rgb(107,107,107)',
  fontStyle: 'italic',
  textAlign: 'center',
  marginTop: '12px',
  marginBottom: 0,
}
