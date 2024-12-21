import type { CalendarProps } from 'react-calendar'
import Calendar from 'react-calendar'
import dayjs from 'dayjs'

import { BackArrowIcon } from '../view/icons/NonActiveIcon'

import 'react-calendar/dist/Calendar.css'
import './HomeCalendar.css'

const NextArrowIcon = () => {
  return (
    <div className="-scale-x-100">
      <BackArrowIcon />
    </div>
  )
}

export const HomeCalender = ({ ...options }: CalendarProps) => {
  return (
    <Calendar
      formatDay={(_, date) => dayjs(date).format('D')}
      next2Label={null}
      prev2Label={null}
      calendarType="gregory"
      nextLabel={<NextArrowIcon />}
      prevLabel={<BackArrowIcon />}
      showNeighboringMonth={false}
      maxDetail="month"
      minDetail="month"
      locale="ko-KR"
      {...options}
    />
  )
}
