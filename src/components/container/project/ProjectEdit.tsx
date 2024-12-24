import { useEffect, useState } from 'react'
import { FormProvider } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { ThumbIcon } from '@/components/view/icons/ActiveIcon'
import { InputGroup } from '@/components/view/inputGroup'
import { ModalEdit } from '@/components/view/modal/Modal'
import { SubHeaderWithoutIcon } from '@/components/view/SubHeader'
import { useBoolean } from '@/hooks/useBoolean'
import { useProjectForm } from '@/hooks/useForms'
import type { ProjectDetailType } from '@/types/project'

const mockProjectData: ProjectDetailType = {
  id: 0,
  title: 'BROOM',
  satisfaction: 2,
  description: '광운대를 위한 예비군 종합 서비스',
  startDate: '2024.12.24',
  finishDate: '2024.12.24',
  painstakingPart:
    '공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분',
  likingPart:
    '공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분',
  disappointingPart:
    '공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분',
  reasonOfStack:
    '공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분',
}

const inputFields = [
  { section: 'title', label: '프로젝트 이름', placeholder: '프로젝트 이름을 입력해주세요.' },
  { section: 'description', label: '한줄 설명', placeholder: '한줄 설명을 입력해주세요.' },
  {
    section: 'painstakingPart',
    label: '공들인 부분',
    placeholder: '공들인 부분을 입력해주세요.',
    isTextArea: true,
  },
  {
    section: 'likingPart',
    label: '좋았던 부분',
    placeholder: '좋았던 부분을 입력해주세요.',
    isTextArea: true,
  },
  {
    section: 'disappointingPart',
    label: '아쉬운 부분',
    placeholder: '아쉬운 부분을 입력해주세요.',
    isTextArea: true,
  },
  {
    section: 'reasonOfStack',
    label: '사용한 기술들을 선택한 이유',
    placeholder: '기술들을 선택한 이유를 입력해주세요.',
    isTextArea: true,
  },
]

export const ProjectEdit = () => {
  const navigate = useNavigate()
  const formMethod = useProjectForm()
  const { handleSubmit, setValue } = formMethod

  const [isModalOpen, openModal, closeModal] = useBoolean(false)
  const [satisfaction, setSatisfaction] = useState<number>(mockProjectData.satisfaction)

  const handleFormSubmit = () => {
    console.log('submit')
    openModal()
  }

  const handleModalConfirm = () => {
    closeModal()
    navigate(`/project/detail/${mockProjectData.id}`, { replace: true })
  }

  const handleSatisfactionChange = (value: number) => {
    setSatisfaction(value)
    setValue('satisfaction', value)
  }

  useEffect(() => {
    Object.entries(mockProjectData).forEach(([key, value]) => {
      setValue(key as keyof Omit<ProjectDetailType, 'id'>, value)
    })
  }, [setValue])

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
            {inputFields.map(({ section, label, placeholder, isTextArea }) => (
              <InputGroup key={section}>
                <InputGroup.Label section={section}>{label}</InputGroup.Label>
                {isTextArea ? (
                  <InputGroup.TextArea section={section} placeholder={placeholder} />
                ) : (
                  <InputGroup.Input section={section} placeholder={placeholder} />
                )}
              </InputGroup>
            ))}

            <InputGroup>
              <InputGroup.Label section="title">프로젝트 기간</InputGroup.Label>
              <div className="flex gap-[10px]">
                <InputGroup.Input section="startDate" placeholder="20241224" />
                <InputGroup.Input section="finishDate" placeholder="20241224" />
              </div>
            </InputGroup>

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
