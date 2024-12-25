import dayjs from 'dayjs'

const DATE_FORMATS = {
  default: 'YYYY-MM-DD',
  dotted: 'YYYY.MM.DD',
  compact: 'YYYYMMDD',
  defaultMonth: 'YYYY-MM',
}

export const formatDate = (initialValue: string | Date, format: keyof typeof DATE_FORMATS) => {
  if (!initialValue) {
    return ''
  }

  const parsedDate = dayjs(initialValue)

  if (!parsedDate.isValid()) {
    console.error('잘못된 날짜 형식: ', initialValue)
    return ''
  }

  return parsedDate.format(DATE_FORMATS[format])
}
