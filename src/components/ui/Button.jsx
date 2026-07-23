import { forwardRef } from 'react'
import { cn } from '../../utils/cn'

const variants = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
}

const sizes = {
  sm: 'px-5 py-2 text-sm',
  md: 'px-8 py-3',
  lg: 'px-10 py-4 text-lg',
}

const Button = forwardRef(function Button(
  {
    variant = 'primary',
    size = 'md',
    children,
    className,
    disabled,
    ...props
  },
  ref
) {
  return (
    <button
      ref={ref}
      disabled={disabled}
      className={cn(
        variants[variant],
        variant !== 'ghost' && sizes[size],
        disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
})

export default Button
