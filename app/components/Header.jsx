import { getOptions, getHeaderMenu } from '../../lib/api/header'
import HeaderClient from './HeaderClient'

export default async function Header() {
  const [options, menuItems] = await Promise.all([
    getOptions(),
    getHeaderMenu(),
  ])

  const safeOptions = {
    logo: options?.logo ?? null,
    button_text: options?.button_text ?? null,
    button_link: typeof options?.button_link === 'object'
      ? options?.button_link?.url ?? null
      : options?.button_link ?? null,
  }

  const safeMenuItems = (menuItems ?? []).map(item => ({
    ID: item.ID ?? item.id ?? null,
    title: item.title ?? '',
    url: item.url ?? '',
    child_items: (item.child_items ?? []).map(child => ({
      ID: child.ID ?? child.id ?? null,
      title: child.title ?? '',
      url: child.url ?? '',
    })),
  }))

  return (
    <HeaderClient
      logo={safeOptions.logo}
      buttonText={safeOptions.button_text}
      buttonLink={safeOptions.button_link}
      menuItems={safeMenuItems}
    />
  )
}
