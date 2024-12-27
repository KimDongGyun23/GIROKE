import { useState } from 'react'

import { NoteItem } from '@/components/domain/NoteItem'
import { EmptyMessage, ErrorMessage } from '@/components/view/ErrorMessage'
import { Loading } from '@/components/view/Loading'
import { Tag } from '@/components/view/Tag'
import { useBookmarkedNotes } from '@/services/useBookmarkService'
import type { NoteTagType } from '@/types/note'
import { NOTE_TAGS } from '@/utils/constants'

export const BookmarkNote = () => {
  const [activeTag, setActiveTag] = useState<NoteTagType>(NOTE_TAGS[0])
  const { bookmarkedNotes, loading, error } = useBookmarkedNotes(activeTag)

  const handleTagClick = (tag: NoteTagType) => setActiveTag(tag)

  if (error) {
    return <ErrorMessage>{error.message}</ErrorMessage>
  }

  return (
    <>
      <div className="scroll flex w-fit shrink-0 gap-2 overflow-x-scroll py-3">
        {NOTE_TAGS.map((tag) => (
          <Tag key={tag} secondary={activeTag !== tag} onClick={() => handleTagClick(tag)}>
            {tag}
          </Tag>
        ))}
      </div>

      <section className="flex-column scroll">
        {loading ? (
          <Loading />
        ) : bookmarkedNotes.length > 0 ? (
          bookmarkedNotes.map((note) => <NoteItem key={note.id} note={note} />)
        ) : (
          <EmptyMessage>북마크된 노트가 없습니다.</EmptyMessage>
        )}
      </section>
    </>
  )
}
