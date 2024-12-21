import type { PropsWithChildren } from 'react'

const sizeMap = {
  lg: {
    padding: 'px-5 py-4',
    font: 'p-medium font-bold',
  },
  md: {
    padding: 'px-4 py-[14px]',
    font: 'p-small font-bold',
  },
  sm: {
    padding: 'p-3',
    font: 'p-xsmall font-bold',
  },
} as const

type ButtonType = 'submit' | 'reset' | 'button' | undefined

type ButtonProps = {
  size: keyof typeof sizeMap
  width?: 'w-auto' | 'w-full' | 'grow'
  type?: ButtonType
  disabled?: boolean
  secondary?: boolean
  classname?: string
  onClick?: VoidFunction
}

export const Button = ({
  size,
  width = 'w-auto',
  classname,
  disabled = false,
  onClick,
  type = 'button',
  secondary = false,
  children,
}: PropsWithChildren<ButtonProps>) => {
  const bgStyle = disabled || secondary ? 'bg-grey-3 text-grey-6' : 'bg-green-5 text-grey-1'
  const buttonStyle = `${sizeMap[size].padding} ${sizeMap[size].font} ${bgStyle} ${width} ${classname}`

  return (
    <button
      type={type}
      className={`shrink-0 rounded-xl text-grey-1 ${buttonStyle}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
