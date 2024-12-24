import { useState } from 'react'

import type { ProjectTagType } from '@/types/common'
import type { ProjectItemType } from '@/types/project'
import { PROJECT_TAGS } from '@/utils/constants'

import { Tag } from '../view/Tag'

import { ProjectItem } from './ProjectItem'

const projectArr: ProjectItemType[] = [
  {
    id: 0,
    title: 'BROOM',
    satisfaction: 2,
    description: '광운대를 위한 예비군 종합 서비스',
    startDate: '2024.12.24',
    finishDate: '2024.12.24',
  },
  {
    id: 1,
    title: 'BROOM',
    satisfaction: 2,
    description: '광운대를 위한 예비군 종합 서비스',
    startDate: '2024.12.24',
    finishDate: '2024.12.24',
  },
  {
    id: 2,
    title: 'BROOM',
    satisfaction: 2,
    description: '광운대를 위한 예비군 종합 서비스',
    startDate: '2024.12.24',
    finishDate: '2024.12.24',
  },
  {
    id: 3,
    title: 'BROOM',
    satisfaction: 2,
    description: '광운대를 위한 예비군 종합 서비스',
    startDate: '2024.12.24',
    finishDate: '2024.12.24',
  },
]

export const BookmarkProject = () => {
  const [activeTag, setActiveTag] = useState<ProjectTagType>(PROJECT_TAGS[0])
  return (
    <>
      <div className="scroll flex w-fit shrink-0 gap-2 overflow-x-scroll py-3">
        {PROJECT_TAGS.map((tag: ProjectTagType) => (
          <Tag key={tag} secondary={activeTag !== tag} onClick={() => setActiveTag(tag)}>
            {tag}
          </Tag>
        ))}
      </div>

      <section className="flex-column scroll">
        {projectArr.map((item) => (
          <ProjectItem key={item.id} item={item} />
        ))}
      </section>
    </>
  )
}
