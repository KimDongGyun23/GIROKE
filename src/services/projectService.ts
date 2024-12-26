import type { CollectionReference, DocumentData } from 'firebase/firestore'
import { collection, getDocs, query, where } from 'firebase/firestore'

import { db } from '@/firebase/firebase'
import type { ProjectItemType, ProjectTagType } from '@/types/project'
import { PROJECT_TAGS } from '@/utils/constants'

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
