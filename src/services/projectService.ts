import * as firebaseUtils from '@/services/firebaseUtils'
import type {
  ProjectDetailType,
  ProjectFormType,
  ProjectItemType,
  ProjectTagType,
} from '@/types/project'

import {
  useItemCreate,
  useItemDelete,
  useItemDetail,
  useItemSearch,
  useItemsFetch,
  useItemUpdate,
} from './firebaseHooks'

const COLLECTION_NAME = 'projects'

export const useProjects = (activeTag: ProjectTagType) =>
  useItemsFetch<ProjectItemType, ProjectTagType>(
    (userId: string, tag: ProjectTagType) =>
      firebaseUtils.fetchItems<ProjectItemType>(userId, COLLECTION_NAME, tag),
    activeTag,
  )

export const useProjectCreate = () =>
  useItemCreate<ProjectFormType, ProjectTagType>(
    (userId: string, data: ProjectFormType, selectedTag: ProjectTagType) =>
      firebaseUtils.createItem(userId, COLLECTION_NAME, { ...data, tag: selectedTag }),
  )

export const useProjectDetail = (projectId: string | undefined) =>
  useItemDetail<ProjectDetailType>(
    (userId: string, id: string) =>
      firebaseUtils.fetchItemDetail<ProjectDetailType>(userId, COLLECTION_NAME, id),
    projectId,
  )

export const useProjectDelete = () =>
  useItemDelete((userId: string, id: string) =>
    firebaseUtils.deleteItem(userId, COLLECTION_NAME, id),
  )

export const useProjectUpdate = () =>
  useItemUpdate<Partial<ProjectDetailType>>(
    (userId: string, id: string, formData: Partial<ProjectDetailType>) =>
      firebaseUtils.updateItemData(userId, COLLECTION_NAME, id, formData),
  )

export const useProjectSearch = (activeTag: ProjectTagType, searchName: string) =>
  useItemSearch<ProjectItemType, ProjectTagType>(
    (userId: string, tag: ProjectTagType, name: string) =>
      firebaseUtils.searchItems<ProjectItemType>(userId, COLLECTION_NAME, tag, name),
    activeTag,
    searchName,
  )
