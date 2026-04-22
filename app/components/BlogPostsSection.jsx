/**
 * BlogPostsSection
 * Renders the latest 3 blog posts from WordPress.
 * Performs its own fetch — independent from the main ACF page data.
 *
 * WP REST API endpoint:
 *   /wp/v2/posts?_embed&per_page=3
 *
 * Fields used per post:
 *   - post.title.rendered
 *   - post.excerpt.rendered
 *   - post.content.rendered                              — used for read time calculation
 *   - post._embedded['wp:featuredmedia']?.[0]?.source_url
 *   - post._embedded?.author?.[0]?.name
 *   - post._embedded?.author?.[0]?.avatar_urls['48']
 *   - post.date
 *   - post.link
 */

/** Format an ISO date string to e.g. "Apr 9" */
function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

/** Strip HTML tags */
function stripHtml(html) {
  return html?.replace(/<[^>]*>/g, '').trim() ?? ''
}

/** Decode HTML entities from excerpt text */
function decodeEntities(str) {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#8220;/g, '“')
    .replace(/&#8221;/g, '”')
    .replace(/&#8216;/g, '‘')
    .replace(/&#8217;/g, '’')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&[a-z]+;/gi, '')
}

/** Estimate read time from raw content HTML */
function readTime(contentHtml) {
  const text = stripHtml(contentHtml ?? '')
  const wordCount = text.split(/\s+/).filter(Boolean).length
  return Math.ceil(wordCount / 200) + ' min read'
}

async function fetchPosts() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/wp/v2/posts?_embed&per_page=3`,
    { cache: 'no-store' }
  )
  if (!res.ok) return []
  return res.json()
}

export default async function BlogPostsSection() {
  const posts = await fetchPosts()

  if (!posts.length) return null

  return (
    <section className="bg-black py-24 px-6">
      <style>{`
        .blog-card {
          display: flex;
          flex-direction: column;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 2px;
          overflow: hidden;
          text-decoration: none;
          transition: box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .blog-card:hover {
          border-color: rgba(0,188,212,0.5);
          box-shadow: 0px 0px 100px 0px #0ebcc230;
        }
        .blog-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          object-fit: cover;
          flex-shrink: 0;
        }
        .blog-avatar-fallback {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #1e1e1e;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255,255,255,0.5);
          font-size: 13px;
          font-weight: 600;
          flex-shrink: 0;
        }
      `}</style>

      <div className="max-w-[1200px] mx-auto">

        {/* 3-column card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => {
            const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url
            const authorObj     = post._embedded?.author?.[0]
            const authorName    = authorObj?.name ?? ''
            const avatarUrl     = authorObj?.avatar_urls?.['48'] ?? authorObj?.avatar_urls?.['96'] ?? null
            const initials      = authorName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
            const excerpt       = decodeEntities(stripHtml(post.excerpt?.rendered))
            const estimatedRead = readTime(post.content?.rendered)

            return (
              <a
                key={post.id}
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="blog-card group"
              >
                {/* Featured image */}
                {featuredImage ? (
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={featuredImage}
                      alt={post.title?.rendered ?? ''}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="aspect-[16/9] bg-white/10 flex items-center justify-center">
                    <span className="text-white/20 text-xs uppercase tracking-widest">No Image</span>
                  </div>
                )}

                {/* Card body */}
                <div className="flex flex-col p-6 flex-1" style={{ gap: '0' }}>

                  {/* Author row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                    {avatarUrl ? (
                      <img src={avatarUrl} alt={authorName} className="blog-avatar" />
                    ) : (
                      <div className="blog-avatar-fallback">{initials}</div>
                    )}
                    <div>
                      {authorName && (
                        <div style={{ color: 'white', fontWeight: 600, fontSize: '14px', lineHeight: 1.3 }}>
                          {authorName}
                        </div>
                      )}
                      <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', lineHeight: 1.3 }}>
                        {formatDate(post.date)}&nbsp;·&nbsp;{estimatedRead}
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'white', lineHeight: 1.4, marginBottom: '10px' }}>
                    {stripHtml(post.title?.rendered ?? '')}
                  </h3>

                  {/* Excerpt */}
                  {excerpt && (
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
                      {excerpt}
                    </p>
                  )}

                  {/* Read more */}
                  <span className="mt-auto pt-4 text-sm text-[#00BCD4] font-medium tracking-wide">
                    Read More →
                  </span>

                </div>
              </a>
            )
          })}
        </div>

      </div>
    </section>
  )
}
