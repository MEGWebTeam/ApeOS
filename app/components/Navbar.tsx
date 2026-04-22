import NavbarClient from './NavbarClient'

type MenuItem = {
  id: number
  title: string
  url: string
}

type WPMenu = {
  items: MenuItem[]
}

export default async function Navbar() {
  let items: MenuItem[] = []

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/menus/v1/menus/main-menu`,
      { cache: 'no-store' }
    )
    const menu: WPMenu = await res.json()
    items = menu.items ?? []
  } catch {
    // Render nav without items if the API is unreachable
  }

  return <NavbarClient items={items} />
}
