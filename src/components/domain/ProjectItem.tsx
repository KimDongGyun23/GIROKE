import { Link } from 'react-router-dom'

import type { ProjectItemType } from '@/types/project'
import { formatDate } from '@/utils/formatDate'

import { ThumbIcon } from '../view/icons/ActiveIcon'

type ProjectItemProps = {
  project: ProjectItemType
}

export const ProjectItem = ({ project }: ProjectItemProps) => {
  const { id, title, description, startDate, finishDate, satisfaction } = project
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
          {formatDate(startDate, 'dotted')} - {formatDate(finishDate, 'dotted')}
        </p>
      </div>
    </Link>
  )
}
