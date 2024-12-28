import { useCallback } from 'react'
import React from 'react'
import { FormProvider, useFieldArray, useFormContext, useWatch } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/view/Button'
import { ErrorMessage } from '@/components/view/ErrorMessage'
import { InputGroup } from '@/components/view/inputGroup'
import { ModalCreate } from '@/components/view/modal/Modal'
import { SubHeaderWithoutIcon } from '@/components/view/SubHeader'
import { TagList } from '@/components/view/TagList'
import { useBoolean } from '@/hooks/useBoolean'
import { useNoteForm } from '@/hooks/useForms'
import { useNoteCreate } from '@/services/noteService'
import type { NoteFormType } from '@/types/note'
import { NOTE_TAGS } from '@/utils/constants'

const ParagraphFields = () => {
  const { control } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'paragraphs',
  })

  const addParagraph = useCallback(() => append({ subTitle: '', content: '' }), [append])
  const removeParagraph = useCallback(() => {
    if (fields.length > 1) {
      remove(fields.length - 1)
    }
  }, [remove, fields.length])

  return (
    <>
      {fields.map((field, index) => (
        <React.Fragment key={field.id}>
          <InputGroup>
            <InputGroup.Label section={`paragraphs.${index}.subTitle`}>단락 제목</InputGroup.Label>
            <InputGroup.Input
              section={`paragraphs.${index}.subTitle`}
              placeholder="단락 제목을 입력해주세요."
            />
          </InputGroup>
          <InputGroup.Label section={`paragraphs.${index}.content`}>단락 내용</InputGroup.Label>
          <InputGroup.TextArea
            section={`paragraphs.${index}.content`}
            placeholder="단락 내용을 입력해주세요."
          />
        </React.Fragment>
      ))}
      <Button type="button" size="sm" onClick={addParagraph}>
        단락 추가
      </Button>
      <Button type="button" size="sm" onClick={removeParagraph}>
        마지막 단락 삭제
      </Button>
    </>
  )
}

const TagField = () => {
  const { setValue, control } = useFormContext()
  const selectedTag = useWatch({ name: 'tag', control })

  return (
    <InputGroup>
      <InputGroup.Label section="tag">태그 선택</InputGroup.Label>
      <TagList
        tags={NOTE_TAGS}
        activeTag={selectedTag}
        onTagClick={(tag) => setValue('tag', tag)}
        isSliced
        isWrapped
      />
    </InputGroup>
  )
}

export const NoteCreate = () => {
  const navigate = useNavigate()
  const formMethod = useNoteForm()
  const { handleSubmit } = formMethod

  const [isModalOpen, openModal, closeModal] = useBoolean(false)
  const { handleCreate, newItemId, error } = useNoteCreate()

  const handleFormSubmit = async (data: NoteFormType) => {
    const createdNoteId = await handleCreate(data)
    if (createdNoteId) {
      openModal()
    }
  }

  const handleModalConfirm = () => {
    closeModal()
    if (newItemId) {
      navigate(`/note/detail/${newItemId}`, { replace: true })
    }
  }

  if (error) return <ErrorMessage>{error.message}</ErrorMessage>

  return (
    <>
      <SubHeaderWithoutIcon
        type="complete"
        title="노트 추가"
        onClickText={handleSubmit(handleFormSubmit)}
      />

      <main className="scroll mx-4 py-5">
        <FormProvider {...formMethod}>
          <form className="flex-column gap-5">
            <InputGroup>
              <InputGroup.Label section="title">노트 제목</InputGroup.Label>
              <InputGroup.Input section="title" placeholder="노트 제목을 입력해주세요." />
            </InputGroup>
            <TagField />
            <ParagraphFields />
          </form>
        </FormProvider>
      </main>

      {isModalOpen && (
        <ModalCreate isOpen={isModalOpen} closeModal={closeModal} onClick={handleModalConfirm} />
      )}
    </>
  )
}
