function resolveItem(raw) {
  if (!raw) return null
  if (typeof raw === 'object') return { url: raw.url || null, alt: raw.alt || '' }
  return { url: raw, alt: '' }
}

export default function ClientLogosSection({ acf }) {
  const {
    client_logos_rtl_repeater: rtlRepeater,
    client_logos_ltr_repeater: ltrRepeater,
  } = acf

  const rtlLogos = Array.isArray(rtlRepeater)
    ? rtlRepeater.map(item => resolveItem(item.client_logos_rtl)).filter(item => item?.url)
    : []

  const ltrLogos = Array.isArray(ltrRepeater)
    ? ltrRepeater.map(item => resolveItem(item.client_logos_ltr)).filter(item => item?.url)
    : []

  if (rtlLogos.length === 0 && ltrLogos.length === 0) return null

  const rtlDoubled = [...rtlLogos, ...rtlLogos]
  const ltrDoubled = [...ltrLogos, ...ltrLogos]

  return (
    <section style={{ background: '#0a0a0a', padding: '60px 0', overflow: 'hidden' }}>
      <style>{`
        @keyframes marquee-rtl {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes marquee-ltr {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
        .cl-row {
          overflow: hidden;
          width: 100%;
        }
        .cl-track-rtl {
          display: flex;
          width: max-content;
          animation: marquee-rtl 20s linear infinite;
        }
        .cl-track-ltr {
          display: flex;
          width: max-content;
          animation: marquee-ltr 20s linear infinite;
        }
        .cl-track-rtl:hover,
        .cl-track-ltr:hover {
          animation-play-state: paused;
        }
        .cl-logo {
          width: calc(100vw / 8);
          height: auto;
          object-fit: contain;
          flex-shrink: 0;
          margin: 0 20px;
          padding: 0;
          filter: grayscale(100%) brightness(0.7);
          transition: filter 0.3s ease;
        }
        .cl-logo:hover {
          filter: grayscale(0%) brightness(1);
        }
        @media (max-width: 1024px) {
          .cl-logo { width: calc(100vw / 6); }
        }
        @media (max-width: 768px) {
          .cl-logo { width: calc(100vw / 4); }
        }
        @media (max-width: 480px) {
          .cl-logo { width: calc(100vw / 2); }
        }
      `}</style>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

        {rtlLogos.length > 0 && (
          <div className="cl-row">
            <div className="cl-track-rtl">
              {rtlDoubled.map((item, i) => (
                <img key={i} src={item.url} alt={item.alt} className="cl-logo" />
              ))}
            </div>
          </div>
        )}

        {ltrLogos.length > 0 && (
          <div className="cl-row">
            <div className="cl-track-ltr">
              {ltrDoubled.map((item, i) => (
                <img key={i} src={item.url} alt={item.alt} className="cl-logo" />
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  )
}
