import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import type { CollectionReference, DocumentData } from 'firebase/firestore'
import { collection, getDocs, query, where } from 'firebase/firestore'

import { ProjectItem } from '@/components/domain/ProjectItem'
import { PostAdditionButton } from '@/components/view/PostAdditionButton'
import { Search } from '@/components/view/Search'
import { Tag } from '@/components/view/Tag'
import { auth, db } from '@/firebase/firebase'
import type { ProjectItemType, ProjectTagType } from '@/types/project'
import { PROJECT_TAGS } from '@/utils/constants'

export const Project = () => {
  const [activeTag, setActiveTag] = useState<ProjectTagType>(PROJECT_TAGS[0])
  const [projects, setProjects] = useState<ProjectItemType[]>([])
  const [userId, setUserId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid)
      } else {
        setUserId(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    if (!userId) return

    const fetchProjects = async () => {
      setLoading(true)
      try {
        const userProjectsRef = collection(db, 'users', userId, 'projects')
        let projectsQuery = userProjectsRef
        if (activeTag !== '전체') {
          projectsQuery = query(
            userProjectsRef,
            where('satisfaction', '==', PROJECT_TAGS.indexOf(activeTag)),
          ) as CollectionReference<DocumentData, DocumentData>
        }

        const querySnapshot = await getDocs(projectsQuery)
        const fetchedProjects = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as ProjectItemType[]
        setProjects(fetchedProjects)
      } catch (error) {
        console.error('Error fetching projects:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [activeTag, userId])

  const handleTagClick = (tag: ProjectTagType) => setActiveTag(tag)

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
        {loading ? (
          <p>Loading...</p>
        ) : projects.length > 0 ? (
          projects.map((project) => <ProjectItem key={project.id} project={project} />)
        ) : (
          <p>No projects found.</p>
        )}
      </section>

      <PostAdditionButton to="/project/create" />
    </main>
  )
}
