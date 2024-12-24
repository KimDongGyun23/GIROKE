import { useEffect, useState } from 'react'
import { FormProvider } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { useBoolean } from '@/hooks/useBoolean'
import { useProjectForm } from '@/hooks/useForms'
import type { ProjectDetailType } from '@/types/project'

import { ThumbIcon } from '../view/icons/ActiveIcon'
import { InputGroup } from '../view/inputGroup'
import { ModalEdit } from '../view/modal/Modal'
import { SubHeaderWithoutIcon } from '../view/SubHeader'

const projectEditData: ProjectDetailType = {
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

export const ProjectEdit = () => {
  const navigate = useNavigate()
  const formMethod = useProjectForm()
  const {
    id,
    title,
    description,
    startDate,
    finishDate,
    satisfaction,
    painstakingPart,
    likingPart,
    disappointingPart,
    reasonOfStack,
  } = projectEditData

  const { handleSubmit, setValue } = formMethod

  const [modalState, openModal, closeModal] = useBoolean(false)
  const [selectedSatisfaction, setSelectedSatisfaction] = useState<number>(satisfaction)

  const handleSubmitTermForm = () => {
    console.log('submit')
    openModal()
  }

  const handleClickModalButton = () => {
    closeModal()
    navigate(`/project/detail/${id}`, { replace: true })
  }

  useEffect(() => {
    setValue('title', title)
    setValue('description', description)
    setValue('startDate', startDate)
    setValue('finishDate', finishDate)
    setValue('satisfaction', satisfaction)
    setValue('painstakingPart', painstakingPart)
    setValue('likingPart', likingPart)
    setValue('disappointingPart', disappointingPart)
    setValue('reasonOfStack', reasonOfStack)
  }, [])

  return (
    <>
      <SubHeaderWithoutIcon
        type="complete"
        title="용어 수정"
        onClickText={handleSubmit(handleSubmitTermForm)}
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
        <ModalEdit isOpen={modalState} closeModal={closeModal} onClick={handleClickModalButton} />
      )}
    </>
  )
}
