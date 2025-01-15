import { FormProvider, useForm } from 'react-hook-form'

import { Button } from '../view/Button'
import { InputGroup } from '../view/inputGroup'

export const CreationBox = () => {
  const formMethod = useForm()
  const { handleSubmit } = formMethod

  return (
    <div className="h-fit rounded-xl bg-white p-4 drop-shadow-sm">
      <h3 className="mb-5 text-center text-lg">기록 추가하기</h3>
      <FormProvider {...formMethod}>
        <form onSubmit={handleSubmit(() => {})}>
          <InputGroup section="title">
            <InputGroup.Input placeholder="제목" />
          </InputGroup>
        </form>
      </FormProvider>
      <Button size="sm" className="mt-5 w-full">
        추가하기
      </Button>
    </div>
  )
}
