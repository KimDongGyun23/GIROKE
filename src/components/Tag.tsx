import type { PropsWithChildren } from 'react'

type TagProps = {
  secondary?: boolean
}

export const Tag = ({ secondary = false, children }: PropsWithChildren<TagProps>) => {
  const tagStyle = secondary ? 'bg-grey-3 text-grey-6' : 'bg-green-4 text-white'
  return (
    <div className={`flex-align w-fit rounded-2xl px-3 py-1 ${tagStyle}`}>
      <span className="p-small font-medium"># {children}</span>
    </div>
  )
}
