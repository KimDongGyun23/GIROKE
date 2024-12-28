import { useCallback, useEffect } from 'react'
import { FormProvider, useFormContext, useWatch } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

import { ErrorMessage } from '@/components/view/ErrorMessage'
import { InputGroup } from '@/components/view/inputGroup'
import { Loading } from '@/components/view/Loading'
import { ModalEdit } from '@/components/view/modal/Modal'
import { SubHeaderWithoutIcon } from '@/components/view/SubHeader'
import { TagList } from '@/components/view/TagList'
import { useBoolean } from '@/hooks/useBoolean'
import { useTermForm } from '@/hooks/useForms'
import { useTermDetail, useTermUpdate } from '@/services/termService'
import type { TermItemType } from '@/types/term'
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

export const TermEdit = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const formMethod = useTermForm()
  const { handleSubmit, setValue, getValues } = formMethod

  const [isModalOpen, openModal, closeModal] = useBoolean(false)

  const { item: termData, loading, error: fetchError } = useTermDetail(id)
  const { updateItem: updateTerm, error: updateError } = useTermUpdate()

  useEffect(() => {
    if (termData) {
      Object.entries(termData).forEach(([key, value]) => {
        if (key !== 'id') {
          setValue(key as keyof Omit<TermItemType, 'id'>, value as string)
        }
      })
    }
  }, [termData, setValue])

  const handleFormSubmit = async () => {
    if (!id) return
    const formData = getValues()
    await updateTerm(id, formData).then(() => openModal())
  }

  const handleModalConfirm = useCallback(() => {
    closeModal()
    navigate(`/term/detail/${id}`, { replace: true })
  }, [closeModal, navigate, id])

  if (loading) return <Loading />
  if (fetchError || updateError)
    return <ErrorMessage>{(fetchError || updateError)?.message}</ErrorMessage>

  return (
    <>
      <SubHeaderWithoutIcon
        type="complete"
        title="용어 수정"
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
        <ModalEdit isOpen={isModalOpen} closeModal={closeModal} onClick={handleModalConfirm} />
      )}
    </>
  )
}
