import type { CollectionReference, DocumentData } from 'firebase/firestore'
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'

import { db } from '@/firebase/firebase'
import type {
  ProjectDetailType,
  ProjectFormType,
  ProjectItemType,
  ProjectTagType,
} from '@/types/project'
import { PROJECT_TAGS } from '@/utils/constants'
import { formatDate } from '@/utils/formatDate'

export const fetchProjects = async (userId: string, activeTag: ProjectTagType) => {
  const userProjectsRef = collection(db, 'users', userId, 'projects')
  let projectsQuery = userProjectsRef

  if (activeTag !== '전체') {
    projectsQuery = query(
      userProjectsRef,
      where('satisfaction', '==', PROJECT_TAGS.indexOf(activeTag)),
    ) as CollectionReference<DocumentData, DocumentData>
  }

  const querySnapshot = await getDocs(projectsQuery)
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as ProjectItemType[]
}

export const createProject = async (userId: string, formData: ProjectFormType) => {
  const newProjectId = uuidv4()
  const userProjectsRef = collection(db, 'users', userId, 'projects')
  const newProjectDocRef = doc(userProjectsRef, newProjectId)

  await setDoc(newProjectDocRef, {
    id: newProjectId,
    ...formData,
    createdAt: formatDate(new Date(), 'dotted'),
  })

  return newProjectId
}

export const fetchProjectDetail = async (userId: string, projectId: string) => {
  const projectDocRef = doc(db, 'users', userId, 'projects', projectId)
  const projectDoc = await getDoc(projectDocRef)

  if (projectDoc.exists()) {
    return { id: projectDoc.id, ...projectDoc.data() } as ProjectDetailType
  } else {
    throw new Error('프로젝트가 존재하지 않습니다.')
  }
}

export const deleteProject = async (userId: string, projectId: string) => {
  const projectDocRef = doc(db, 'users', userId, 'projects', projectId)
  await deleteDoc(projectDocRef)
}
