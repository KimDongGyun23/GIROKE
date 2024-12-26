import type { PropsWithChildren } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from './Button'

export const ErrorMessage = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate()
  const handleClickButton = () => {
    navigate(-1)
  }

  return (
    <div className="flex-center size-full px-4">
      <div className="flex-column w-full gap-8">
        <h1 className="mb-[20%] text-center font-jalnan text-6xl font-bold text-green-6">기로케</h1>
        <p className="text-center text-xl text-grey-6">{children}</p>
        <Button size="lg" width="grow" onClick={handleClickButton}>
          이전 페이지로 돌아가기
        </Button>
      </div>
    </div>
  )
}

export const EmptyMessage = ({ children }: PropsWithChildren) => {
  return <p className="p-large flex-center size-full text-grey-6">{children}</p>
}
