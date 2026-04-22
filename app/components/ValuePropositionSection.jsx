import Link from 'next/link'

export default function ValuePropositionSection({ acf }) {
  const {
    value_proposition_section_h2: heading,
    value_proposition_section_para: paragraph,
    value_proposition_section_button_text: buttonText,
    value_proposition_section_button_link: buttonLink,
    five_block: fiveBlocks,
  } = acf

  return (
    <section className="bg-black py-24 px-6">
      <style>{`
        .vp-card {
          text-decoration: none;
          display: flex;
          flex-direction: column;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 32px 24px;
          box-shadow: 0px 0px 20px 0px rgba(14, 188, 194, 0.25);
          transition: background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .vp-card:hover {
          background: rgba(14, 188, 194, 0.85);
          border-color: #00BCD4;
          box-shadow: none;
        }
        .vp-h3 { font-size: 18px; font-weight: 700; color: white; margin-bottom: 16px; }
        .vp-list { font-size: 13px; color: rgba(255,255,255,0.6); line-height: 1.8; }
        .vp-card:hover h3,
        .vp-card:hover .vp-list li,
        .vp-card:hover .vp-list a,
        .vp-card:hover .vp-list span { color: #0a0a0a; }
        .vp-card:hover .vp-icon { filter: brightness(0); }
        .vp-list ul, .vp-list ol { list-style: none; padding: 0; margin: 0; }
        .vp-list li { margin-bottom: 6px; }
      `}</style>

      {/* Top part */}
      <div style={{ maxWidth: '1024px', margin: '0 auto', textAlign: 'center' }}>
        {heading && (
          <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-8">
            {heading}
          </h2>
        )}

        {paragraph && (
          <div
            className="text-lg md:text-xl text-gray-300 leading-relaxed mb-10 max-w-2xl mx-auto [&_a]:text-[#00BCD4] [&_strong]:text-white"
            dangerouslySetInnerHTML={{ __html: paragraph }}
          />
        )}

        {buttonLink && buttonText && (
          <Link
            href={buttonLink}
            className="inline-block px-8 py-4 border-2 border-white text-white font-semibold tracking-wide transition-colors duration-300 hover:bg-white hover:text-black"
          >
            {buttonText}
          </Link>
        )}
      </div>

      {/* Five blocks grid */}
      {fiveBlocks && fiveBlocks.length > 0 && (
        <div className="vp-grid" style={{
          maxWidth: '1440px',
          margin: '60px auto 0',
          padding: '0 24px',
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '16px',
        }}>
          <style>{`
            @media (max-width: 1023px) { .vp-grid { grid-template-columns: repeat(3, 1fr) !important; } }
            @media (max-width: 767px)  { .vp-grid { grid-template-columns: repeat(2, 1fr) !important; } }
            @media (max-width: 479px)  { .vp-grid { grid-template-columns: 1fr !important; } }
          `}</style>
          {fiveBlocks.map((block, i) => (
            <a
              key={i}
              href={block.five_block_link || '#'}
              className="vp-card"
            >
              {block.five_block_icon && (
                <img
                  src={block.five_block_icon?.url || block.five_block_icon}
                  alt={block.five_block_icon?.alt || ''}
                  className="vp-icon"
                  style={{ display: 'block', marginBottom: '20px', width: '40px' }}
                />
              )}

              {block.five_block_h3 && (
                <h3
                  className="vp-h3"
                >
                  {block.five_block_h3}
                </h3>
              )}

              {block.five_block_list && (
                <div
                  className="vp-list"
                  dangerouslySetInnerHTML={{ __html: block.five_block_list }}
                  suppressHydrationWarning
                />
              )}
            </a>
          ))}
        </div>
      )}
    </section>
  )
}
