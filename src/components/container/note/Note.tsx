import { useState } from 'react'

import { NoteItem } from '@/components/domain/NoteItem'
import { EmptyMessage } from '@/components/view/ErrorMessage'
import { Loading } from '@/components/view/Loading'
import { PostAdditionButton } from '@/components/view/PostAdditionButton'
import { Search } from '@/components/view/Search'
import { Tag } from '@/components/view/Tag'
import { useNotes } from '@/services/useNoteService'
import type { NoteTagType } from '@/types/note'
import { NOTE_TAGS } from '@/utils/constants'

export const Note = () => {
  const [activeTag, setActiveTag] = useState<NoteTagType>(NOTE_TAGS[0])
  const { notes, loading, error } = useNotes(activeTag)

  const handleTagClick = (tag: NoteTagType) => setActiveTag(tag)

  return (
    <main className="flex-column mx-4 h-full">
      <Search tabName="note" />

      <div className="scroll flex w-fit shrink-0 gap-2 overflow-x-scroll py-3">
        {NOTE_TAGS.map((tag) => (
          <Tag key={tag} secondary={activeTag !== tag} onClick={() => handleTagClick(tag)}>
            {tag}
          </Tag>
        ))}
      </div>

      <section>
        {loading ? (
          <Loading />
        ) : error ? (
          <EmptyMessage>{error.message}</EmptyMessage>
        ) : (
          notes.map((note) => <NoteItem key={note.id} note={note} />)
        )}
      </section>

      <PostAdditionButton to="/note/create" />
    </main>
  )
}
