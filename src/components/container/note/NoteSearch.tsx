import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { NoteItem } from '@/components/domain/NoteItem'
import { BackArrowIcon } from '@/components/view/icons/NonActiveIcon'
import { Search } from '@/components/view/Search'
import { Tag } from '@/components/view/Tag'
import type { NoteItemType, NoteTagType } from '@/types/note'
import { NOTE_TAGS } from '@/utils/constants'

const mockNotes: NoteItemType[] = [
  { id: 0, title: '리액트 렌더링 과정', createdAt: '2024.12.24', tag: '공부' },
  { id: 1, title: '리액트 렌더링 과정', createdAt: '2024.12.24', tag: '공부' },
  { id: 2, title: '리액트 렌더링 과정', createdAt: '2024.12.24', tag: '공부' },
  { id: 3, title: '리액트 렌더링 과정', createdAt: '2024.12.24', tag: '공부' },
]

export const NoteSearch = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const searchName = searchParams.get('searchName') || ''
  const [activeTag, setActiveTag] = useState<NoteTagType>(NOTE_TAGS[0])

  const handleBackClick = () => navigate(-1)
  const handleTagClick = (tag: NoteTagType) => setActiveTag(tag)

  return (
    <main className="flex-column mx-4 h-full pt-5">
      <header className="flex-align gap-4">
        <button onClick={handleBackClick}>
          <BackArrowIcon />
        </button>
        <div className="grow">
          <Search initialValue={searchName} tabName="note" />
        </div>
      </header>

      <div className="scroll flex w-fit shrink-0 gap-2 overflow-x-scroll py-3">
        {NOTE_TAGS.map((tag) => (
          <Tag key={tag} secondary={activeTag !== tag} onClick={() => handleTagClick(tag)}>
            {tag}
          </Tag>
        ))}
      </div>

      <section className="flex-column scroll grow">
        {mockNotes.map((note) => (
          <NoteItem key={note.id} note={note} />
        ))}
      </section>
    </main>
  )
}
