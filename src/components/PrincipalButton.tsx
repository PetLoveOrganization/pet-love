import type { ButtonHTMLAttributes } from 'react'
type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  hasShadow?: boolean
}

export function PrincipalButton ({ children, className, hasShadow = false, ...rest }: Props) {
  const { disabled } = rest
  return (<button className={` bg-green-pet whitespace-nowrap  px-6 py-2 rounded-lg font-bold ${className}  transition-all hover:outline-2 hover:outline-black hover:outline-offset-2 hover:bg-orange-300 focus:outline-2 focus:outline-black focus:outline-offset-2 active:scale-80 flex items-center justify-center ${hasShadow ? 'shadow-lg shadow-green-pet/40 hover:shadow-orange-300/40' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}  {...rest}>
    {children}
  </button>)
}
