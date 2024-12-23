import type { PropsWithChildren } from 'react'

type TagProps = {
  secondary?: boolean
  disabled?: boolean
  onClick?: VoidFunction
}

export const Tag = ({
  secondary = false,
  disabled = false,
  onClick,
  children,
}: PropsWithChildren<TagProps>) => {
  const tagStyle = secondary ? 'bg-grey-3 text-grey-6' : 'bg-green-4 text-white'
  return (
    <button
      className={`flex-align w-fit shrink-0 rounded-2xl px-3 py-1 ${tagStyle}`}
      disabled={disabled}
      onClick={onClick}
    >
      <span className="p-small font-medium"># {children}</span>
    </button>
  )
}
