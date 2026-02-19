import type { AnchorHTMLAttributes } from 'react'
import { NavLink } from 'react-router'
type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string,
  hasShadow?: boolean
  isHasLink?: boolean
}

export function AnchorButton ({ children, className, href, hasShadow = false, isHasLink = false, ...rest }: Props) {
  const Component = isHasLink ? 'a' : NavLink
  return (<Component href={href} to={href} className={`bg-green-pet whitespace-nowrap  px-6 py-2 rounded-lg font-bold ${className}  transition-all hover:outline-2 hover:outline-black hover:outline-offset-2 hover:bg-orange-300 focus:outline-2 focus:outline-black focus:outline-offset-2 active:scale-80 flex items-center justify-center ${hasShadow ? 'shadow-lg shadow-green-pet/40 hover:shadow-orange-300/40' : ''}`}  {...rest}>
    {children}
  </Component>)
}
