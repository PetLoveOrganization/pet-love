import { forwardRef, type InputHTMLAttributes } from 'react'

export type Props = InputHTMLAttributes<HTMLInputElement> & {
  text: string,
  id: string,
  textSize?: 'sm' | 'md' | 'lg',
}
export const RadioButton = forwardRef<HTMLInputElement, Props>(({ text, id, textSize = 'lg', ...rest }, ref) => {
  const sizeClass = {
    sm: 'text-sm',
    md: 'text-md',
    lg: 'text-lg',
  }[textSize]
  return (
    <label htmlFor={id} className='flex items-center gap-2 cursor-pointer'>
      <input {...rest} ref={ref} type="radio" id={id} className='appearance-none w-5 h-5 border border-gray-300 rounded-full cursor-pointer checked:border-lime-600 checked:shadow-[inset_0_0_0_3px_white,inset_0_0_0_10px_rgb(101,163,13)] transition-all duration-200' />
      <span className={sizeClass}>{text}</span>
    </label>
  )},
)
