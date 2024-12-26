import type { PropsWithChildren } from 'react'

export const EmptyMessage = ({ children }: PropsWithChildren) => {
  return <p className="p-large flex-center size-full text-grey-6">{children}</p>
}
