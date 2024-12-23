import { FormProvider, useForm } from 'react-hook-form'

import { HomeCalender } from '../domain/HomeCalendar'
import { InputGroup } from '../view/inputGroup'
import { SubHeaderWithoutIcon } from '../view/SubHeader'

export const HomeEdit = () => {
  const formMethod = useForm()

  return (
    <>
      <SubHeaderWithoutIcon type="complete" title="할일 추가" />

      <main className="flex-column mx-4 mt-5 gap-5">
        <HomeCalender />

        <FormProvider {...formMethod}>
          <InputGroup>
            <InputGroup.Label section="title">제목</InputGroup.Label>
            <InputGroup.Input section="title" placeholder="할일을 적어주세요." />
          </InputGroup>
        </FormProvider>
      </main>
    </>
  )
}
