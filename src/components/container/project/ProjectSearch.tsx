import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import type { CollectionReference, DocumentData } from 'firebase/firestore'
import { collection, getDocs, query, where } from 'firebase/firestore'

import { ProjectItem } from '@/components/domain/ProjectItem'
import { BackArrowIcon } from '@/components/view/icons/NonActiveIcon'
import { Search } from '@/components/view/Search'
import { Tag } from '@/components/view/Tag'
import { auth, db } from '@/firebase/firebase'
import type { ProjectItemType, ProjectTagType } from '@/types/project'
import { PROJECT_TAGS } from '@/utils/constants'

export const ProjectSearch = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const searchName = searchParams.get('searchName') || ''
  const [activeTag, setActiveTag] = useState<ProjectTagType>(PROJECT_TAGS[0])
  const [projects, setProjects] = useState<ProjectItemType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true)
      try {
        const userId = auth.currentUser?.uid
        if (!userId) {
          console.error('User not authenticated')
          setLoading(false)
          return
        }

        const userProjectsRef = collection(db, 'users', userId, 'projects')
        let projectsQuery = userProjectsRef

        if (activeTag !== '전체') {
          projectsQuery = query(
            userProjectsRef,
            where('tag', '==', activeTag),
          ) as CollectionReference<DocumentData, DocumentData>
        }

        const querySnapshot = await getDocs(projectsQuery)
        const fetchedProjects = querySnapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }) as ProjectItemType)
          .filter((project) => project.title.toLowerCase().includes(searchName.toLowerCase()))

        setProjects(fetchedProjects)
      } catch (error) {
        console.error('Error fetching projects:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [activeTag, searchName])

  const handleBackClick = () => navigate('project')
  const handleTagClick = (tag: ProjectTagType) => setActiveTag(tag)

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

      <div className="scroll flex w-fit shrink-0 gap-2 overflow-x-scroll py-3">
        {PROJECT_TAGS.map((tag: ProjectTagType) => (
          <Tag key={tag} secondary={activeTag !== tag} onClick={() => handleTagClick(tag)}>
            {tag}
          </Tag>
        ))}
      </div>

      <section className="flex-column scroll grow">
        {loading ? (
          <p>Loading...</p>
        ) : projects.length > 0 ? (
          projects.map((project) => <ProjectItem key={project.id} project={project} />)
        ) : (
          <p>No projects found.</p>
        )}
      </section>
    </main>
  )
}
