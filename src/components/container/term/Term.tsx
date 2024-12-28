import React, { useCallback, useState } from 'react'

import { TermItem } from '@/components/domain/TermItem'
import { EmptyMessage } from '@/components/view/ErrorMessage'
import { Loading } from '@/components/view/Loading'
import { PostAdditionButton } from '@/components/view/PostAdditionButton'
import { Search } from '@/components/view/Search'
import { TagList } from '@/components/view/TagList'
import { useTerms } from '@/services/termService'
import type { TermTagsType } from '@/types/term'
import { ERROR_MESSAGE, TERM_TAGS } from '@/utils/constants'

const TermSection = () => {
  const [activeTag, setActiveTag] = useState<TermTagsType>(TERM_TAGS[0])
  const { items: terms, loading, error } = useTerms(activeTag)

  const handleTagClick = useCallback((tag: TermTagsType) => setActiveTag(tag), [])

  return (
    <>
      <TagList tags={TERM_TAGS} activeTag={activeTag} onTagClick={handleTagClick} />
      <section>
        {loading ? (
          <Loading />
        ) : error ? (
          <EmptyMessage>{error.message}</EmptyMessage>
        ) : terms.length === 0 ? (
          <EmptyMessage>{ERROR_MESSAGE.noData}</EmptyMessage>
        ) : (
          terms.map((note) => <TermItem key={note.id} term={note} />)
        )}
      </section>
    </>
  )
}

export const Term = () => {
  return (
    <main className="flex-column mx-4 h-full">
      <Search tabName="term" />
      <TermSection />
      <PostAdditionButton to="/term/create" />
    </main>
  )
}
