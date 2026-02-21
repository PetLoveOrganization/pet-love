import React from 'react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Helper para limpiar clases de Tailwind
function cn (...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type InputTextProps = React.InputHTMLAttributes<HTMLInputElement> & {
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  hasBorder?: boolean
  variant?: 'primary' | 'secondary' | 'ghost'
};

export const InputText = React.forwardRef<HTMLInputElement, InputTextProps>(
  ({ className, icon, iconPosition = 'left', hasBorder = false, variant = 'primary', ...props }, ref) => {

    const variants = {
      primary: 'bg-white text-gray-900',
      secondary: 'bg-gray-50 text-gray-800',
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
