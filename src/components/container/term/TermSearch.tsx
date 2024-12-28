import { useCallback, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { TermItem } from '@/components/domain/TermItem'
import { EmptyMessage } from '@/components/view/ErrorMessage'
import { BackArrowIcon } from '@/components/view/icons/NonActiveIcon'
import { Loading } from '@/components/view/Loading'
import { Search } from '@/components/view/Search'
import { TagList } from '@/components/view/TagList'
import { useTermSearch } from '@/services/termService'
import type { TermTagsType } from '@/types/term'
import { ERROR_MESSAGE, TERM_TAGS } from '@/utils/constants'

export const TermSearch = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const searchName = searchParams.get('searchName') || ''
  const [activeTag, setActiveTag] = useState<TermTagsType>(TERM_TAGS[0])
  const { items: terms, loading, error } = useTermSearch(activeTag, searchName)

  const handleBackClick = useCallback(() => navigate('/term'), [navigate])
  const handleTagClick = useCallback((tag: TermTagsType) => setActiveTag(tag), [])

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

      <TagList tags={TERM_TAGS} activeTag={activeTag} onTagClick={handleTagClick} />

      <section className="flex-column scroll grow">
        {loading ? (
          <Loading />
        ) : error ? (
          <EmptyMessage>{error?.message}</EmptyMessage>
        ) : terms.length === 0 ? (
          <EmptyMessage>{ERROR_MESSAGE.noData}</EmptyMessage>
        ) : (
          terms.map((term) => <TermItem key={term.id} term={term} />)
        )}
      </section>
    </main>
  )
}
