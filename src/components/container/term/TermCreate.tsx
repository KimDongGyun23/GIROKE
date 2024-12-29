import { useCallback } from 'react'
import { FormProvider, useFormContext, useWatch } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { ErrorMessage } from '@/components/view/ErrorMessage'
import { InputGroup } from '@/components/view/inputGroup'
import { ModalCreate } from '@/components/view/modal/Modal'
import { SubHeaderWithoutIcon } from '@/components/view/SubHeader'
import { TagList } from '@/components/view/TagList'
import { useBoolean } from '@/hooks/useBoolean'
import { useTermForm } from '@/hooks/useForms'
import { useTermCreate } from '@/services/termService'
import { TERM_TAGS } from '@/utils/constants'

const TagField = () => {
  const { setValue, control } = useFormContext()
  const selectedTag = useWatch({ name: 'tag', control })

  return (
    <InputGroup>
      <InputGroup.Label section="tag">태그 선택</InputGroup.Label>
      <TagList
        tags={TERM_TAGS}
        activeTag={selectedTag}
        onTagClick={(tag) => setValue('tag', tag)}
        isSliced
        isWrapped
      />
    </InputGroup>
  )
}

export const TermCreate = () => {
  const navigate = useNavigate()
  const formMethod = useTermForm()
  const { handleSubmit, getValues } = formMethod
  const [isModalOpen, openModal, closeModal] = useBoolean(false)
  const { handleCreate: createTerm, newItemId: newTermId, error } = useTermCreate()

  const handleFormSubmit = useCallback(async () => {
    const formData = getValues()
    await createTerm(formData)
    openModal()
  }, [createTerm, getValues, openModal])

  const handleModalConfirm = () => {
    closeModal()
    if (newTermId) {
      navigate(`/term/detail/${newTermId}`, { replace: true })
    }
  }

  if (error) return <ErrorMessage>{error?.message}</ErrorMessage>

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

            <TagField />
          </form>
        </FormProvider>
      </main>

      {isModalOpen && (
        <ModalCreate isOpen={isModalOpen} closeModal={closeModal} onClick={handleModalConfirm} />
      )}
    </>
  )
}
