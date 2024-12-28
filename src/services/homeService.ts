import { arrayUnion, getDoc, setDoc, updateDoc } from 'firebase/firestore'

import type { TodoFormType, TodoItemType } from '@/types/home'
import { formatDate } from '@/utils/formatDate'

import { getDocRef } from './firebaseUtils'

export const createTask = async (userId: string, data: { todo: string; date: Date }) => {
  const monthDoc = formatDate(data.date, 'defaultMonth')
  const scheduleDocRef = getDocRef(userId, 'schedules', monthDoc)

  const newTask = {
    todo: data.todo,
    date: formatDate(data.date, 'default'),
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

  return newTask
}

export const fetchTodo = async (userId: string, todoId: string) => {
  const currentMonthDoc = formatDate(new Date(), 'defaultMonth')
  const scheduleDocRef = getDocRef(userId, 'schedules', currentMonthDoc)

  const scheduleDoc = await getDoc(scheduleDocRef)
  if (scheduleDoc.exists()) {
    const tasks = scheduleDoc.data().tasks || []
    return tasks.find((task: TodoItemType) => task.id === todoId) || null
  }
  return null
}

export const updateTodo = async (userId: string, todoId: string, data: TodoFormType) => {
  const currentMonthDoc = formatDate(new Date(), 'defaultMonth')
  const scheduleDocRef = getDocRef(userId, 'schedules', currentMonthDoc)

  const scheduleDoc = await getDoc(scheduleDocRef)
  if (scheduleDoc.exists()) {
    const tasks = scheduleDoc.data().tasks || []
    const updatedTasks = tasks.map((task: TodoItemType) =>
      task.id === todoId
        ? { ...task, todo: data.todo, date: formatDate(data.date, 'default') }
        : task,
    )

    await updateDoc(scheduleDocRef, { tasks: updatedTasks })
  }
}
