import { useEffect } from 'react'
import { FormProvider } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { HomeCalender } from '@/components/domain/HomeCalendar'
import { ErrorMessage } from '@/components/view/ErrorMessage'
import { InputGroup } from '@/components/view/inputGroup'
import { ModalCreate } from '@/components/view/modal/Modal'
import { SubHeaderWithoutIcon } from '@/components/view/SubHeader'
import { useBoolean } from '@/hooks/useBoolean'
import { useHomeForm } from '@/hooks/useForms'
import { useTaskCreate } from '@/services/useHomeService'
import type { CalendarValue } from '@/types/common'

export const HomeCreate = () => {
  const formMethod = useHomeForm()
  const navigate = useNavigate()
  const { handleSubmit, setValue, getValues, watch } = formMethod
  const { handleCreate, error } = useTaskCreate()

  const [isModalOpen, openModal, closeModal] = useBoolean(false)
  const dateValue = watch('date')

  useEffect(() => {
    setValue('date', new Date())
  }, [setValue])

  const handleFormSubmit = async () => {
    const formData = getValues()
    await handleCreate(formData).then(() => openModal())
  }

  const handleModalConfirm = () => {
    closeModal()
    navigate(`/home`, { replace: true })
  }

  const handleDateChange = (date: CalendarValue) => {
    setValue('date', date as Date)
  }

  if (error) {
    return <ErrorMessage>{error.message}</ErrorMessage>
  }

  return (
    <>
      <SubHeaderWithoutIcon
        type="complete"
        title="할일 추가"
        onClickText={handleSubmit(handleFormSubmit)}
      />

      <main className="flex-column mx-4 mt-5 gap-5">
        <HomeCalender value={dateValue} onChange={handleDateChange} />

        <FormProvider {...formMethod}>
          <InputGroup>
            <InputGroup.Label section="todo">제목</InputGroup.Label>
            <InputGroup.Input section="todo" placeholder="할일을 적어주세요." />
          </InputGroup>
        </FormProvider>
      </main>

      {isModalOpen && (
        <ModalCreate isOpen={isModalOpen} closeModal={closeModal} onClick={handleModalConfirm} />
      )}
    </>
  )
}
