import { Link } from 'react-router-dom'

import type { NoteItemType } from '@/types/note'

import { Tag } from '../view/Tag'

type NoteItemProps = {
  item: NoteItemType
}

export const NoteItem = ({ item }: NoteItemProps) => {
  const { id, title, createdAt, tag } = item

  return (
    <Link to={`/note/detail/${id}`} className="flex-column gap-5 border-b border-grey-2 px-1 py-5">
      <div className="flex-between-align">
        <h6 className="truncate font-bold">{title}</h6>
        <Tag disabled>{tag}</Tag>
      </div>
      <p className="p-small truncate text-grey-5">{createdAt}</p>
    </Link>
  )
}
