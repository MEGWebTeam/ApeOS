import HeroSection from './components/HeroSection'
import ValuePropositionSection from './components/ValuePropositionSection'
import FourStepsSection from './components/FourStepsSection'
import IndustriesSection from './components/IndustriesSection'
import ProvenResultsSection from './components/ProvenResultsSection'
import TestimonialsSection from './components/TestimonialsSection'
import VideosSection from './components/VideosSection'
import ClientLogosSection from './components/ClientLogosSection'
import HypeSquadSection from './components/HypeSquadSection'
import EmpireInsightsSection from './components/EmpireInsightsSection'
import BlogPostsSection from './components/BlogPostsSection'
import BuildYourEmpireSection from './components/BuildYourEmpireSection'
import { buildMetadata, SchemaScript } from '../lib/seo'

export async function generateMetadata() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/wp/v2/pages?slug=home&acf_format=standard`,
    { cache: 'no-store' }
  )
  const pages = await res.json()
  const yoast = pages?.[0]?.yoast_head_json
  return buildMetadata(yoast)
}

export default async function Home() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/wp/v2/pages?slug=home&acf_format=standard`,
    { cache: 'no-store' }
  )
  const pages = await res.json()
  const acf = pages?.[0]?.acf
  const yoast = pages?.[0]?.yoast_head_json

  console.log('Sample ACF image fields:', JSON.stringify({
    hype_squad_image: acf?.hype_squad_image,
    four_numbered_block_icon: acf?.four_numbered_blocks?.[0]?.four_numbered_block_icon,
    results_slider: acf?.results_slider?.[0]?.results_slider_image,
    testimonials_badge: acf?.each_testimonial?.[0]?.testimonial_stars,
    client_logos_rtl: acf?.client_logos_rtl_repeater?.[0]?.client_logos_rtl,
  }, null, 2));

  if (!acf) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-black text-white">
        <p>Failed to load page content.</p>
      </main>
    )
  }

  return (
    <>
      <SchemaScript yoast={yoast} />
      <main>
        <HeroSection acf={acf} />
        <ValuePropositionSection acf={acf} />
        <FourStepsSection acf={acf} />
        <IndustriesSection acf={acf} />
        <ProvenResultsSection acf={acf} />
        <TestimonialsSection acf={acf} />
        <VideosSection acf={acf} />
        <ClientLogosSection acf={acf} />
        <HypeSquadSection acf={acf} />
        <EmpireInsightsSection acf={acf} />
        <BlogPostsSection />
        <BuildYourEmpireSection acf={acf} />
      </main>
    </>
  )
}
