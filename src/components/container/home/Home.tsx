import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { collection, doc, getDoc } from 'firebase/firestore'

import { HomeCalender } from '@/components/domain/HomeCalendar'
import { TodoItem } from '@/components/domain/TodoItem'
import { auth, db } from '@/firebase/firebase'
import type { CalendarValue } from '@/types/common'
import type { TodoItemType } from '@/types/home'
import { formatDate } from '@/utils/formatDate'

export const Home = () => {
  const [monthlyTasks, setMonthlyTasks] = useState<Record<string, TodoItemType[]>>({})
  const [selectedDateTasks, setSelectedDateTasks] = useState<TodoItemType[]>([])
  const [scheduledDates, setScheduledDates] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState<CalendarValue>(new Date())
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid)
      } else {
        setUserId(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    if (!userId) return

    const fetchMonthlyTasks = async () => {
      const currentDate = new Date(selectedDate as Date)
      const currentMonthDoc = `${formatDate(currentDate, 'defaultMonth')}`

      const userDocRef = doc(db, 'users', userId)
      const scheduleDocRef = doc(collection(userDocRef, 'schedules'), currentMonthDoc)

      try {
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
          setScheduledDates(Object.keys(tasksByDate))
          updateSelectedDateTasks(currentDate)
        }
      } catch (error) {
        console.error('월별 일정 가져오기 실패:', error)
      }
    }

    fetchMonthlyTasks()
  }, [userId])

  const updateSelectedDateTasks = (date: Date) => {
    const formattedDate = formatDate(new Date(date), 'default')
    setSelectedDateTasks(monthlyTasks[formattedDate] || [])
  }

  useEffect(() => {
    updateSelectedDateTasks(selectedDate as Date)
  }, [selectedDate, monthlyTasks])

  const isDateMarked = (date: Date) =>
    scheduledDates.some((scheduleDate) => scheduleDate === formatDate(date, 'default'))

  const tileClassName = ({ date }: { date: Date }) => (isDateMarked(date) ? 'marked' : '')

  const handleTaskUpdate = (updatedTask: TodoItemType) => {
    setSelectedDateTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
    )
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <main className="mx-4">
      <HomeCalender
        value={selectedDate}
        onChange={(date) => {
          setSelectedDate(date)
          updateSelectedDateTasks(new Date(date as Date))
        }}
        tileClassName={tileClassName}
      />

      <section className="mt-9">
        <div className="flex-between items-end">
          <h5 className="font-medium">선택한 날짜의 할일</h5>
          <Link to={'/home/create'} className="p-small text-grey-6">
            추가하기
          </Link>
        </div>

        <div className="flex-column my-4 gap-2">
          {selectedDateTasks.map((task) => (
            <TodoItem key={task.id} task={task} onUpdate={handleTaskUpdate} />
          ))}
        </div>
      </section>
    </main>
  )
}
