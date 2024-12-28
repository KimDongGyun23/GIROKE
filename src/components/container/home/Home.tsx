import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'

import { HomeCalender } from '@/components/domain/HomeCalendar'
import { TodoItem } from '@/components/domain/TodoItem'
import { EmptyMessage } from '@/components/view/ErrorMessage'
import { useMonthlyTasks } from '@/services/useHomeService'
import type { CalendarValue } from '@/types/common'
import { ERROR_MESSAGE } from '@/utils/constants'
import { formatDate } from '@/utils/formatDate'

export const Home = () => {
  const [selectedMonth, setSelectedMonth] = useState(dayjs().format('YYYY-MM'))
  const [selectedDate, setSelectedDate] = useState<CalendarValue>(new Date())
  const { scheduledDates, selectedDateTasks, loading, error } = useMonthlyTasks(
    selectedMonth,
    selectedDate as Date,
  )

  const isDateMarked = useCallback(
    (date: Date) => scheduledDates.includes(formatDate(date, 'default')),
    [scheduledDates],
  )

  const tileClassName = useCallback(
    ({ date }: { date: Date }) => (isDateMarked(date) ? 'marked' : ''),
    [isDateMarked],
  )

  const handleActiveStartDateChange = ({ activeStartDate }: { activeStartDate: Date | null }) => {
    if (activeStartDate) {
      const newMonth = dayjs(activeStartDate).format('YYYY-MM')
      if (newMonth !== selectedMonth) setSelectedMonth(newMonth)
    }
  }

  return (
    <main className="mx-4">
      {loading ? (
        <HomeCalender />
      ) : (
        <HomeCalender
          value={selectedDate}
          onChange={setSelectedDate}
          tileClassName={tileClassName}
          onActiveStartDateChange={handleActiveStartDateChange}
        />
      )}

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
          ) : selectedDateTasks.length > 0 ? (
            selectedDateTasks.map((task, index) => <TodoItem key={index} task={task} />)
          ) : (
            <EmptyMessage>{ERROR_MESSAGE.noData}</EmptyMessage>
          )}
        </div>
      </section>
    </main>
  )
}
