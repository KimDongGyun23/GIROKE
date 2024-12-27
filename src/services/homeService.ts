import { arrayUnion, collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'

import { db } from '@/firebase/firebase'
import type { TodoItemType } from '@/types/home'
import { formatDate } from '@/utils/formatDate'

export const fetchMonthlyTasks = async (userId: string, date: Date) => {
  const currentMonthDoc = `${formatDate(date, 'defaultMonth')}`
  const userDocRef = doc(db, 'users', userId)
  const scheduleDocRef = doc(collection(userDocRef, 'schedules'), currentMonthDoc)

  const scheduleDoc = await getDoc(scheduleDocRef)
  if (scheduleDoc.exists()) {
    const tasks = scheduleDoc.data().tasks || []
    const tasksByDate: Record<string, TodoItemType[]> = {}

    tasks.forEach((task: TodoItemType) => {
      if (!tasksByDate[task.date]) {
        tasksByDate[task.date] = []
      }
      tasksByDate[task.date].push(task)
    })

    return tasksByDate
  }

  return {}
}

export const createTask = async (userId: string, formData: { todo: string; date: Date }) => {
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

  return newTask
}

export const fetchTodo = async (userId: string, todoId: string) => {
  const currentMonthDoc = formatDate(new Date(), 'defaultMonth')
  const scheduleDocRef = doc(db, 'users', userId, 'schedules', currentMonthDoc)

  const scheduleDoc = await getDoc(scheduleDocRef)
  if (scheduleDoc.exists()) {
    const tasks = scheduleDoc.data().tasks || []
    return tasks.find((task: TodoItemType) => task.id === todoId)
  }
  return null
}

export const updateTodo = async (
  userId: string,
  todoId: string,
  formData: { todo: string; date: Date },
) => {
  const currentMonthDoc = formatDate(new Date(), 'defaultMonth')
  const scheduleDocRef = doc(db, 'users', userId, 'schedules', currentMonthDoc)

  const scheduleDoc = await getDoc(scheduleDocRef)
  if (scheduleDoc.exists()) {
    const tasks = scheduleDoc.data().tasks || []
    const updatedTasks = tasks.map((task: TodoItemType) =>
      task.id === todoId
        ? { ...task, todo: formData.todo, date: formatDate(formData.date, 'default') }
        : task,
    )

    await updateDoc(scheduleDocRef, { tasks: updatedTasks })
  }
}
