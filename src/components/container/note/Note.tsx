import { useState } from 'react'

import { NoteItem } from '@/components/domain/NoteItem'
import { PostAdditionButton } from '@/components/view/PostAdditionButton'
import { Search } from '@/components/view/Search'
import { Tag } from '@/components/view/Tag'
import type { NoteItemType, NoteTagType } from '@/types/note'
import { NOTE_TAGS } from '@/utils/constants'

const noteArr: NoteItemType[] = [
  { id: 0, title: '리액트 렌더링 과정', createdAt: '2024.12.24', tag: '공부' },
  { id: 1, title: '리액트 렌더링 과정', createdAt: '2024.12.24', tag: '공부' },
  { id: 2, title: '리액트 렌더링 과정', createdAt: '2024.12.24', tag: '공부' },
  { id: 3, title: '리액트 렌더링 과정', createdAt: '2024.12.24', tag: '공부' },
]

export const Note = () => {
  const [activeTag, setActiveTag] = useState<NoteTagType>(NOTE_TAGS[0])

  return (
    <main className="flex-column mx-4 h-full">
      <Search tabName="note" />

      <div className="scroll flex w-fit shrink-0 gap-2 overflow-x-scroll py-3">
        {NOTE_TAGS.map((tag: NoteTagType) => (
          <Tag key={tag} secondary={activeTag !== tag} onClick={() => setActiveTag(tag)}>
            {tag}
          </Tag>
        ))}
      </div>

      <section>
        {noteArr.map((item: NoteItemType) => (
          <NoteItem key={item.id} item={item} />
        ))}
      </section>

      <PostAdditionButton to={'/note/create'} />
    </main>
  )
}
