import { useState } from 'react'
import { FormProvider } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { ErrorMessage } from '@/components/view/ErrorMessage'
import { InputGroup } from '@/components/view/inputGroup'
import { ModalCreate } from '@/components/view/modal/Modal'
import { SubHeaderWithoutIcon } from '@/components/view/SubHeader'
import { Tag } from '@/components/view/Tag'
import { useBoolean } from '@/hooks/useBoolean'
import { useTermForm } from '@/hooks/useForms'
import { useTermCreate } from '@/services/useTermService'
import type { TermTagsType } from '@/types/term'
import { TERM_TAGS } from '@/utils/constants'

export const TermCreate = () => {
  const navigate = useNavigate()
  const formMethod = useTermForm()
  const { handleSubmit, setValue, getValues } = formMethod
  const [selectedTag, setSelectedTag] = useState<TermTagsType | null>(null)
  const [isModalOpen, openModal, closeModal] = useBoolean(false)
  const { createTerm, newTermId, error } = useTermCreate()

  const handleFormSubmit = async () => {
    const formData = getValues()
    await createTerm(formData)
    openModal()
  }

  const handleModalConfirm = () => {
    closeModal()
    navigate(`/term/detail/${newTermId}`, { replace: true })
  }

  const handleTagSelect = (tag: TermTagsType) => {
    setSelectedTag(tag)
    setValue('tag', tag)
  }

  if (error) {
    return <ErrorMessage>예상치 못한 오류가 발생했습니다.</ErrorMessage>
  }

  return (
    <>
      <SubHeaderWithoutIcon
        type="complete"
        title="용어 추가"
        onClickText={handleSubmit(handleFormSubmit)}
      />

      <main className="scroll mx-4 py-5">
        <FormProvider {...formMethod}>
          <form className="flex-column gap-5">
            <InputGroup>
              <InputGroup.Label section="term">용어 이름</InputGroup.Label>
              <InputGroup.Input section="term" placeholder="용어 이름을 입력해주세요." />
            </InputGroup>

            <InputGroup>
              <InputGroup.Label section="description">상세 설명</InputGroup.Label>
              <InputGroup.TextArea section="description" placeholder="상세 설명을 입력해주세요." />
            </InputGroup>

            <InputGroup>
              <InputGroup.Label section="tag">태그 선택</InputGroup.Label>

              <div className="flex flex-wrap gap-2">
                {TERM_TAGS.slice(1).map((tag) => (
                  <Tag
                    key={tag}
                    secondary={tag !== selectedTag}
                    onClick={() => handleTagSelect(tag)}
                  >
                    {tag}
                  </Tag>
                ))}
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
