import { useState } from 'react'

import type { ProjectTagType } from '@/types/common'
import { PROJECT_TAGS } from '@/utils/constants'

import { PostAdditionButton } from '../view/PostAdditionButton'
import { Search } from '../view/Search'
import { Tag } from '../view/Tag'

const projectArr = [
  {
    id: 0,
    title: 'BROOM',
    satisfaction: 2,
    description: '광운대를 위한 예비군 종합 서비스',
  },
  {
    id: 1,
    title: 'BROOM',
    satisfaction: 2,
    description: '광운대를 위한 예비군 종합 서비스',
  },
  {
    id: 2,
    title: 'BROOM',
    satisfaction: 2,
    description: '광운대를 위한 예비군 종합 서비스',
  },
  {
    id: 3,
    title: 'BROOM',
    satisfaction: 2,
    description: '광운대를 위한 예비군 종합 서비스',
  },
]

export const Project = () => {
  const [activeTag, setActiveTag] = useState<ProjectTagType>(PROJECT_TAGS[0])

  return (
    <main className="flex-column mx-4 h-full">
      <Search />

      <div className="scroll flex w-fit shrink-0 gap-2 overflow-x-scroll py-3">
        {PROJECT_TAGS.map((tag: ProjectTagType) => (
          <Tag key={tag} secondary={activeTag !== tag} onClick={() => setActiveTag(tag)}>
            {tag}
          </Tag>
        ))}
      </div>

      <PostAdditionButton to={'/term/create'} />
    </main>
  )
}
