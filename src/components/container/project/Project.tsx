import { useState } from 'react'

import { ProjectItem } from '@/components/domain/ProjectItem'
import { PostAdditionButton } from '@/components/view/PostAdditionButton'
import { Search } from '@/components/view/Search'
import { Tag } from '@/components/view/Tag'
import type { ProjectItemType, ProjectTagType } from '@/types/project'
import { PROJECT_TAGS } from '@/utils/constants'

const mockProjects: ProjectItemType[] = [
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

export const Project = () => {
  const [activeTag, setActiveTag] = useState<ProjectTagType>(PROJECT_TAGS[0])

  const handleTagClick = (tag: ProjectTagType) => setActiveTag(tag)

  return (
    <main className="flex-column mx-4 h-full">
      <Search tabName="project" />

      <div className="scroll flex w-fit shrink-0 gap-2 overflow-x-scroll py-3">
        {PROJECT_TAGS.map((tag) => (
          <Tag key={tag} secondary={activeTag !== tag} onClick={() => handleTagClick(tag)}>
            {tag}
          </Tag>
        ))}
      </div>

      <section>
        {mockProjects.map((project) => (
          <ProjectItem key={project.id} project={project} />
        ))}
      </section>

      <PostAdditionButton to="/project/create" />
    </main>
  )
}
