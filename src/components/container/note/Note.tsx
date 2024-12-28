import { useCallback, useState } from 'react'

import { NoteItem } from '@/components/domain/NoteItem'
import { EmptyMessage } from '@/components/view/ErrorMessage'
import { Loading } from '@/components/view/Loading'
import { PostAdditionButton } from '@/components/view/PostAdditionButton'
import { Search } from '@/components/view/Search'
import { TagList } from '@/components/view/TagList'
import { useNotes } from '@/services/noteService'
import type { NoteTagType } from '@/types/note'
import { ERROR_MESSAGE, NOTE_TAGS } from '@/utils/constants'

const NotesSection = () => {
  const [activeTag, setActiveTag] = useState<NoteTagType>(NOTE_TAGS[0])
  const { items: notes, loading, error } = useNotes(activeTag)

  const handleTagClick = useCallback((tag: NoteTagType) => setActiveTag(tag), [])

  return (
    <>
      <TagList tags={NOTE_TAGS} activeTag={activeTag} onTagClick={handleTagClick} />
      <section>
        {loading ? (
          <Loading />
        ) : error ? (
          <EmptyMessage>{error.message}</EmptyMessage>
        ) : notes.length === 0 ? (
          <EmptyMessage>{ERROR_MESSAGE.noData}</EmptyMessage>
        ) : (
          notes.map((note) => <NoteItem key={note.id} note={note} />)
        )}
      </section>
    </>
  )
}

export const Note = () => {
  return (
    <main className="flex-column mx-4 h-full">
      <Search tabName="note" />
      <NotesSection />
      <PostAdditionButton to="/note/create" />
    </main>
  )
}
