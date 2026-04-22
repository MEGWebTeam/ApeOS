import { getOptions, getFooterMenus } from '../../lib/api/header'
import FooterClient from './FooterClient'

const BASE_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL

async function getSiteUrl() {
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 10000)
    const res = await fetch(`${BASE_URL}/wp-json/`, {
      next: { revalidate: 3600 },
      signal: controller.signal,
    })
    clearTimeout(timeout)
    if (!res.ok) return '/'
    const data = await res.json()
    return data.url ?? '/'
  } catch {
    return '/'
  }
}

export default async function Footer() {
  const [options, menus, siteUrl] = await Promise.all([
    getOptions(),
    getFooterMenus(),
    getSiteUrl(),
  ])

  const partner_logos = options.partner_logos ?? []
  const footer_locations = options.footer_locations ?? ''

  return (
    <FooterClient
      siteUrl={siteUrl}
      footerLogo={options.footer_logo}
      contactInfo={options.contact_info}
      socialLinks={options.social_links}
      formH3={options.form_h3}
      formScript={options.form_script}
      partnersHeading={options.partners_heading}
      partnerLogos={partner_logos}
      footerLocations={footer_locations}
      menus={menus}
    />
  )
}
