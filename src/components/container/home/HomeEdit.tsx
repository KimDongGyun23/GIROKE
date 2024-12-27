import { useEffect, useState } from 'react'
import { FormProvider } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import dayjs from 'dayjs'

import { HomeCalender } from '@/components/domain/HomeCalendar'
import { EmptyMessage } from '@/components/view/ErrorMessage'
import { InputGroup } from '@/components/view/inputGroup'
import { Loading } from '@/components/view/Loading'
import { ModalEdit } from '@/components/view/modal/Modal'
import { SubHeaderWithoutIcon } from '@/components/view/SubHeader'
import { useBoolean } from '@/hooks/useBoolean'
import { useHomeForm } from '@/hooks/useForms'
import { useTaskDetail, useTaskUpdate } from '@/services/useHomeService'
import type { CalendarValue } from '@/types/common'

export const HomeEdit = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const formMethod = useHomeForm()

  const [isModalOpen, openModal, closeModal] = useBoolean(false)
  const [selectedDate, setSelectedDate] = useState<CalendarValue | null>(null)

  const { setValue, handleSubmit, getValues } = formMethod

  const { todo, loading, error: fetchError } = useTaskDetail(id)
  const { handleUpdateTodo, error: updateError } = useTaskUpdate()

  useEffect(() => {
    if (todo) {
      setValue('todo', todo.todo)
      setValue('date', dayjs(todo.date).toDate())
      setSelectedDate(dayjs(todo.date).toDate())
    }
  }, [todo, setValue])

  const onSubmit = async () => {
    if (!id) return
    const formData = getValues()
    const success = await handleUpdateTodo(id, formData)
    if (success) {
      openModal()
    }
  }

  const handleDateChange = (date: CalendarValue) => {
    setValue('date', date as Date)
    setSelectedDate(date)
  }

  const handleModalConfirm = () => {
    closeModal()
    navigate(`/home`, { replace: true })
  }

  if (loading) {
    return <Loading />
  }

  if (fetchError || updateError || !todo)
    return (
      <EmptyMessage>
        {(fetchError || updateError)?.message || '할일이 존재하지 않습니다.'}
      </EmptyMessage>
    )

  return (
    <>
      <SubHeaderWithoutIcon
        type="complete"
        title="할일 수정"
        onClickText={handleSubmit(onSubmit)}
      />

      <main className="flex-column mx-4 mt-5 gap-5">
        <HomeCalender value={selectedDate} onChange={handleDateChange} />

        <FormProvider {...formMethod}>
          <InputGroup>
            <InputGroup.Label section="todo">제목</InputGroup.Label>
            <InputGroup.Input section="todo" placeholder="할일을 적어주세요." />
          </InputGroup>
        </FormProvider>
      </main>

      {isModalOpen && (
        <ModalEdit isOpen={isModalOpen} closeModal={closeModal} onClick={handleModalConfirm} />
      )}
    </>
  )
}
