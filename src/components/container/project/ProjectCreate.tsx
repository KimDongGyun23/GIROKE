import { useState } from 'react'
import { FormProvider } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { ThumbIcon } from '@/components/view/icons/ActiveIcon'
import { InputGroup } from '@/components/view/inputGroup'
import { ModalCreate } from '@/components/view/modal/Modal'
import { SubHeaderWithoutIcon } from '@/components/view/SubHeader'
import { useBoolean } from '@/hooks/useBoolean'
import { useProjectForm } from '@/hooks/useForms'

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

export const ProjectCreate = () => {
  const navigate = useNavigate()
  const formMethod = useProjectForm()
  const { handleSubmit, setValue } = formMethod

  const [isModalOpen, openModal, closeModal] = useBoolean(false)
  const [satisfaction, setSatisfaction] = useState<number>(0)

  const handleFormSubmit = () => {
    console.log('submit')
    openModal()
  }

  const handleModalConfirm = () => {
    closeModal()
    navigate(`/project/detail/0`, { replace: true })
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
              <div className="flex-between items-end">
                <InputGroup.Label section="tag">만족도</InputGroup.Label>

                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3].map((value) => (
                    <button key={value} onClick={() => handleSatisfactionChange(value)}>
                      <ThumbIcon active={value < satisfaction} />
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
