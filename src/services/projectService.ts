import * as firebaseUtils from '@/firebase/firebaseUtils'
import type {
  ProjectDetailType,
  ProjectFormType,
  ProjectItemType,
  ProjectTagType,
} from '@/types/project'

const COLLECTION_NAME = 'projects'

export const fetchProjects = (userId: string, activeTag: ProjectTagType) =>
  firebaseUtils.fetchItems<ProjectItemType>(userId, COLLECTION_NAME, activeTag, 'satisfaction')

export const createProject = (userId: string, formData: ProjectFormType) =>
  firebaseUtils.createItem(userId, COLLECTION_NAME, formData)

export const fetchProjectData = (userId: string, projectId: string) =>
  firebaseUtils.fetchItemDetail<ProjectDetailType>(userId, COLLECTION_NAME, projectId)

export const deleteProject = (userId: string, projectId: string) =>
  firebaseUtils.deleteItem(userId, COLLECTION_NAME, projectId)

export const updateProjectData = (
  userId: string,
  projectId: string,
  formData: Partial<ProjectDetailType>,
) => firebaseUtils.updateItemData(userId, COLLECTION_NAME, projectId, formData)

export const searchProjects = (userId: string, activeTag: ProjectTagType, searchName: string) =>
  firebaseUtils.searchItems<ProjectItemType>(
    userId,
    COLLECTION_NAME,
    activeTag,
    searchName,
    'satisfaction',
  )
