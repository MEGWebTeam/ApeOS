const BASE_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL

export async function getOptions() {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 10000)

  try {
    const res = await fetch(`${BASE_URL}/wp-json/meg/v1/options`, {
      cache: 'no-store',
      signal: controller.signal,
    })
    clearTimeout(timeout)
    if (!res.ok) return getOptionsDefaults()
    const data = await res.json()

    return {
      // Header fields
      logo: data.logo ?? null,
      button_text: data.button_text ?? null,
      button_link: data.button_link ?? null,
      // Footer fields
      footer_logo: data.footer_logo ?? null,
      contact_info: data.contact_info ?? null,
      social_links: Array.isArray(data.social_links) ? data.social_links : [],
      form_h3: data.form_h3 ?? null,
      form_script: data.form_script ?? null,
      partners_heading: data.partners_heading ?? null,
      partner_logos: Array.isArray(data.partner_logos) ? data.partner_logos : [],
      footer_locations: data.footer_locations ?? null,
    }
  } catch {
    clearTimeout(timeout)
    return getOptionsDefaults()
  }
}

function getOptionsDefaults() {
  return {
    logo: null,
    button_text: null,
    button_link: null,
    footer_logo: null,
    contact_info: null,
    social_links: [],
    form_h3: null,
    form_script: null,
    partners_heading: null,
    partner_logos: [],
    footer_locations: null,
  }
}

export async function getFooterMenus() {
  function withTimeout(promiseFn) {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 10000)
    return promiseFn(controller.signal).finally(() => clearTimeout(timeout))
  }

  const fetchMenu = (slug) => (signal) =>
    fetch(`${BASE_URL}/wp-json/menus/v1/menus/${slug}`, {
      next: { revalidate: 3600 },
      signal,
    })
      .then((r) => (r.ok ? r.json() : {}))
      .then((data) => (Array.isArray(data) ? data : data.items ?? []))
      .catch(() => [])

  const [solutions, industries, company, resources, footerLegal] = await Promise.all([
    withTimeout(fetchMenu('solutions')),
    withTimeout(fetchMenu('industries')),
    withTimeout(fetchMenu('company')),
    withTimeout(fetchMenu('resources')),
    withTimeout(fetchMenu('footer-legal')),
  ])

  return { solutions, industries, company, resources, footerLegal }
}

export async function getHeaderMenu() {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 10000)

  try {
    const res = await fetch(
      `${BASE_URL}/wp-json/menus/v1/menus/main-menu`,
      {
        next: { revalidate: 3600 },
        signal: controller.signal,
      }
    )
    clearTimeout(timeout)
    if (!res.ok) return []
    const data = await res.json()
    // Handle both { items: [...] } and a top-level array response
    if (Array.isArray(data)) return data
    return data.items ?? []
  } catch {
    clearTimeout(timeout)
    return []
  }
}
