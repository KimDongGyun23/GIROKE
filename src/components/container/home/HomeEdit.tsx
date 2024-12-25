import { useEffect, useState } from 'react'
import { FormProvider } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import dayjs from 'dayjs'
import type { DocumentData } from 'firebase/firestore'
import { doc, getDoc, updateDoc } from 'firebase/firestore'

import { HomeCalender } from '@/components/domain/HomeCalendar'
import { InputGroup } from '@/components/view/inputGroup'
import { ModalEdit } from '@/components/view/modal/Modal'
import { SubHeaderWithoutIcon } from '@/components/view/SubHeader'
import { auth, db } from '@/firebase/firebase'
import { useBoolean } from '@/hooks/useBoolean'
import { useHomeForm } from '@/hooks/useForms'
import type { CalendarValue } from '@/types/common'
import type { TodoItemType } from '@/types/home'
import { formatDate } from '@/utils/formatDate'

export const HomeEdit = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const formMethod = useHomeForm()

  const [todo, setTodo] = useState<DocumentData | null>(null)
  const [isModalOpen, openModal, closeModal] = useBoolean(false)
  const [selectedDate, setSelectedDate] = useState<CalendarValue | null>(null)

  const { setValue, handleSubmit, getValues } = formMethod

  useEffect(() => {
    const fetchTodo = async () => {
      if (!auth.currentUser) return

      const userId = auth.currentUser.uid
      const currentMonthDoc = formatDate(new Date(), 'defaultMonth')
      const scheduleDocRef = doc(db, 'users', userId, 'schedules', currentMonthDoc)

      try {
        const scheduleDoc = await getDoc(scheduleDocRef)
        if (scheduleDoc.exists()) {
          const tasks = scheduleDoc.data().tasks || []
          const todoData = tasks.find((task: TodoItemType) => task.id === id)
          if (todoData) {
            setTodo(todoData)
            setValue('todo', todoData.todo)
            setValue('date', dayjs(todoData.date).toDate())
            setSelectedDate(dayjs(todoData.date).toDate())
          }
        }
      } catch (error) {
        console.error('할일 가져오기 실패:', error)
      }
    }

    fetchTodo()
  }, [id, setValue])

  const onSubmit = async () => {
    if (!auth.currentUser) return

    const formData = getValues()
    const userId = auth.currentUser.uid
    const currentMonthDoc = formatDate(new Date(), 'defaultMonth')
    const scheduleDocRef = doc(db, 'users', userId, 'schedules', currentMonthDoc)

    try {
      const scheduleDoc = await getDoc(scheduleDocRef)
      if (scheduleDoc.exists()) {
        const tasks = scheduleDoc.data().tasks || []
        const updatedTasks = tasks.map((task: TodoItemType) =>
          task.id === id
            ? { ...task, todo: formData.todo, date: formatDate(formData.date, 'default') }
            : task,
        )

        await updateDoc(scheduleDocRef, { tasks: updatedTasks })
        openModal()
      }
    } catch (error) {
      console.error('할일 수정 실패:', error)
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

  if (!todo) return <div>Loading...</div>

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
