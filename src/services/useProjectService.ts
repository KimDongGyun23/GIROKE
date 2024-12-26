import { useEffect, useState } from 'react'

import { fetchProjects } from '@/services/projectService'
import type { ProjectItemType, ProjectTagType } from '@/types/project'

export const useProjects = (userId: string | null, activeTag: ProjectTagType) => {
  const [projects, setProjects] = useState<ProjectItemType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const loadProjects = async () => {
      if (!userId) return
      setLoading(true)
      setError(null)
      try {
        const fetchedProjects = await fetchProjects(userId, activeTag)
        setProjects(fetchedProjects)
      } catch (error) {
        setError(error instanceof Error ? error : new Error('예상치 못한 오류가 발생했습니다.'))
      } finally {
        setLoading(false)
      }
    }

    loadProjects()
  }, [userId, activeTag])

  return { projects, loading, error }
}
