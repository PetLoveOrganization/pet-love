import React from 'react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn (...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type InputTextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  hasBorder?: boolean
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost'
};

export const InputTextArea = React.forwardRef<HTMLTextAreaElement, InputTextAreaProps>(
  ({ className, hasBorder = false, variant = 'primary', ...props }, ref) => {

    const variants = {
      primary: 'bg-white text-gray-900',
      secondary: 'bg-gray-50 text-gray-800',
      tertiary: 'bg-lime-300/5 text-gray-800 border-gray-300/40',
      ghost: 'bg-transparent',
    }

    return (
      <div className={cn(
        'flex flex-col gap-2 px-3 py-2 rounded-lg w-full transition-all focus-within:ring-2 focus-within:ring-lime-500/20',
        hasBorder ? 'border border-lime-600/30 focus-within:border-lime-500' : 'border-none',
        variants[variant],
        className,
      )}>
        <textarea
          {...props}
          ref={ref}
          className={cn(
            'flex-1 bg-transparent outline-none placeholder:text-lime-700/50 placeholder:text-sm resize-none min-h-[100px]',
            className,
          )}
        />
      </div>
    )
  },
)

InputTextArea.displayName = 'InputTextArea'
