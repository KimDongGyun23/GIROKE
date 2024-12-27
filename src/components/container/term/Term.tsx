import { useState } from 'react'

import { TermItem } from '@/components/domain/TermItem'
import { EmptyMessage } from '@/components/view/ErrorMessage'
import { Loading } from '@/components/view/Loading'
import { PostAdditionButton } from '@/components/view/PostAdditionButton'
import { Search } from '@/components/view/Search'
import { Tag } from '@/components/view/Tag'
import { auth } from '@/firebase/firebase'
import { useAuthState } from '@/hooks/useAuthState'
import { useTerms } from '@/services/useTermService'
import type { TermTagsType } from '@/types/term'
import { TERM_TAGS } from '@/utils/constants'

export const Term = () => {
  const [activeTag, setActiveTag] = useState<TermTagsType>(TERM_TAGS[0])
  const { loading: authLoading, userId } = useAuthState(auth)
  const { terms, loading: termsLoading, error } = useTerms(userId, activeTag)

  const handleTagClick = (tag: TermTagsType) => setActiveTag(tag)

  const isLoading = authLoading || termsLoading

  return (
    <main className="flex-column mx-4 h-full">
      <Search tabName="term" />

      <div className="scroll flex w-fit shrink-0 gap-2 overflow-x-scroll py-3">
        {TERM_TAGS.map((tag) => (
          <Tag key={tag} secondary={activeTag !== tag} onClick={() => handleTagClick(tag)}>
            {tag}
          </Tag>
        ))}
      </div>

      <section className="flex-column scroll grow">
        {isLoading ? (
          <Loading />
        ) : error ? (
          <EmptyMessage>{error?.message}</EmptyMessage>
        ) : (
          terms.map((term) => <TermItem key={term.id} term={term} />)
        )}
      </section>

      <PostAdditionButton to="/term/create" />
    </main>
  )
}
