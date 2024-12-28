import { useCallback, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { NoteItem } from '@/components/domain/NoteItem'
import { EmptyMessage } from '@/components/view/ErrorMessage'
import { BackArrowIcon } from '@/components/view/icons/NonActiveIcon'
import { Loading } from '@/components/view/Loading'
import { Search } from '@/components/view/Search'
import { TagList } from '@/components/view/TagList'
import { useNoteSearch } from '@/services/noteService'
import type { NoteTagType } from '@/types/note'
import { ERROR_MESSAGE, NOTE_TAGS } from '@/utils/constants'

export const NoteSearch = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const searchName = searchParams.get('searchName') || ''
  const [activeTag, setActiveTag] = useState<NoteTagType>(NOTE_TAGS[0])
  const { items: notes, loading, error } = useNoteSearch(activeTag, searchName)

  const handleBackClick = useCallback(() => navigate('/note'), [navigate])
  const handleTagClick = useCallback((tag: NoteTagType) => setActiveTag(tag), [])

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

      <TagList tags={NOTE_TAGS} activeTag={activeTag} onTagClick={handleTagClick} />

      <section className="flex-column scroll grow">
        {loading ? (
          <Loading />
        ) : error ? (
          <EmptyMessage>{error?.message}</EmptyMessage>
        ) : notes.length === 0 ? (
          <EmptyMessage>{ERROR_MESSAGE.noData}</EmptyMessage>
        ) : (
          notes.map((note) => <NoteItem key={note.id} note={note} />)
        )}
        {loading ? <Loading /> : notes.map((note) => <NoteItem key={note.id} note={note} />)}
      </section>
    </main>
  )
}
