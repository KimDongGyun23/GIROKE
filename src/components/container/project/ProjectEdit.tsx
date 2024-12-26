import { useEffect, useState } from 'react'
import { FormProvider } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { doc, getDoc, updateDoc } from 'firebase/firestore'

import { ThumbIcon } from '@/components/view/icons/ActiveIcon'
import { InputGroup } from '@/components/view/inputGroup'
import { ModalEdit } from '@/components/view/modal/Modal'
import { SubHeaderWithoutIcon } from '@/components/view/SubHeader'
import { auth, db } from '@/firebase/firebase'
import { useBoolean } from '@/hooks/useBoolean'
import { useProjectForm } from '@/hooks/useForms'
import type { ProjectDetailType } from '@/types/project'
import { formatDate } from '@/utils/formatDate'

const inputFields = [
  { section: 'painstakingPart', label: '공들인 부분', placeholder: '공들인 부분을 입력해주세요.' },
  { section: 'likingPart', label: '좋았던 부분', placeholder: '좋았던 부분을 입력해주세요.' },
  {
    section: 'disappointingPart',
    label: '아쉬운 부분',
    placeholder: '아쉬운 부분을 입력해주세요.',
  },
  {
    section: 'reasonOfStack',
    label: '사용한 기술들을 선택한 이유',
    placeholder: '기술들을 선택한 이유를 입력해주세요.',
  },
]

export const ProjectEdit = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const formMethod = useProjectForm()
  const { handleSubmit, setValue, getValues } = formMethod

  const [isModalOpen, openModal, closeModal] = useBoolean(false)
  const [satisfaction, setSatisfaction] = useState<number>(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjectData = async () => {
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
          const data = projectDoc.data() as ProjectDetailType
          Object.entries(data).forEach(([key, value]) => {
            setValue(key as keyof Omit<ProjectDetailType, 'id'>, value)
          })
          setSatisfaction(data.satisfaction)
        } else {
          console.error('Project not found')
        }
      } catch (error) {
        console.error('Error fetching project data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProjectData()
  }, [id, setValue])

  const handleFormSubmit = async () => {
    try {
      const userId = auth.currentUser?.uid
      if (!userId || !id) {
        console.error('User not authenticated or project ID is missing')
        return
      }
      const formData = getValues()
      const projectDocRef = doc(db, 'users', userId, 'projects', id)
      await updateDoc(projectDocRef, formData)
      console.log('Project updated successfully')
      openModal()
    } catch (error) {
      console.error('Error updating project:', error)
    }
  }

  const handleModalConfirm = () => {
    closeModal()
    navigate(`/project/detail/${id}`, { replace: true })
  }

  const handleSatisfactionChange = (value: number) => {
    setSatisfaction(value)
    setValue('satisfaction', value)
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <SubHeaderWithoutIcon
        type="complete"
        title="프로젝트 수정"
        onClickText={handleSubmit(handleFormSubmit)}
      />

      <main className="scroll mx-4 py-5">
        <FormProvider {...formMethod}>
          <form className="flex-column gap-5">
            <InputGroup>
              <InputGroup.Label section="title">프로젝트 이름</InputGroup.Label>
              <InputGroup.Input section="title" placeholder="프로젝트 이름을 입력해주세요." />
            </InputGroup>

            <InputGroup>
              <InputGroup.Label section="description">한줄 설명</InputGroup.Label>
              <InputGroup.Input section="description" placeholder="한줄 설명을 입력해주세요." />
            </InputGroup>

            <InputGroup>
              <InputGroup.Label section="startDate">프로젝트 기간</InputGroup.Label>
              <div className="flex gap-[10px]">
                <InputGroup.Input
                  section="startDate"
                  placeholder={formatDate(new Date(), 'compact')}
                />
                <InputGroup.Input
                  section="finishDate"
                  placeholder={formatDate(new Date(), 'compact')}
                />
              </div>
            </InputGroup>

            {inputFields.map(({ section, label, placeholder }) => (
              <InputGroup key={section}>
                <InputGroup.Label section={section}>{label}</InputGroup.Label>
                <InputGroup.TextArea section={section} placeholder={placeholder} />
              </InputGroup>
            ))}

            <InputGroup>
              <div className="flex-between items-end">
                <InputGroup.Label section="tag">만족도</InputGroup.Label>
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3].map((value) => (
                    <button
                      key={value}
                      onClick={() => handleSatisfactionChange(value)}
                      type="button"
                    >
                      <ThumbIcon active={value <= satisfaction} />
                    </button>
                  ))}
                </div>
              </div>
            </InputGroup>
          </form>
        </FormProvider>
      </main>

      {isModalOpen && (
        <ModalEdit isOpen={isModalOpen} closeModal={closeModal} onClick={handleModalConfirm} />
      )}
    </>
  )
}
