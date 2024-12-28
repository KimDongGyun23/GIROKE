import { Tag } from '@/components/view/Tag'

type TagListProps<T extends string> = {
  tags: readonly T[]
  activeTag: T
  onTagClick: (tag: T) => void
  isSliced?: boolean
  isWrapped?: boolean
}

export const TagList = <T extends string>({
  tags,
  activeTag,
  onTagClick,
  isSliced = false,
  isWrapped = false,
}: TagListProps<T>) => {
  const containerStyle = isWrapped ? 'flex-wrap' : 'scroll w-fit shrink-0 overflow-x-scroll py-3'
  const list = isSliced ? tags.slice(1) : tags

  return (
    <div className={`flex gap-2 ${containerStyle}`} role="tablist">
      {list.map((tag) => (
        <Tag
          key={tag}
          secondary={activeTag !== tag}
          onClick={() => onTagClick(tag)}
          role="tab"
          aria-selected={activeTag === tag}
        >
          {tag}
        </Tag>
      ))}
    </div>
  )
}
