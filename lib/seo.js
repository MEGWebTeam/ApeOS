/*
  USAGE: For any new page, post type, or template:
  1. Import: import { buildMetadata, SchemaScript } from '@/lib/seo'
  2. In generateMetadata(): fetch the page/post, extract yoast_head_json, return buildMetadata(yoast)
  3. In the page component: extract yoast and add <SchemaScript yoast={yoast} /> inside the return fragment
  Works for: pages, posts, custom post types — anything that has Yoast SEO enabled in WordPress
*/

export function buildMetadata(yoast) {
  if (!yoast) return {}

  return {
    title: yoast.title ?? '',
    description: yoast.og_description ?? '',
    robots: {
      index: yoast.robots?.index !== 'noindex',
      follow: yoast.robots?.follow !== 'nofollow',
    },
    alternates: {
      canonical: yoast.canonical ?? '',
    },
    openGraph: {
      title: yoast.og_title ?? yoast.title ?? '',
      description: yoast.og_description ?? '',
      url: yoast.og_url ?? '',
      siteName: yoast.og_site_name ?? '',
      locale: yoast.og_locale ?? 'en_US',
      type: yoast.og_type ?? 'website',
      images: yoast.og_image
        ? yoast.og_image.map(img => ({
            url: img.url,
            width: img.width,
            height: img.height,
          }))
        : [],
    },
    twitter: {
      card: yoast.twitter_card ?? 'summary_large_image',
      title: yoast.twitter_title ?? yoast.og_title ?? '',
      description: yoast.twitter_description ?? yoast.og_description ?? '',
      images: yoast.twitter_image ? [yoast.twitter_image] : [],
    },
  }
}

export function SchemaScript({ yoast }) {
  if (!yoast?.schema) return null
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(yoast.schema) }}
      suppressHydrationWarning
    />
  )
}
