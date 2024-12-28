import React, { useCallback, useEffect } from 'react'
import { FormProvider, useFieldArray, useFormContext, useWatch } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

import { Button } from '@/components/view/Button'
import { ErrorMessage } from '@/components/view/ErrorMessage'
import { InputGroup } from '@/components/view/inputGroup'
import { Loading } from '@/components/view/Loading'
import { ModalEdit } from '@/components/view/modal/Modal'
import { SubHeaderWithoutIcon } from '@/components/view/SubHeader'
import { TagList } from '@/components/view/TagList'
import { useBoolean } from '@/hooks/useBoolean'
import { useNoteForm } from '@/hooks/useForms'
import { useNoteData, useNoteEdit } from '@/services/noteService'
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

export const NoteEdit = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const formMethod = useNoteForm()
  const { handleSubmit, setValue, getValues } = formMethod

  const [isModalOpen, openModal, closeModal] = useBoolean(false)

  const { item: noteData, loading, error: fetchError } = useNoteData(id)
  const { updateItem: updateNote, error: updateError } = useNoteEdit()

  useEffect(() => {
    if (noteData) {
      setValue('title', noteData.title)
      setValue('tag', noteData.tag)
      setValue('paragraphs', noteData.paragraphs)
    }
  }, [noteData, setValue])

  const handleFormSubmit = async () => {
    const formData = getValues()
    await updateNote(id as string, formData).then(() => openModal())
  }

  const handleModalConfirm = () => {
    closeModal()
    navigate(`/note/detail/${id}`, { replace: true })
  }

  const error = fetchError || updateError

  if (loading) return <Loading />
  if (error) return <ErrorMessage>{error.message}</ErrorMessage>

  return (
    <>
      <SubHeaderWithoutIcon
        type="complete"
        title="노트 수정"
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
        <ModalEdit isOpen={isModalOpen} closeModal={closeModal} onClick={handleModalConfirm} />
      )}
    </>
  )
}
