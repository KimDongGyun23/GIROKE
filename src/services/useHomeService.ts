import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getDoc, updateDoc } from 'firebase/firestore'

import { auth } from '@/firebase/firebase'
import { useAuthState } from '@/hooks/useAuthState'
import { createTask, fetchTodo, updateTodo } from '@/services/homeService'
import type { TodoFormType, TodoItemType } from '@/types/home'
import { ERROR_MESSAGE } from '@/utils/constants'
import { formatDate } from '@/utils/formatDate'

import { getDocRef } from './firebaseUtils'

export const useMonthlyTasks = (selectedMonth: string, selectedDate: Date) => {
  const { userId, loading: authLoading } = useAuthState(auth)
  const [monthlyTasks, setMonthlyTasks] = useState<Record<string, TodoItemType[]>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchMonthlyTasks = async () => {
      if (authLoading || !userId) return

      setLoading(true)
      try {
        const scheduleDocRef = getDocRef(userId, 'schedules', selectedMonth)
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

          setMonthlyTasks(tasksByDate)
        } else {
          setMonthlyTasks({})
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error(ERROR_MESSAGE.fetch))
      } finally {
        setLoading(false)
      }
    }

    fetchMonthlyTasks()
  }, [authLoading, userId, selectedMonth])

  const scheduledDates = useMemo(() => Object.keys(monthlyTasks), [monthlyTasks])

  const selectedDateTasks = useMemo(() => {
    const formattedDate = formatDate(selectedDate, 'default')
    return monthlyTasks[formattedDate] || []
  }, [selectedDate, monthlyTasks])

  return { scheduledDates, selectedDateTasks, loading, error }
}

export const useTaskCreate = () => {
  const { userId } = useAuthState(auth)
  const navigate = useNavigate()
  const [error, setError] = useState<Error | null>(null)

  const handleCreate = async (data: TodoFormType) => {
    if (!userId) {
      setError(new Error(ERROR_MESSAGE.auth))
      return null
    }

    try {
      await createTask(userId, data).then(() => navigate('/home'))
    } catch (err) {
      setError(err instanceof Error ? err : new Error(ERROR_MESSAGE.create))
      return null
    }
  }

  return { handleCreate, error }
}

export const useTaskDetail = (todoId: string) => {
  const { userId, loading: authLoading } = useAuthState(auth)
  const [item, setItem] = useState<TodoItemType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const loadItems = async () => {
      if (authLoading || !userId) return

      setLoading(true)
      try {
        const fetchedItem = await fetchTodo(userId, todoId)
        setItem(fetchedItem)
      } catch (err) {
        setError(err instanceof Error ? err : new Error(ERROR_MESSAGE.fetch))
      } finally {
        setLoading(false)
      }
    }

    loadItems()
  }, [authLoading, userId])

  return { item, loading: loading || authLoading, error }
}

export const useTaskUpdate = () => {
  const { userId } = useAuthState(auth)
  const [error, setError] = useState<Error | null>(null)

  const updateItem = async (itemId: string, formData: TodoFormType) => {
    if (!userId || !itemId) {
      setError(new Error(ERROR_MESSAGE.auth))
      return false
    }

    try {
      await updateTodo(userId, itemId, formData)
      return true
    } catch (err) {
      setError(err instanceof Error ? err : new Error(ERROR_MESSAGE.update))
      return false
    }
  }

  return { updateItem, error }
}

export const useToggleTodoStatus = (initialTask: TodoItemType) => {
  const [localTask, setLocalTask] = useState(initialTask)
  const { userId } = useAuthState(auth)
  const [error, setError] = useState<Error | null>(null)

  const toggleTodoStatus = async () => {
    const updatedTask = { ...localTask, isActive: !localTask.isActive }
    setLocalTask(updatedTask)

    if (!userId) {
      setError(new Error(ERROR_MESSAGE.auth))
      return
    }

    const currentMonthDoc = formatDate(localTask.date, 'defaultMonth')
    const scheduleDocRef = getDocRef(userId, 'schedules', currentMonthDoc)

    try {
      const scheduleDoc = await getDoc(scheduleDocRef)
      if (scheduleDoc.exists()) {
        const tasks = scheduleDoc.data().tasks || []
        const updatedTasks = tasks.map((t: TodoItemType) =>
          t.id === localTask.id ? updatedTask : t,
        )

        await updateDoc(scheduleDocRef, { tasks: updatedTasks })
      }
    } catch {
      setError(new Error(ERROR_MESSAGE.update))
      setLocalTask(initialTask)
    }
  }

  return { localTask, toggleTodoStatus, error }
}

export const useDeleteTodo = () => {
  const { userId } = useAuthState(auth)
  const [error, setError] = useState<Error | null>(null)

  const deleteTodo = async (task: TodoItemType) => {
    if (!userId) {
      setError(new Error(ERROR_MESSAGE.auth))
      return
    }

    const currentMonthDoc = formatDate(task.date, 'defaultMonth')
    const scheduleDocRef = getDocRef(userId, 'schedules', currentMonthDoc)

    try {
      const scheduleDoc = await getDoc(scheduleDocRef)
      if (scheduleDoc.exists()) {
        const tasks = scheduleDoc.data().tasks || []
        const updatedTasks = tasks.filter((t: TodoItemType) => t.id !== task.id)

        await updateDoc(scheduleDocRef, { tasks: updatedTasks })
        return true
      }
    } catch {
      setError(new Error(ERROR_MESSAGE.delete))
    }
    return false
  }

  return { deleteTodo, error }
}
