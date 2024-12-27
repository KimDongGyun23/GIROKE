import { useEffect, useState } from 'react'

import { auth } from '@/firebase/firebase'
import { useAuthState } from '@/hooks/useAuthState'
import { createTask, fetchMonthlyTasks, fetchTodo, updateTodo } from '@/services/homeService'
import type { CalendarValue } from '@/types/common'
import type { TodoItemType } from '@/types/home'
import { formatDate } from '@/utils/formatDate'

export const useMonthlyTasks = (selectedDate: CalendarValue) => {
  const { userId, loading: authLoading } = useAuthState(auth)
  const [monthlyTasks, setMonthlyTasks] = useState<Record<string, TodoItemType[]>>({})
  const [selectedDateTasks, setSelectedDateTasks] = useState<TodoItemType[]>([])
  const [scheduledDates, setScheduledDates] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const loadMonthlyTasks = async () => {
      if (authLoading || !userId || !selectedDate) return

      setLoading(true)
      try {
        const tasks = await fetchMonthlyTasks(userId, selectedDate as Date)
        setMonthlyTasks(tasks)
        setScheduledDates(Object.keys(tasks))
        updateSelectedDateTasks(selectedDate as Date)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('일정을 불러오지 못했습니다.'))
      } finally {
        setLoading(false)
      }
    }

    loadMonthlyTasks()
  }, [authLoading, userId, selectedDate])

  const updateSelectedDateTasks = (date: Date) => {
    const formattedDate = formatDate(new Date(date), 'default')
    setSelectedDateTasks(monthlyTasks[formattedDate] || [])
  }

  useEffect(() => {
    updateSelectedDateTasks(selectedDate as Date)
  }, [selectedDate, monthlyTasks])

  const handleTaskUpdate = (updatedTask: TodoItemType) => {
    setSelectedDateTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
    )
  }

  return {
    monthlyTasks,
    selectedDateTasks,
    scheduledDates,
    loading: loading || authLoading,
    error,
    handleTaskUpdate,
    updateSelectedDateTasks,
  }
}

export const useTaskCreate = () => {
  const { userId } = useAuthState(auth)
  const [error, setError] = useState<Error | null>(null)

  const handleCreateTask = async (formData: { todo: string; date: Date }) => {
    if (!userId) {
      setError(new Error('사용자가 인증되지 않았습니다.'))
      return null
    }

    try {
      const newTask = await createTask(userId, formData)
      return newTask
    } catch (err) {
      setError(err instanceof Error ? err : new Error('할일을 생성하는 중 오류가 발생했습니다.'))
      return null
    }
  }

  return { handleCreateTask, error }
}

export const useTaskDetail = (todoId: string | undefined) => {
  const { userId } = useAuthState(auth)
  const [todo, setTodo] = useState<TodoItemType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const loadTodo = async () => {
      if (!userId || !todoId) return

      try {
        const todoData = await fetchTodo(userId, todoId)
        if (todoData) {
          setTodo(todoData)
        } else {
          setError(new Error('Todo not found'))
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Error fetching todo'))
      } finally {
        setLoading(false)
      }
    }

    loadTodo()
  }, [userId, todoId])

  return { todo, loading, error }
}

export const useTaskUpdate = () => {
  const { userId } = useAuthState(auth)
  const [error, setError] = useState<Error | null>(null)

  const handleUpdateTodo = async (todoId: string, formData: { todo: string; date: Date }) => {
    if (!userId) {
      setError(new Error('User not authenticated'))
      return false
    }

    try {
      await updateTodo(userId, todoId, formData)
      return true
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error updating todo'))
      return false
    }
  }

  return { handleUpdateTodo, error }
}
