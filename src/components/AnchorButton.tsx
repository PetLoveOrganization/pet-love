import { cn } from '@/utils/utils'
import type { AnchorHTMLAttributes } from 'react'
import { NavLink } from 'react-router'

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
  hasShadow?: boolean
  isExternal?: boolean
  variant?: 'primary' | 'secondary'
  disabled?: boolean
}

export function AnchorButton ({
  children,
  className,
  href,
  hasShadow = false,
  isExternal = false,
  variant = 'primary',
  disabled = false,
  ...rest
}: Props) {

  const baseStyles = 'whitespace-nowrap px-6 py-2 rounded-lg font-bold transition-all flex items-center justify-center focus:outline-2 focus:outline-black focus:outline-offset-2 active:scale-95'

  const variants = {
    primary: cn(
      'bg-green-pet text-white hover:bg-orange-300',
      hasShadow && 'shadow-lg shadow-green-pet/40 hover:shadow-orange-300/40',
    ),
    secondary: 'bg-slate-200 text-slate-700 hover:bg-slate-300 border border-slate-300',
  }

  const disabledStyles = 'opacity-50 cursor-not-allowed pointer-events-none bg-gray-200 text-gray-400 shadow-none scale-100'

  const commonProps = {
    'aria-disabled': disabled,
    tabIndex: disabled ? -1 : 0,
    onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (disabled) {
        e.preventDefault()
        return
      }
      rest.onClick?.(e)
    },
    className: cn(
      baseStyles,
      variants[variant],
      disabled && disabledStyles,
      className,
    ),
    ...rest,
  }

  if (isExternal) {
    return (
      <a
        href={disabled ? undefined : href}
        target="_blank"
        rel="noopener noreferrer"
        {...commonProps}
      >
        {children}
      </a>
    )
  }
  const { isHasLink, ...restProps } = commonProps
  return (
    <NavLink
      to={disabled ? '#' : href}
      {...restProps}
    >
      {children}
    </NavLink>
  )
}
