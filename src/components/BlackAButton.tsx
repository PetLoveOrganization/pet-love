import { Link, type LinkProps } from 'react-router'

type Props = LinkProps & {
  className?: string
}

export function BlackAButton ({ children, className, ...rest }: Props) {
  return (<Link className={`bg-black text-white text-lg text-center  px-2 py-2.5 rounded-xl font-extrabold  transition-all duration-200 cursor-pointer hover:outline-2 hover:outline-black hover:outline-offset-2 hover:bg-slate-300 focus:outline-2 focus:outline-black focus:outline-offset-2 active:scale-80 ${className}`}  {...rest}>
    {children}
  </Link>)
}
