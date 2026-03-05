import { Link, useLocation } from 'react-router'

export function Breadcrumb ({ name, id }: { name: string, id: string }) {
  const location = useLocation()
  const pathnames = location.pathname.split('/').filter((x) => x)

  const breadcrumbNameMap: Record<string, string> = {
    'pets': 'Adopt',
    'adopt': 'Fast Adoption',
  }

  return (
    <nav className="flex text-sm text-gray-600 mb-4">
      <Link to="/" className="hover:text-green-600">Home</Link>

      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1
        const to = `/${pathnames.slice(0, index + 1).join('/')}`
        let displayName = breadcrumbNameMap[value] || value
        if (id === value) {
          displayName = name
        }

        return (
          <span key={to} className="flex items-center">
            <span className="mx-2">{'>'}</span>
            {last ? (
              <span className="font-bold text-black">{displayName}</span>
            ) : (
              <Link to={to} className="hover:text-green-600 capitalize">
                {displayName}
              </Link>
            )}
          </span>
        )
      })}
    </nav>
  )
}
