import { useState } from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'

import { HomeCalender } from '@/components/domain/HomeCalendar'
import { TodoItem } from '@/components/domain/TodoItem'
import type { CalendarValue } from '@/types/common'

const scheduledDates = [
  new Date('2024-12-13'),
  new Date('2024-12-23'),
  new Date('2024-12-24'),
  new Date('2024-12-26'),
]

const mockTodoList = [
  { id: 0, todo: '깃허브 리드미 수정', isActive: false },
  { id: 1, todo: '코테 문제 3개', isActive: true },
]

export const Home = () => {
  const [selectedDate, setSelectedDate] = useState<CalendarValue>(new Date())

  const isDateMarked = (date: Date) =>
    scheduledDates.some(
      (scheduleDate) => dayjs(scheduleDate).format('YYYYMMDD') === dayjs(date).format('YYYYMMDD'),
    )

  const tileClassName = ({ date }: { date: Date }) => (isDateMarked(date) ? 'marked' : '')

  return (
    <main className="mx-4">
      <HomeCalender value={selectedDate} onChange={setSelectedDate} tileClassName={tileClassName} />

      <section className="mt-9">
        <div className="flex-between items-end">
          <h5 className="font-medium">오늘의 할일</h5>
          <Link to={'/home/create'} className="p-small text-grey-6">
            추가하기
          </Link>
        </div>

        <div className="flex-column my-4 gap-2">
          {mockTodoList.map(({ id, todo, isActive }) => (
            <TodoItem key={id} id={id} todo={todo} isActive={isActive} />
          ))}
        </div>
      </section>
    </main>
  )
}
