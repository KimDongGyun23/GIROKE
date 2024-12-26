import { useState } from 'react'

import { ProjectItem } from '@/components/domain/ProjectItem'
import { EmptyMessage } from '@/components/view/ErrorMessage'
import { Loading } from '@/components/view/Loading'
import { PostAdditionButton } from '@/components/view/PostAdditionButton'
import { Search } from '@/components/view/Search'
import { Tag } from '@/components/view/Tag'
import { auth } from '@/firebase/firebase'
import { useAuthState } from '@/hooks/useAuthState'
import { useProjects } from '@/services/useProjectService'
import type { ProjectTagType } from '@/types/project'
import { PROJECT_TAGS } from '@/utils/constants'

export const Project = () => {
  const [activeTag, setActiveTag] = useState<ProjectTagType>(PROJECT_TAGS[0])

  const { userId, loading: authLoading } = useAuthState(auth)
  const { projects, loading: projectLoading, error } = useProjects(userId, activeTag)

  const handleTagClick = (tag: ProjectTagType) => setActiveTag(tag)

  const isLoading = authLoading || projectLoading

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
        {isLoading ? (
          <Loading />
        ) : error ? (
          <EmptyMessage>{error.message}</EmptyMessage>
        ) : projects.length > 0 ? (
          projects.map((project) => <ProjectItem key={project.id} project={project} />)
        ) : (
          <EmptyMessage>프로젝트가 존재하지 않습니다.</EmptyMessage>
        )}
      </section>

      <PostAdditionButton to="/project/create" />
    </main>
  )
}
