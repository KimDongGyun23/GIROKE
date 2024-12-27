import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { NoteItem } from '@/components/domain/NoteItem'
import { ErrorMessage } from '@/components/view/ErrorMessage'
import { BackArrowIcon } from '@/components/view/icons/NonActiveIcon'
import { Loading } from '@/components/view/Loading'
import { Search } from '@/components/view/Search'
import { Tag } from '@/components/view/Tag'
import { useNoteSearch } from '@/services/useNoteService'
import type { NoteTagType } from '@/types/note'
import { NOTE_TAGS } from '@/utils/constants'

export const NoteSearch = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const searchName = searchParams.get('searchName') || ''
  const [activeTag, setActiveTag] = useState<NoteTagType>(NOTE_TAGS[0])
  const { notes, loading, error } = useNoteSearch(activeTag, searchName)

  const handleBackClick = () => navigate('/note')
  const handleTagClick = (tag: NoteTagType) => setActiveTag(tag)

  if (error) {
    return <ErrorMessage>{error.message}</ErrorMessage>
  }

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
        {loading ? <Loading /> : notes.map((note) => <NoteItem key={note.id} note={note} />)}
      </section>
    </main>
  )
}
