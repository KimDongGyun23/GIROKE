import dayjs from 'dayjs'
import dayOfYear from 'dayjs/plugin/dayOfYear'

import { Button } from '../view/Button'

dayjs.extend(dayOfYear)

const dummy = [
  { label: '운동', days: ['2024/01/02', '2024/01/05'] },
  { label: '독서', days: ['2024/01/03', '2024/01/06'] },
  { label: '독서', days: ['2024/01/03', '2024/01/06'] },
  { label: '독서', days: ['2024/01/03', '2024/01/06'] },
  { label: '독서', days: ['2ß024/01/03', '2024/01/06'] },
]

const DAYS_OF_WEEK = ['일', '월', '화', '수', '목', '금', '토']

export const Record = () => {
  const currentYear = dayjs().year()
  const daysInYear = dayjs().endOf('year').dayOfYear()
  const firstDayOfYear = dayjs(`${currentYear}-01-01`)
  const emptyDaysBefore = firstDayOfYear.day()

  const getBackgroundColor = (dayNumber: number, checkedDaysSet: Set<number>, month: number) => {
    const isEvenMonth = month % 2 === 0
    return checkedDaysSet.has(dayNumber)
      ? 'bg-yellow-700'
      : isEvenMonth
        ? 'bg-black-300'
        : 'bg-black-200'
  }

  const get_title_for_day = (dayNumber: number, year: number) => {
    const date = dayjs().year(year).dayOfYear(dayNumber)
    const month = date.month() + 1
    const day = date.date()
    const dayOfWeek = DAYS_OF_WEEK[date.day()]
    return `${month}월 ${day}일 (${dayOfWeek})`
  }

  return (
    <div className="flex-column w-full gap-12">
      {dummy.map((item, itemIndex) => {
        const checkedDaysSet = new Set(
          item.days.map((date) => dayjs(date).year(currentYear).dayOfYear()),
        )

        return (
          <div key={itemIndex}>
            <div className="flex-between-align mb-4">
              <h4 className="mb-2 text-xl">{item.label}</h4>
              <Button size="sm">오늘 목표 달성</Button>
            </div>

            <div className="flex">
              <div className="mr-2 grid grid-rows-7 gap-1">
                {DAYS_OF_WEEK.map((day, index) => (
                  <p key={index} className="text-[8px] text-black-500">
                    {day}
                  </p>
                ))}
              </div>
              <div className="grid grid-flow-col grid-rows-7 gap-1">
                {[...Array(emptyDaysBefore)].map((_, index) => (
                  <div key={`empty-${index}`} className="h-[10px] w-[10px]" />
                ))}
                {[...Array(daysInYear)].map((_, index) => {
                  const dayNumber = index + 1
                  const month = dayjs().dayOfYear(dayNumber).month() + 1
                  return (
                    <div
                      key={index}
                      className={`h-3 w-3 rounded-[2px] ${getBackgroundColor(dayNumber, checkedDaysSet, month)}`}
                      title={get_title_for_day(dayNumber, currentYear)}
                    />
                  )
                })}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
