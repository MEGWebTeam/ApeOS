export default function FourStepsSection({ acf }) {
  const {
    four_steps_h2: heading,
    four_numbered_blocks: blocks,
  } = acf

  return (
    <section className="bg-black py-24 px-6">
      <style>{`
        .four-block {
          position: relative;
          cursor: default;
        }
        .four-block-icon {
          width: 60px;
          object-fit: contain;
          position: relative;
          z-index: 1;
          transition: transform 0.3s ease;
        }
        .four-block:hover .four-block-icon {
          transform: translateY(-8px);
        }
        .four-block-number {
          position: absolute;
          top: -10px;
          left: -50px;
          font-size: 80px;
          font-weight: 900;
          color: rgba(255,255,255,0.08);
          line-height: 1;
          z-index: 0;
          user-select: none;
          transition: transform 0.3s ease;
        }
        .four-block:hover .four-block-number {
          transform: translateX(10px);
        }
        .four-block-title {
          color: white;
          font-weight: 700;
          font-size: 18px;
          position: relative;
          z-index: 1;
          margin-top: 16px;
        }
        @media (max-width: 1024px) { .four-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 640px)  { .four-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 768px) {
          .four-block-number {
            position: relative;
            left: 0;
            display: block;
            margin-bottom: -20px;
          }
        }
      `}</style>

      <div className="max-w-[1440px] mx-auto">

        {heading && (
          <div style={{ maxWidth: '1024px', margin: '0 auto', textAlign: 'center' }}>
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-16">
              {heading}
            </h2>
          </div>
        )}

        {blocks && blocks.length > 0 && (
          <div className="four-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '40px',
            maxWidth: '1440px',
            padding: '0 60px',
            margin: '0 auto',
          }}>
            {blocks.map((block, i) => (
              <div key={i} className="four-block">
                <span className="four-block-number">{i + 1}</span>
                {block.four_numbered_block_icon && (
                  <img
                    src={block.four_numbered_block_icon?.url || block.four_numbered_block_icon}
                    alt={block.four_numbered_block_icon?.alt || ''}
                    className="four-block-icon"
                  />
                )}
                {block.four_numbered_h3 && (
                  <h3 className="four-block-title">{block.four_numbered_h3}</h3>
                )}
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  )
}
