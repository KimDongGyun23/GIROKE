import { useState } from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'

import { HomeCalender } from '../domain/HomeCalendar'
import { TodoItem } from '../domain/TodoItem'

type ValuePiece = Date | null
type Value = ValuePiece | [ValuePiece, ValuePiece]

const scheduledDates = [
  new Date('2024-12-13'),
  new Date('2024-12-23'),
  new Date('2024-12-24'),
  new Date('2024-12-26'),
]

const todoList = [
  { todo: '깃허브 리드미 수정', isActive: false },
  { todo: '코테 문제 3개', isActive: true },
]

export const Home = () => {
  const [selectedDate, setSelectedDate] = useState<Value>(new Date())
  const isDateMarked = (date: Date) => {
    return scheduledDates.some(
      (scheduleDate: Date) =>
        dayjs(scheduleDate).format('YYYYMMDD') === dayjs(date).format('YYYYMMDD'),
    )
  }

  const tileClassName = ({ date }: { date: Date }) => (isDateMarked(date) ? 'marked' : '')

  const handleDateChange = (newDate: Value) => {
    setSelectedDate(newDate)
  }
  return (
    <>
      <HomeCalender
        value={selectedDate}
        onChange={handleDateChange}
        tileClassName={tileClassName}
      />

      <section className="mt-9">
        <div className="flex-between items-end">
          <h5 className="font-medium">오늘의 할일</h5>
          <Link to={'/home/create'} className="p-small text-grey-6">
            추가하기
          </Link>
        </div>

        <div className="flex-column my-4 gap-2">
          {todoList.map(({ todo, isActive }, index) => (
            <TodoItem todo={todo} isActive={isActive} key={index} />
          ))}
        </div>
      </section>
    </>
  )
}