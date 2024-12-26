import { useState } from 'react'
import { FormProvider } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { collection, doc, setDoc } from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'

import { ThumbIcon } from '@/components/view/icons/ActiveIcon'
import { InputGroup } from '@/components/view/inputGroup'
import { ModalCreate } from '@/components/view/modal/Modal'
import { SubHeaderWithoutIcon } from '@/components/view/SubHeader'
import { auth, db } from '@/firebase/firebase'
import { useBoolean } from '@/hooks/useBoolean'
import { useProjectForm } from '@/hooks/useForms'
import { formatDate } from '@/utils/formatDate'

const inputFields = [
  {
    section: 'painstakingPart',
    label: '공들인 부분',
    placeholder: '공들인 부분을 입력해주세요.',
  },
  {
    section: 'likingPart',
    label: '좋았던 부분',
    placeholder: '좋았던 부분을 입력해주세요.',
  },
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

export const ProjectCreate = () => {
  const navigate = useNavigate()
  const formMethod = useProjectForm()
  const {
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = formMethod

  const [isModalOpen, openModal, closeModal] = useBoolean(false)
  const [satisfaction, setSatisfaction] = useState<number>(0)
  const [newProjectId, setNewProjectId] = useState<string | null>(null)

  const handleFormSubmit = async () => {
    try {
      const userId = auth.currentUser?.uid
      if (!userId) {
        console.error('User not authenticated')
        return
      }

      const formData = getValues()
      const newProjectId = uuidv4()
      const userProjectsRef = collection(db, 'users', userId, 'projects')
      const newProjectDocRef = doc(userProjectsRef, newProjectId)

      await setDoc(newProjectDocRef, {
        id: newProjectId,
        ...formData,
        createdAt: formatDate(new Date(), 'dotted'),
      })

      setNewProjectId(newProjectId)
      openModal()
    } catch (error) {
      console.error('Error creating project: ', error)
    }
  }

  const handleModalConfirm = () => {
    closeModal()
    if (newProjectId) {
      navigate(`/project/detail/${newProjectId}`, { replace: true })
    }
  }

  const handleSatisfactionChange = (value: number) => {
    setSatisfaction(value)
    setValue('satisfaction', value)
  }

  return (
    <>
      <SubHeaderWithoutIcon
        type="complete"
        title="프로젝트 추가"
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
                <InputGroup.Label section="satisfaction">만족도</InputGroup.Label>

                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3].map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => handleSatisfactionChange(value)}
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
        <ModalCreate isOpen={isModalOpen} closeModal={closeModal} onClick={handleModalConfirm} />
      )}
    </>
  )
}
