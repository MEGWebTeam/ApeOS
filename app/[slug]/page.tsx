import IndustryHeroSection from '../components/IndustryHeroSection'
import IndustryLegacySection from '../components/IndustryLegacySection'
import LandingPageHero from '../components/landing/LandingPageHero'
import LandingPageCounter from '../components/landing/LandingPageCounter'
import LandingPageSecondSection from '../components/landing/LandingPageSecondSection'
import LandingPageThirdSection from '../components/landing/LandingPageThirdSection'
import LandingPageFourthSection from '../components/landing/LandingPageFourthSection'
import LandingPageKyleSection from '../components/landing/LandingPageKyleSection'
import LandingPageFifthSection from '../components/landing/LandingPageFifthSection'
import LandingPageTestimonials from '../components/landing/LandingPageTestimonials'
import LandingPageMembership from '../components/landing/LandingPageMembership'
import LandingPageEighthSection from '../components/landing/LandingPageEighthSection'
import LandingPageFAQ from '../components/landing/LandingPageFAQ'
import LandingPageContact from '../components/landing/LandingPageContact'
import { buildMetadata, SchemaScript } from '../../lib/seo'

const WP_API = `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/wp/v2/pages`

async function getPageData(slug: string) {
  const res = await fetch(`${WP_API}?slug=${slug}&acf_format=standard`, {
    cache: 'no-store',
  })
  const data = await res.json()
  console.log('API Response:', JSON.stringify(data, null, 2))
  console.log('ACF Fields:', JSON.stringify(data[0]?.acf, null, 2))
  return data?.[0] ?? null
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/wp/v2/pages?slug=${slug}&acf_format=standard`,
    { cache: 'no-store' }
  )
  const pages = await res.json()
  const yoast = pages?.[0]?.yoast_head_json
  return buildMetadata(yoast)
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const page = await getPageData(slug)
  const acf = page?.acf
  const yoast = page?.yoast_head_json

  if (!acf) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-black text-white">
        <p>Failed to load page content.</p>
      </main>
    )
  }

  const template = page?.template ?? ''

  if (template === 'ai-landing-page.php') {
    return (
      <>
        <SchemaScript yoast={yoast} />
        <main>
          <LandingPageHero acf={acf} />
          <LandingPageCounter acf={acf} />
          <LandingPageSecondSection acf={acf} />
          <LandingPageThirdSection acf={acf} />
          <LandingPageFourthSection acf={acf} />
          <LandingPageKyleSection acf={acf} />
          <LandingPageFifthSection acf={acf} />
          <LandingPageTestimonials acf={acf} />
          <LandingPageMembership acf={acf} />
          <LandingPageEighthSection acf={acf} />
          <LandingPageFAQ acf={acf} />
          <LandingPageContact acf={acf} />
        </main>
      </>
    )
  }

  const darkTheme = acf.set_dark_theme !== false

  return (
    <>
      <SchemaScript yoast={yoast} />
      <main>
        <IndustryHeroSection acf={acf} darkTheme={darkTheme} />
        <IndustryLegacySection acf={acf} darkTheme={darkTheme} />
      </main>
    </>
  )
}
