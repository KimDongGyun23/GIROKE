import { useState } from 'react'
import { FormProvider } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { useBoolean } from '@/hooks/useBoolean'
import { useProjectForm } from '@/hooks/useForms'

import { ThumbIcon } from '../view/icons/ActiveIcon'
import { InputGroup } from '../view/inputGroup'
import { ModalCreate } from '../view/modal/Modal'
import { SubHeaderWithoutIcon } from '../view/SubHeader'

export const ProjectCreate = () => {
  const navigate = useNavigate()
  const formMethod = useProjectForm()

  const { handleSubmit, setValue } = formMethod

  const [modalState, openModal, closeModal] = useBoolean(false)
  const [selectedSatisfaction, setSelectedSatisfaction] = useState<number>(0)

  const handleSubmitProjectForm = () => {
    console.log('submit')
    openModal()
  }

  const handleClickModalButton = () => {
    closeModal()
    navigate(`/project/detail/0`, { replace: true })
  }

  return (
    <>
      <SubHeaderWithoutIcon
        type="complete"
        title="프로젝트 추가"
        onClickText={handleSubmit(handleSubmitProjectForm)}
      />

      <main className="scroll mx-4 py-5">
        <FormProvider {...formMethod}>
          <form className="flex-column gap-5">
            <InputGroup>
              <InputGroup.Label section="title">프로젝트 이름</InputGroup.Label>
              <InputGroup.Input section="title" placeholder="프로젝트 이름을 입력해주세요." />
            </InputGroup>

            <InputGroup>
              <InputGroup.Label section="title">프로젝트 기간</InputGroup.Label>
              <div className="flex gap-[10px]">
                <InputGroup.Input section="startDate" placeholder="20241224" />
                <InputGroup.Input section="finishDate" placeholder="20241224" />
              </div>
            </InputGroup>

            <InputGroup>
              <InputGroup.Label section="description">한줄 설명</InputGroup.Label>
              <InputGroup.Input section="description" placeholder="한줄 설명을 입력해주세요." />
            </InputGroup>

            <InputGroup>
              <InputGroup.Label section="painstakingPart">공들인 부분</InputGroup.Label>
              <InputGroup.TextArea
                section="painstakingPart"
                placeholder="공들인 부분을 입력해주세요."
              />
            </InputGroup>

            <InputGroup>
              <InputGroup.Label section="painstakingPart">좋았던 부분</InputGroup.Label>
              <InputGroup.TextArea
                section="painstakingPart"
                placeholder="좋았던 부분을 입력해주세요."
              />
            </InputGroup>
            <InputGroup>
              <InputGroup.Label section="likingPart">아쉬운 부분</InputGroup.Label>
              <InputGroup.TextArea section="likingPart" placeholder="아쉬운 부분을 입력해주세요." />
            </InputGroup>
            <InputGroup>
              <InputGroup.Label section="disappointingPart">
                사용한 기술들을 선택한 이유
              </InputGroup.Label>
              <InputGroup.TextArea
                section="disappointingPart"
                placeholder="기술들을 선택한 이유를 입력해주세요."
              />
            </InputGroup>
            <InputGroup>
              <InputGroup.Label section="reasonOfStack">공들인 부분</InputGroup.Label>
              <InputGroup.TextArea
                section="reasonOfStack"
                placeholder="공들인 부분을 입력해주세요."
              />
            </InputGroup>

            <InputGroup>
              <div className="flex-between items-end">
                <InputGroup.Label section="tag">만족도</InputGroup.Label>

                <div className="flex flex-wrap gap-2">
                  {[...Array(3)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedSatisfaction(index + 1)
                        setValue('satisfaction', index + 1)
                      }}
                    >
                      <ThumbIcon active={index < selectedSatisfaction} />
                    </button>
                  ))}
                </div>
              </div>
            </InputGroup>
          </form>
        </FormProvider>
      </main>

      {modalState && (
        <ModalCreate isOpen={modalState} closeModal={closeModal} onClick={handleClickModalButton} />
      )}
    </>
  )
}
