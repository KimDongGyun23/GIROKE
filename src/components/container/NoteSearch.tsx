import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import type { NoteItemType, NoteTagType } from '@/types/note'
import { NOTE_TAGS } from '@/utils/constants'

import { NoteItem } from '../domain/NoteItem'
import { BackArrowIcon } from '../view/icons/NonActiveIcon'
import { Search } from '../view/Search'
import { Tag } from '../view/Tag'

const noteArr: NoteItemType[] = [
  { id: 0, title: '리액트 렌더링 과정', createdAt: '2024.12.24', tag: '공부' },
  { id: 1, title: '리액트 렌더링 과정', createdAt: '2024.12.24', tag: '공부' },
  { id: 2, title: '리액트 렌더링 과정', createdAt: '2024.12.24', tag: '공부' },
  { id: 3, title: '리액트 렌더링 과정', createdAt: '2024.12.24', tag: '공부' },
]

export const NoteSearch = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const searchName = searchParams.get('searchName')
  const [activeTag, setActiveTag] = useState<NoteTagType>(NOTE_TAGS[0])

  return (
    <main className="flex-column mx-4 h-full pt-5">
      <header className="flex-align gap-4">
        <button onClick={() => navigate(-1)}>
          <BackArrowIcon />
        </button>
        <div className="grow">
          <Search initialValue={searchName} tabName="note" />
        </div>
      </header>

      <div className="scroll flex w-fit shrink-0 gap-2 overflow-x-scroll py-3">
        {NOTE_TAGS.map((tag: NoteTagType) => (
          <Tag key={tag} secondary={activeTag !== tag} onClick={() => setActiveTag(tag)}>
            {tag}
          </Tag>
        ))}
      </div>

      <section className="flex-column scroll grow">
        {noteArr.map((item) => (
          <NoteItem key={item.id} item={item} />
        ))}
      </section>
    </main>
  )
}
