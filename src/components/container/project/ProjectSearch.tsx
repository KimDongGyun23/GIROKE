import { useCallback, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { ProjectItem } from '@/components/domain/ProjectItem'
import { EmptyMessage } from '@/components/view/ErrorMessage'
import { BackArrowIcon } from '@/components/view/icons/NonActiveIcon'
import { Loading } from '@/components/view/Loading'
import { Search } from '@/components/view/Search'
import { TagList } from '@/components/view/TagList'
import { useProjectSearch } from '@/services/projectService'
import type { ProjectTagType } from '@/types/project'
import { ERROR_MESSAGE, PROJECT_TAGS } from '@/utils/constants'

export const ProjectSearch = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const searchName = searchParams.get('searchName') || ''
  const [activeTag, setActiveTag] = useState<ProjectTagType>(PROJECT_TAGS[0])
  const { items: projects, loading, error } = useProjectSearch(activeTag, searchName)

  const handleBackClick = useCallback(() => navigate('/project'), [navigate])
  const handleTagClick = useCallback((tag: ProjectTagType) => setActiveTag(tag), [])

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

      <TagList tags={PROJECT_TAGS} activeTag={activeTag} onTagClick={handleTagClick} />

      <section className="flex-column scroll grow">
        {loading ? (
          <Loading />
        ) : error ? (
          <EmptyMessage>{error?.message}</EmptyMessage>
        ) : projects.length === 0 ? (
          <EmptyMessage>{ERROR_MESSAGE.noData}</EmptyMessage>
        ) : (
          projects.map((project) => <ProjectItem key={project.id} project={project} />)
        )}
      </section>
    </main>
  )
}
