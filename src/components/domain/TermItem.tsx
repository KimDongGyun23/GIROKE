import { Link } from 'react-router-dom'

import { Tag } from '../view/Tag'

type TermItemProps = {
  id: number
  term: string
  tag: string
  description: string
}

export const TermItem = ({ id = 0, term, tag, description }: TermItemProps) => {
  return (
    <Link to={`/term/detail/${id}`} className="flex-column gap-5 border-b border-grey-2 px-1 py-5">
      <div className="flex-between-align">
        <h6 className="truncate font-bold">{term}</h6>
        <Tag disabled>{tag}</Tag>
      </div>
      <p className="p-small truncate text-grey-5">{description}</p>
    </Link>
  )
}
