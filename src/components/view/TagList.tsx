import { Tag } from '@/components/view/Tag'

type TagListProps<T extends string> = {
  tags: readonly T[]
  activeTag: T
  onTagClick: (tag: T) => void
}

export const TagList = <T extends string>({ tags, activeTag, onTagClick }: TagListProps<T>) => (
  <div className="scroll flex w-fit shrink-0 gap-2 overflow-x-scroll py-3" role="tablist">
    {tags.map((tag) => (
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

TagList.displayName = 'TagList'
