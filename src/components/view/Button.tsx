import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'

const sizeMap = {
  lg: 'px-5 py-4 text-xl',
  md: 'px-4 py-[14px] text-md',
  sm: 'p-3 text-sm',
} as const

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size: keyof typeof sizeMap
  secondary?: boolean
  className?: string
}

export const Button = ({
  size,
  type = 'button',
  disabled = false,
  secondary = false,
  className = '',
  children,
  ...rest
}: PropsWithChildren<ButtonProps>) => {
  const bgStyle =
    disabled || secondary ? 'bg-black-200 text-black-500' : 'bg-black-600 text-black-100'
  const buttonStyle = `${sizeMap[size]} ${bgStyle} ${className}`

  return (
    <button
      type={type}
      className={`shrink-0 rounded-xl ${buttonStyle}`}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  )
}
