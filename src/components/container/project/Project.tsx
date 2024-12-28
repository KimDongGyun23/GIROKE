import { useCallback, useState } from 'react'

import { ProjectItem } from '@/components/domain/ProjectItem'
import { EmptyMessage } from '@/components/view/ErrorMessage'
import { Loading } from '@/components/view/Loading'
import { PostAdditionButton } from '@/components/view/PostAdditionButton'
import { Search } from '@/components/view/Search'
import { TagList } from '@/components/view/TagList'
import { useProjects } from '@/services/projectService'
import type { ProjectTagType } from '@/types/project'
import { ERROR_MESSAGE, PROJECT_TAGS } from '@/utils/constants'

const ProjectSection = () => {
  const [activeTag, setActiveTag] = useState<ProjectTagType>(PROJECT_TAGS[0])
  const { items: projects, loading, error } = useProjects(activeTag)

  const handleTagClick = useCallback((tag: ProjectTagType) => setActiveTag(tag), [])

  return (
    <>
      <TagList tags={PROJECT_TAGS} activeTag={activeTag} onTagClick={handleTagClick} />
      <section>
        {loading ? (
          <Loading />
        ) : error ? (
          <EmptyMessage>{error.message}</EmptyMessage>
        ) : projects.length === 0 ? (
          <EmptyMessage>{ERROR_MESSAGE.noData}</EmptyMessage>
        ) : (
          projects.map((note) => <ProjectItem key={note.id} project={note} />)
        )}
      </section>
    </>
  )
}

export const Project = () => {
  return (
    <main className="flex-column mx-4 h-full">
      <Search tabName="project" />
      <ProjectSection />
      <PostAdditionButton to="/project/create" />
    </main>
  )
}
