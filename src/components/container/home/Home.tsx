import { useState } from 'react'
import { Link } from 'react-router-dom'

import { HomeCalender } from '@/components/domain/HomeCalendar'
import { TodoItem } from '@/components/domain/TodoItem'
import { EmptyMessage } from '@/components/view/ErrorMessage'
import { Loading } from '@/components/view/Loading'
import { useMonthlyTasks } from '@/services/useHomeService'
import type { CalendarValue } from '@/types/common'
import { formatDate } from '@/utils/formatDate'

export const Home = () => {
  const [selectedDate, setSelectedDate] = useState<CalendarValue>(new Date())
  const {
    selectedDateTasks,
    scheduledDates,
    loading,
    error,
    handleTaskUpdate,
    updateSelectedDateTasks,
  } = useMonthlyTasks(selectedDate)

  const isDateMarked = (date: Date) =>
    scheduledDates.some((scheduleDate) => scheduleDate === formatDate(date, 'default'))

  const tileClassName = ({ date }: { date: Date }) => (isDateMarked(date) ? 'marked' : '')

  if (loading) {
    return <Loading />
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
          {error ? (
            <EmptyMessage>{error?.message}</EmptyMessage>
          ) : (
            selectedDateTasks.map((task) => (
              <TodoItem key={task.id} task={task} onUpdate={handleTaskUpdate} />
            ))
          )}
        </div>
      </section>
    </main>
  )
}
