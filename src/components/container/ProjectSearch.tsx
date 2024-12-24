import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import type { ProjectTagType } from '@/types/common'
import type { ProjectItemType } from '@/types/project'
import { PROJECT_TAGS } from '@/utils/constants'

import { ProjectItem } from '../domain/ProjectItem'
import { BackArrowIcon } from '../view/icons/NonActiveIcon'
import { Search } from '../view/Search'
import { Tag } from '../view/Tag'

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

export const ProjectSearch = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const searchName = searchParams.get('searchName')
  const [activeTag, setActiveTag] = useState<ProjectTagType>(PROJECT_TAGS[0])

  return (
    <main className="flex-column mx-4 h-full pt-5">
      <header className="flex-align gap-4">
        <button onClick={() => navigate(-1)}>
          <BackArrowIcon />
        </button>
        <div className="grow">
          <Search initialValue={searchName} tabName="project" />
        </div>
      </header>

      <div className="scroll flex w-fit shrink-0 gap-2 overflow-x-scroll py-3">
        {PROJECT_TAGS.map((tag: ProjectTagType) => (
          <Tag key={tag} secondary={activeTag !== tag} onClick={() => setActiveTag(tag)}>
            {tag}
          </Tag>
        ))}
      </div>

      <section className="flex-column scroll grow">
        {projectArr.map((item) => (
          <ProjectItem key={item.id} item={item} />
        ))}
      </section>
    </main>
  )
}
