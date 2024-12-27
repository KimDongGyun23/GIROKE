import React, { useCallback, useState } from 'react'

import { TermItem } from '@/components/domain/TermItem'
import { EmptyMessage, ErrorMessage } from '@/components/view/ErrorMessage'
import { Loading } from '@/components/view/Loading'
import { Tag } from '@/components/view/Tag'
import { useBookmarkedTerms } from '@/services/useBookmarkService'
import type { TermTagsType } from '@/types/term'
import { ERROR_MESSAGE, TERM_TAGS } from '@/utils/constants'

type TagListProps = {
  activeTag: TermTagsType
  onTagClick: (tag: TermTagsType) => void
}

const TagList = ({ activeTag, onTagClick }: TagListProps) => (
  <div className="scroll flex w-fit shrink-0 gap-2 overflow-x-scroll py-3" role="tablist">
    {TERM_TAGS.map((tag) => (
      <Tag
        key={tag}
        secondary={activeTag !== tag}
        onClick={() => onTagClick(tag)}
        aria-selected={activeTag === tag}
      >
        {tag}
      </Tag>
    ))}
  </div>
)

export const BookmarkTerm = () => {
  const [activeTag, setActiveTag] = useState<TermTagsType>(TERM_TAGS[0])
  const { bookmarkedTerms, loading, error } = useBookmarkedTerms(activeTag)

  const handleTagClick = useCallback((tag: TermTagsType) => setActiveTag(tag), [])

  if (error) {
    return <ErrorMessage>{error.message}</ErrorMessage>
  }

  return (
    <>
      <TagList activeTag={activeTag} onTagClick={handleTagClick} />
      <section className="flex-column scroll">
        {loading ? (
          <Loading />
        ) : bookmarkedTerms.length === 0 ? (
          <EmptyMessage>{ERROR_MESSAGE.noData}</EmptyMessage>
        ) : (
          bookmarkedTerms.map((term) => <TermItem key={term.id} term={term} />)
        )}
      </section>
    </>
  )
}
