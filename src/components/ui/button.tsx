import * as React from 'react'
import { cn } from '@/lib/utils'

type Variant = 'default' | 'outline' | 'ghost' | 'accent'
type Size = 'default' | 'sm' | 'lg'

const variantStyles: Record<Variant, string> = {
  default: 'bg-primary text-primary-foreground hover:bg-primary/90',
  outline: 'border border-border bg-transparent hover:bg-secondary/80 text-foreground',
  ghost: 'hover:bg-secondary text-foreground',
  accent: 'bg-accent text-accent-foreground hover:bg-accent/90',
}

const sizeStyles: Record<Size, string> = {
  default: 'h-11 px-5 py-2.5',
  sm: 'h-9 px-3.5 text-sm',
  lg: 'h-12 px-6 text-base',
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = 'default', size = 'default', type = 'button', ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        'inline-flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ring-offset-background',
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...props}
    />
  )
})

export { Button }
