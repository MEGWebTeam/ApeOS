const getInitials = (name) =>
  (name ?? '').split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase()

export default function LandingPageTestimonials({ acf }) {
  const testimonials = acf.testimonials_repeater ?? []

  return (
    <section style={{ background: '#121212', padding: '100px 0' }}>
      <div
        style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 48px' }}
        className="lp-tm-wrap"
      >
        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: '44px' }}>
          <p style={eyebrowStyle}>{acf.testimonials_mini_heading}</p>
          <h2 style={h2Style}>{acf.testimonials_h2}</h2>
          {acf.testimonials_mini_paragraph && (
            <p style={miniParaStyle}>{acf.testimonials_mini_paragraph}</p>
          )}
        </div>

        {/* Cards flex grid */}
        <div className="lp-tm-grid">
          {testimonials.map((item, i) => (
            <div key={i} className="lp-tm-card lp-testi-card">
              {/* Quote mark */}
              <span style={quoteMarkStyle}>&ldquo;</span>

              {/* Blockquote */}
              <blockquote style={blockquoteStyle}>{item.review}</blockquote>

              {/* Attribution */}
              <div style={attrStyle}>
                <div style={avatarStyle}>
                  {getInitials(item.reviewer_name)}
                </div>
                <div style={roleStyle}>
                  <strong style={{ color: 'rgb(240,240,240)', fontWeight: 600 }}>
                    {item.reviewer_name}
                  </strong>
                  <span style={{ display: 'block' }}>{item.reviewer_title}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Below cards */}
        {acf.testimonials_last_paragraph && (
          <p style={lastParaStyle}>{acf.testimonials_last_paragraph}</p>
        )}
      </div>

      <style>{`
        .lp-testi-card {
          background: rgb(26, 26, 26);
          border: 1px solid rgba(255,255,255,0.07);
          border-top: 2px solid transparent;
          border-radius: 8px;
          padding: 28px 24px;
          display: flex;
          flex-direction: column;
          transition: transform 0.3s ease, border-top-color 0.3s ease;
        }

        .lp-testi-card:hover {
          border-top-color: #00BCD4;
          transform: translateY(-6px);
        }

        .lp-tm-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 18px;
          justify-content: center;
          margin-top: 44px;
        }

        .lp-tm-card {
          flex: 0 0 calc(33.333% - 12px);
          max-width: calc(33.333% - 12px);
        }

        @media (max-width: 900px) {
          .lp-tm-card {
            flex: 0 0 calc(50% - 9px);
            max-width: calc(50% - 9px);
          }
          .lp-tm-wrap {
            padding-left: 24px !important;
            padding-right: 24px !important;
          }
        }

        @media (max-width: 600px) {
          .lp-tm-card {
            flex: 0 0 100%;
            max-width: 100%;
          }
        }
      `}</style>
    </section>
  )
}

const eyebrowStyle = {
  fontSize: '13.5px',
  color: 'rgb(107,107,107)',
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
  marginBottom: '10px',
  marginTop: 0,
}

const miniParaStyle = {
  fontSize: '13.5px',
  color: 'rgb(107,107,107)',
  fontStyle: 'italic',
  textAlign: 'center',
  margin: 0,
}

const quoteMarkStyle = {
  display: 'block',
  fontSize: '60px',
  lineHeight: '48px',
  color: '#00BCD4',
  marginBottom: '4px',
  fontFamily: 'Georgia, serif',
}

const blockquoteStyle = {
  fontSize: '14px',
  color: 'rgb(240,240,240)',
  fontStyle: 'italic',
  lineHeight: 1.72,
  marginBottom: '18px',
  flexGrow: 1,
  margin: '0 0 18px 0',
}

const attrStyle = {
  display: 'flex',
  gap: '11px',
  alignItems: 'center',
  borderTop: '1px solid rgba(255,255,255,0.07)',
  paddingTop: '14px',
}

const avatarStyle = {
  width: '36px',
  height: '36px',
  minWidth: '36px',
  borderRadius: '50%',
  background: 'rgb(16,39,44)',
  border: '1px solid rgba(255,255,255,0.12)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '11px',
  fontWeight: 700,
  color: 'rgb(160,160,160)',
  flexShrink: 0,
}

const roleStyle = {
  fontSize: '12px',
  color: 'rgb(160,160,160)',
}

const lastParaStyle = {
  fontSize: '13.5px',
  color: 'rgb(107,107,107)',
  textAlign: 'center',
  marginTop: '36px',
  marginBottom: 0,
}

