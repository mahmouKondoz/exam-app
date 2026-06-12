'use client'
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"

export function NavBar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const title = searchParams.get('title')
  const isCardRoute = pathname.includes('/card/')
  const breadcrumbPath = isCardRoute ? pathname.replace(/\/card\/[^/]+$/, '') : pathname

  const getBreadcrumbs = () => {
    if (isCardRoute) {
      const trimmedTitle = title ? title : 'Diploma Details'
      return [
        { name: 'Diplomas', path: '/' },
        { name: trimmedTitle, path: pathname }
      ]
    }

    if (breadcrumbPath === '/') {
      return [{ name: 'Diplomas', path: '/' }]
    }

    if (breadcrumbPath === '/account-setting') {
      return [{ name: 'Account', path: '/account-setting' }]
    }

    const paths = breadcrumbPath.split('/').filter(Boolean)
    const breadcrumbs: { name: string; path: string }[] = [{ name: 'Diplomas', path: '/' }]

    let currentPath = ''
    paths.forEach((path, index) => {
      currentPath += `/${path}`

      // Use searchParams title for nested routes
      let name = path
      if (index === paths.length - 1 && title) {
        name = title
      } else {
        name = path
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
      }

      breadcrumbs.push({ name, path: currentPath })
    })

    return breadcrumbs
  }

  const breadcrumbs = getBreadcrumbs()

  return (
    <nav className="w-full h-12 p-4 flex items-center">
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs.map((crumb, index) => (
            <div key={crumb.path} className="flex items-center gap-2">
              {index > 0 && <span className="text-gray-500">/</span>}
              <BreadcrumbItem>
                {index === breadcrumbs.length - 1 ? (
                  <BreadcrumbPage className={breadcrumbs.length === 1 ? 'text-gray-500' : 'text-blue-500'}>
                    {crumb.name}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink className="text-gray-500 hover:text-gray-700" href={crumb.path}>
                    {crumb.name}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </div>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </nav>
  )
}
