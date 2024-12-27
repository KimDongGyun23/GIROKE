import { useState } from 'react'

import { TermItem } from '@/components/domain/TermItem'
import { EmptyMessage, ErrorMessage } from '@/components/view/ErrorMessage'
import { Loading } from '@/components/view/Loading'
import { Tag } from '@/components/view/Tag'
import { useBookmarkedTerms } from '@/services/useBookmarkService'
import type { TermTagsType } from '@/types/term'
import { TERM_TAGS } from '@/utils/constants'

export const BookmarkTerm = () => {
  const [activeTag, setActiveTag] = useState<TermTagsType>(TERM_TAGS[0])
  const { bookmarkedTerms, loading, error } = useBookmarkedTerms(activeTag)

  const handleTagClick = (tag: TermTagsType) => setActiveTag(tag)

  if (error) {
    return <ErrorMessage>{error.message}</ErrorMessage>
  }

  return (
    <>
      <div className="scroll flex w-fit shrink-0 gap-2 overflow-x-scroll py-3">
        {TERM_TAGS.map((tag) => (
          <Tag key={tag} secondary={activeTag !== tag} onClick={() => handleTagClick(tag)}>
            {tag}
          </Tag>
        ))}
      </div>

      <section className="flex-column scroll">
        {loading ? (
          <Loading />
        ) : bookmarkedTerms.length > 0 ? (
          bookmarkedTerms.map((term) => <TermItem key={term.id} term={term} />)
        ) : (
          <EmptyMessage>북마크된 용어가 없습니다.</EmptyMessage>
        )}
      </section>
    </>
  )
}
