import type { PropsWithChildren } from 'react'

type TagProps = {
  secondary?: boolean
  disabled?: boolean
  onClick?: VoidFunction
  role?: string
  ariaSelected?: boolean
}

export const Tag = ({
  secondary = false,
  disabled = false,
  onClick,
  role,
  ariaSelected,
  children,
}: PropsWithChildren<TagProps>) => {
  const tagStyle = secondary ? 'bg-grey-3 text-grey-6' : 'bg-green-4 text-white'
  return (
    <button
      type="button"
      className={`flex-align w-fit shrink-0 rounded-2xl px-3 py-1 ${tagStyle}`}
      disabled={disabled}
      onClick={onClick}
      role={role}
      aria-selected={ariaSelected}
    >
      <span className="p-small font-medium"># {children}</span>
    </button>
  )
}
