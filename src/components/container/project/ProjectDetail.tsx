import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteDoc, doc, getDoc } from 'firebase/firestore'

import { ThumbIcon } from '@/components/view/icons/ActiveIcon'
import { InputGroup } from '@/components/view/inputGroup'
import { Kebab } from '@/components/view/Kebab'
import { ModalDelete } from '@/components/view/modal/Modal'
import { SubHeaderWithIcon } from '@/components/view/SubHeader'
import { auth, db } from '@/firebase/firebase'
import { useBoolean } from '@/hooks/useBoolean'
import { useToggle } from '@/hooks/useToggle'
import type { ProjectDetailType } from '@/types/project'
import { formatDate } from '@/utils/formatDate'

export const ProjectDetail = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [isKebabOpen, toggleKebabState] = useToggle(false)
  const [isModalOpen, openModal, closeModal] = useBoolean(false)
  const [project, setProject] = useState<ProjectDetailType | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjectDetail = async () => {
      if (!id) return
      try {
        const userId = auth.currentUser?.uid
        if (!userId) {
          console.error('User not authenticated')
          return
        }
        const projectDocRef = doc(db, 'users', userId, 'projects', id)
        const projectDoc = await getDoc(projectDocRef)

        if (projectDoc.exists()) {
          setProject({ id: projectDoc.id, ...projectDoc.data() } as ProjectDetailType)
        } else {
          console.error('Project not found')
        }
      } catch (error) {
        console.error('Error fetching project details:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProjectDetail()
  }, [id])

  const handleEdit = () => {
    if (id) navigate(`/project/edit/${id}`)
  }

  const handleDelete = async () => {
    if (!id) return
    try {
      const userId = auth.currentUser?.uid
      if (!userId) {
        console.error('User not authenticated')
        return
      }
      const projectDocRef = doc(db, 'users', userId, 'projects', id)
      await deleteDoc(projectDocRef)
      console.log('Project deleted successfully')
      closeModal()
      navigate('/project', { replace: true })
    } catch (error) {
      console.error('Error deleting project:', error)
    }
  }

  const kebabOptions = [
    { label: '수정', onClick: handleEdit },
    { label: '삭제', onClick: openModal },
  ]

  if (loading) {
    return <div>Loading...</div>
  }

  if (!project) {
    return <div>Project not found</div>
  }

  const projectDetails = [
    { label: '한줄 설명', content: project.description },
    { label: '공들인 부분', content: project.painstakingPart },
    { label: '좋았던 부분', content: project.likingPart },
    { label: '아쉬운 부분', content: project.disappointingPart },
    { label: '사용한 기술들을 사용한 이유', content: project.reasonOfStack },
  ]

  return (
    <>
      <div>
        <SubHeaderWithIcon type="kebab" title="" onClickIcon={toggleKebabState} />
        {isKebabOpen && (
          <Kebab list={kebabOptions} location="right-0 -translate-x-4" redIndex={1} />
        )}
      </div>

      <main className="flex-column scroll grow px-4 pt-5">
        <div>
          <h4 className="font-bold">{project.title}</h4>
          <div className="flex-between items-end">
            <span className="p-xsmall text-grey-5">
              {formatDate(project.startDate, 'dotted')} - {formatDate(project.finishDate, 'dotted')}
            </span>
            <div className="flex gap-2">
              {[...Array(project.satisfaction)].map((_, index) => (
                <ThumbIcon active key={index} />
              ))}
            </div>
          </div>
        </div>

        <section className="flex-column my-4 gap-[10px]">
          {projectDetails.map(({ label, content }) => (
            <InputGroup key={label}>
              <InputGroup.LabelWithoutForm>{label}</InputGroup.LabelWithoutForm>
              <InputGroup.InputBox>{content}</InputGroup.InputBox>
            </InputGroup>
          ))}
        </section>
      </main>

      {isModalOpen && (
        <ModalDelete
          isOpen={isModalOpen}
          closeModal={closeModal}
          leftButtonOnClick={closeModal}
          rightButtonOnClick={handleDelete}
        />
      )}
    </>
  )
}
