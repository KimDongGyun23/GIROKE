import { useState } from 'react'
import { Link } from 'react-router-dom'
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore'

import { auth, db } from '@/firebase/firebase'
import { useBoolean } from '@/hooks/useBoolean'
import type { TodoItemType } from '@/types/home'
import { formatDate } from '@/utils/formatDate'

import { CheckBoxIcon, TrashIcon, WrenchIcon } from '../view/icons/ActiveIcon'
import { ModalDelete } from '../view/modal/Modal'

type TodoItemProps = {
  task: TodoItemType
  onUpdate: (updatedTask: TodoItemType) => void
}

export const TodoItem = ({ task, onUpdate }: TodoItemProps) => {
  const [isModalOpen, openModal, closeModal] = useBoolean(false)
  const [localTask, setLocalTask] = useState(task)
  const { id, date, todo, isActive } = localTask

  const activeStyle = isActive
    ? 'bg-green-4 border-none text-white'
    : 'border border-grey-3 bg-white text-grey-7'

  const toggleTodoStatus = async () => {
    const updatedTask = { ...localTask, isActive: !isActive }
    setLocalTask(updatedTask)
    onUpdate(updatedTask)

    if (!auth.currentUser) return

    const userId = auth.currentUser.uid
    const currentMonthDoc = formatDate(date, 'defaultMonth')

    if (!currentMonthDoc) {
      console.error('Invalid date format')
      return
    }

    const scheduleCollectionRef = collection(db, 'users', userId, 'schedules')
    const scheduleDocRef = doc(scheduleCollectionRef, currentMonthDoc)

    try {
      const scheduleDoc = await getDoc(scheduleDocRef)
      if (scheduleDoc.exists()) {
        const tasks = scheduleDoc.data().tasks || []
        const updatedTasks = tasks.map((t: TodoItemType) => (t.id === id ? updatedTask : t))

        await updateDoc(scheduleDocRef, { tasks: updatedTasks })
      }
    } catch (error) {
      console.error('todo 상태 업데이트 오류: ', error)
      setLocalTask(task)
      onUpdate(task)
    }
  }

  const deleteTodo = async (id: string) => {
    if (!auth.currentUser) return

    const userId = auth.currentUser.uid
    const currentMonthDoc = formatDate(date, 'defaultMonth')

    if (!currentMonthDoc) {
      console.error('Invalid date format')
      return
    }

    const scheduleCollectionRef = collection(db, 'users', userId, 'schedules')
    const scheduleDocRef = doc(scheduleCollectionRef, currentMonthDoc)

    try {
      const scheduleDoc = await getDoc(scheduleDocRef)
      if (scheduleDoc.exists()) {
        const tasks = scheduleDoc.data().tasks || []
        const updatedTasks = tasks.filter((task: TodoItemType) => task.id !== id)

        await updateDoc(scheduleDocRef, { tasks: updatedTasks })
        closeModal()
      }
    } catch (error) {
      console.error('todo 삭제 오류: ', error)
    }
  }

  return (
    <>
      <div className={`flex-between-align p-medium rounded-lg px-[14px] py-3 ${activeStyle}`}>
        <p>{todo}</p>
        <div className="flex-align gap-2">
          <button onClick={toggleTodoStatus}>
            <CheckBoxIcon active={isActive} />
          </button>

          <Link to={`/home/edit/${id}`}>
            <WrenchIcon active={isActive} />
          </Link>

          <button onClick={openModal}>
            <TrashIcon active={isActive} />
          </button>
        </div>
      </div>

      {isModalOpen && (
        <ModalDelete
          isOpen={isModalOpen}
          closeModal={closeModal}
          leftButtonOnClick={closeModal}
          rightButtonOnClick={() => deleteTodo(id)}
        />
      )}
    </>
  )
}
