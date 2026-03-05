import React from 'react'
import { cn } from '@/utils/utils'

export type InputTextProps = React.InputHTMLAttributes<HTMLInputElement> & {
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  hasBorder?: boolean
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost'
};

export const InputText = React.forwardRef<HTMLInputElement, InputTextProps>(
  ({ className, icon, iconPosition = 'left', hasBorder = false, variant = 'primary', ...props }, ref) => {

    const variants = {
      primary: 'bg-white text-gray-900',
      secondary: 'bg-gray-50 text-gray-800',
      tertiary: 'bg-lime-300/5 text-gray-800 border-gray-300/40',
      ghost: 'bg-transparent',
    }

    return (
      <div
        className={cn(
          'flex items-center gap-2 px-3 py-2 rounded-lg w-full transition-all focus-within:ring-2 focus-within:ring-lime-500/20',
          hasBorder ? 'border border-lime-600/30 focus-within:border-lime-500' : 'border-none',
          variants[variant],
          className,
        )}
      >
        {icon && iconPosition === 'left' && (
          <span className="text-gray-400 shrink-0">{icon}</span>
        )}

        <input
          {...props}
          ref={ref}
          className={cn(
            'flex-1 bg-transparent outline-none placeholder:text-lime-700 placeholder:text-sm',
            className,
          )}
        />

        {icon && iconPosition === 'right' && (
          <span className="text-gray-400 shrink-0">{icon}</span>
        )}
      </div>
    )
  },
)

InputText.displayName = 'InputText'
