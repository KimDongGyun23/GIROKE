import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { ProjectItem } from '@/components/domain/ProjectItem'
import { BackArrowIcon } from '@/components/view/icons/NonActiveIcon'
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

export const ProjectSearch = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const searchName = searchParams.get('searchName') || ''
  const [activeTag, setActiveTag] = useState<ProjectTagType>(PROJECT_TAGS[0])

  const handleBackClick = () => navigate(-1)
  const handleTagClick = (tag: ProjectTagType) => setActiveTag(tag)

  return (
    <main className="flex-column mx-4 h-full pt-5">
      <header className="flex-align gap-4">
        <button onClick={handleBackClick}>
          <BackArrowIcon />
        </button>
        <div className="grow">
          <Search initialValue={searchName} tabName="project" />
        </div>
      </header>

      <div className="scroll flex w-fit shrink-0 gap-2 overflow-x-scroll py-3">
        {PROJECT_TAGS.map((tag: ProjectTagType) => (
          <Tag key={tag} secondary={activeTag !== tag} onClick={() => handleTagClick(tag)}>
            {tag}
          </Tag>
        ))}
      </div>

      <section className="flex-column scroll grow">
        {mockProjects.map((project) => (
          <ProjectItem key={project.id} project={project} />
        ))}
      </section>
    </main>
  )
}
