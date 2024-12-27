import { useEffect, useState } from 'react'

import { auth } from '@/firebase/firebase'
import { useAuthState } from '@/hooks/useAuthState'
import {
  createProject,
  deleteProject,
  fetchProjectData,
  fetchProjects,
  searchProjects,
  updateProjectData,
} from '@/services/projectService'
import type {
  ProjectDetailType,
  ProjectFormType,
  ProjectItemType,
  ProjectTagType,
} from '@/types/project'
import { ERROR_MESSAGE } from '@/utils/constants'

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
        setError(error instanceof Error ? error : new Error(ERROR_MESSAGE.fetch))
      } finally {
        setLoading(false)
      }
    }

    loadProjects()
  }, [userId, activeTag])

  return { projects, loading, error }
}

export const useProjectCreate = () => {
  const { userId, loading: authLoading } = useAuthState(auth)
  const [newProjectId, setNewProjectId] = useState<string | null>(null)
  const [error, setError] = useState<Error | null>(null)

  const handleCreateProject = async (formData: ProjectFormType) => {
    if (authLoading || !userId) {
      setError(new Error(ERROR_MESSAGE.auth))
      return null
    }

    try {
      const createdProjectId = await createProject(userId, formData)
      setNewProjectId(createdProjectId)
      return createdProjectId
    } catch (err) {
      setError(err instanceof Error ? err : new Error(ERROR_MESSAGE.create))
      return null
    }
  }

  return { handleCreateProject, newProjectId, error }
}

export const useProjectDetail = (projectId: string | undefined) => {
  const { userId, loading: authLoading } = useAuthState(auth)
  const [project, setProject] = useState<ProjectDetailType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const loadProjectDetail = async () => {
      if (authLoading || !userId || !projectId) return

      try {
        const projectData = await fetchProjectData(userId, projectId)
        setProject(projectData)
      } catch (err) {
        setError(err instanceof Error ? err : new Error(ERROR_MESSAGE.fetch))
      } finally {
        setLoading(false)
      }
    }

    loadProjectDetail()
  }, [authLoading, userId, projectId])

  return { project, loading: loading || authLoading, error }
}

export const useProjectDelete = () => {
  const { userId } = useAuthState(auth)
  const [error, setError] = useState<Error | null>(null)

  const handleDelete = async (projectId: string) => {
    if (!userId || !projectId) {
      setError(new Error(ERROR_MESSAGE.auth))
      return false
    }

    try {
      await deleteProject(userId, projectId)
      return true
    } catch (err) {
      setError(err instanceof Error ? err : new Error(ERROR_MESSAGE.delete))
      return false
    }
  }

  return { handleDelete, error }
}

export const useProjectData = (projectId: string | undefined) => {
  const { userId, loading: authLoading } = useAuthState(auth)
  const [projectData, setProjectData] = useState<ProjectDetailType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const loadProjectData = async () => {
      if (authLoading || !userId || !projectId) return

      try {
        const data = await fetchProjectData(userId, projectId)
        setProjectData(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error(ERROR_MESSAGE.fetch))
      } finally {
        setLoading(false)
      }
    }

    loadProjectData()
  }, [authLoading, userId, projectId])

  return { projectData, loading: loading || authLoading, error }
}

export const useProjectUpdate = () => {
  const { userId } = useAuthState(auth)
  const [error, setError] = useState<Error | null>(null)

  const updateProject = async (projectId: string, formData: Partial<ProjectDetailType>) => {
    if (!userId || !projectId) {
      setError(new Error(ERROR_MESSAGE.auth))
      return false
    }

    try {
      await updateProjectData(userId, projectId, formData)
      return true
    } catch (err) {
      setError(err instanceof Error ? err : new Error(ERROR_MESSAGE.update))
      return false
    }
  }

  return { updateProject, error }
}

export const useProjectSearch = (activeTag: ProjectTagType, searchName: string) => {
  const { userId, loading: authLoading } = useAuthState(auth)
  const [projects, setProjects] = useState<ProjectItemType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchProjects = async () => {
      if (authLoading || !userId) return

      setLoading(true)
      try {
        const fetchedProjects = await searchProjects(userId, activeTag, searchName)
        setProjects(fetchedProjects)
      } catch (err) {
        setError(err instanceof Error ? err : new Error(ERROR_MESSAGE.fetch))
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [authLoading, userId, activeTag, searchName])

  return { projects, loading: loading || authLoading, error }
}
