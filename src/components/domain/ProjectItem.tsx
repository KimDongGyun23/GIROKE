import { Link } from 'react-router-dom'

import type { ProjectItemType } from '@/types/project'

import { ThumbIcon } from '../view/icons/ActiveIcon'

type ProjectItemProps = {
  item: ProjectItemType
}

export const ProjectItem = ({ item }: ProjectItemProps) => {
  const { id, title, description, startDate, finishDate, satisfaction } = item
  return (
    <Link
      to={`/project/detail/${id}`}
      className="flex-column gap-3 border-b border-grey-2 px-1 py-5"
    >
      <div className="flex-between items-end">
        <p className="p-large font-bold">{title}</p>
        <div className="flex gap-2">
          {[...Array(satisfaction)].map((_, index) => (
            <ThumbIcon active key={index} />
          ))}
        </div>
      </div>
      <div className="flex-column gap-1">
        <p className="p-small font-medium text-grey-5">{description}</p>
        <p className="p-xsmall text-grey-4">
          {startDate} - {finishDate}
        </p>
      </div>
    </Link>
  )
}
