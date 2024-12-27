import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { TermItem } from '@/components/domain/TermItem'
import { EmptyMessage } from '@/components/view/ErrorMessage'
import { BackArrowIcon } from '@/components/view/icons/NonActiveIcon'
import { Loading } from '@/components/view/Loading'
import { Search } from '@/components/view/Search'
import { Tag } from '@/components/view/Tag'
import { useTermSearch } from '@/services/useTermService'
import type { TermTagsType } from '@/types/term'
import { TERM_TAGS } from '@/utils/constants'

export const TermSearch = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const searchName = searchParams.get('searchName') || ''
  const [activeTag, setActiveTag] = useState<TermTagsType>(TERM_TAGS[0])

  const { terms, loading, error } = useTermSearch(activeTag, searchName)

  const handleBackClick = () => navigate('/term')
  const handleTagClick = (tag: TermTagsType) => setActiveTag(tag)

  return (
    <main className="flex-column mx-4 h-full pt-5">
      <header className="flex-align gap-4">
        <button onClick={handleBackClick}>
          <BackArrowIcon />
        </button>
        <div className="grow">
          <Search initialValue={searchName} tabName="term" />
        </div>
      </header>

      <div className="scroll flex w-fit shrink-0 gap-2 overflow-x-scroll py-3">
        {TERM_TAGS.map((tag) => (
          <Tag key={tag} secondary={activeTag !== tag} onClick={() => handleTagClick(tag)}>
            {tag}
          </Tag>
        ))}
      </div>

      <section className="flex-column scroll grow">
        {loading ? (
          <Loading />
        ) : error ? (
          <EmptyMessage>{error?.message}</EmptyMessage>
        ) : (
          terms.map((term) => <TermItem key={term.id} term={term} />)
        )}
      </section>
    </main>
  )
}
