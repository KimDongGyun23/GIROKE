import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { ProjectItem } from '@/components/domain/ProjectItem'
import { EmptyMessage } from '@/components/view/ErrorMessage'
import { BackArrowIcon } from '@/components/view/icons/NonActiveIcon'
import { Loading } from '@/components/view/Loading'
import { Search } from '@/components/view/Search'
import { Tag } from '@/components/view/Tag'
import { useProjectSearch } from '@/services/useProjectService'
import type { ProjectTagType } from '@/types/project'
import { PROJECT_TAGS } from '@/utils/constants'

export const ProjectSearch = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const searchName = searchParams.get('searchName') || ''

  const [activeTag, setActiveTag] = useState<ProjectTagType>(PROJECT_TAGS[0])
  const { projects, loading, error } = useProjectSearch(activeTag, searchName)

  const handleBackClick = () => navigate('project')
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
        {loading ? (
          <Loading />
        ) : error ? (
          <EmptyMessage>{error?.message}</EmptyMessage>
        ) : (
          projects.map((project) => <ProjectItem key={project.id} project={project} />)
        )}
      </section>
    </main>
  )
}
