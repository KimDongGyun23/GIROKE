import { useEffect } from 'react'
import { FormProvider } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'

import { HomeCalender } from '@/components/domain/HomeCalendar'
import { InputGroup } from '@/components/view/inputGroup'
import { ModalCreate } from '@/components/view/modal/Modal'
import { SubHeaderWithoutIcon } from '@/components/view/SubHeader'
import { auth, db } from '@/firebase/firebase'
import { useBoolean } from '@/hooks/useBoolean'
import { useHomeForm } from '@/hooks/useForms'
import type { CalendarValue } from '@/types/common'
import { formatDate } from '@/utils/formatDate'

export const HomeCreate = () => {
  const formMethod = useHomeForm()
  const navigate = useNavigate()
  const { handleSubmit, setValue, getValues, watch } = formMethod

  const [isModalOpen, openModal, closeModal] = useBoolean(false)
  const dateValue = watch('date')

  useEffect(() => {
    setValue('date', new Date())
  }, [setValue])

  const handleFormSubmit = async () => {
    try {
      const formData = getValues()
      const userId = auth.currentUser?.uid as string
      const monthDoc = formatDate(formData.date, 'defaultMonth')

      const userDocRef = doc(db, 'users', userId)
      const scheduleDocRef = doc(userDocRef, 'schedules', monthDoc)

      const newTask = {
        id: uuidv4(),
        todo: formData.todo,
        date: formatDate(formData.date, 'default'),
        isActive: false,
      }

      const scheduleDoc = await getDoc(scheduleDocRef)

      if (scheduleDoc.exists()) {
        await updateDoc(scheduleDocRef, {
          tasks: arrayUnion(newTask),
        })
      } else {
        await setDoc(scheduleDocRef, {
          tasks: [newTask],
        })
      }

      openModal()
    } catch (error) {
      console.error('데이터 저장 중 오류 발생:', error)
    }
  }

  const handleModalConfirm = () => {
    closeModal()
    navigate(`/home`, { replace: true })
  }

  const handleDateChange = (date: CalendarValue) => {
    setValue('date', date as Date)
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
