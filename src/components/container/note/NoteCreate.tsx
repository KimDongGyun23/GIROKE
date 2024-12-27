import { useState } from 'react'
import React from 'react'
import { FormProvider, useFieldArray } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/view/Button'
import { ErrorMessage } from '@/components/view/ErrorMessage'
import { InputGroup } from '@/components/view/inputGroup'
import { ModalCreate } from '@/components/view/modal/Modal'
import { SubHeaderWithoutIcon } from '@/components/view/SubHeader'
import { Tag } from '@/components/view/Tag'
import { useBoolean } from '@/hooks/useBoolean'
import { useNoteForm } from '@/hooks/useForms'
import { useNoteCreate } from '@/services/useNoteService'
import type { NoteFormType, NoteTagType } from '@/types/note'
import { NOTE_TAGS } from '@/utils/constants'

export const NoteCreate = () => {
  const navigate = useNavigate()
  const formMethod = useNoteForm()
  const { handleSubmit, setValue, control } = formMethod
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'paragraphs',
  })

  const [isModalOpen, openModal, closeModal] = useBoolean(false)
  const [selectedTag, setSelectedTag] = useState<NoteTagType>(NOTE_TAGS[0])
  const { handleCreateNote, newNoteId, error } = useNoteCreate()

  const handleFormSubmit = async (data: NoteFormType) => {
    const createdNoteId = await handleCreateNote(data, selectedTag)
    if (createdNoteId) {
      openModal()
    }
  }

  const handleModalConfirm = () => {
    closeModal()
    if (newNoteId) {
      navigate(`/note/detail/${newNoteId}`, { replace: true })
    }
  }

  const addParagraph = () => append({ subTitle: '', content: '' })
  const removeParagraph = () => remove(fields.length - 1)

  const handleTagSelect = (tag: NoteTagType) => {
    setSelectedTag(tag)
    setValue('tag', tag)
  }

  if (error) {
    return <ErrorMessage>{error.message || '예상치 못한 오류가 발생했습니다.'}</ErrorMessage>
  }

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

            <InputGroup>
              <InputGroup.Label section="tag">태그 선택</InputGroup.Label>
              <div className="flex flex-wrap gap-2">
                {NOTE_TAGS.slice(1).map((tag: NoteTagType) => (
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

            {fields.map((field, index) => (
              <React.Fragment key={field.id}>
                <InputGroup>
                  <InputGroup.Label section={`paragraphs.${index}.subTitle`}>
                    단락 제목
                  </InputGroup.Label>
                  <InputGroup.Input
                    section={`paragraphs.${index}.subTitle`}
                    placeholder="단락 제목을 입력해주세요."
                  />
                </InputGroup>
                <InputGroup.Label section={`paragraphs.${index}.content`}>
                  단락 내용
                </InputGroup.Label>
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
          </form>
        </FormProvider>
      </main>

      {isModalOpen && (
        <ModalCreate isOpen={isModalOpen} closeModal={closeModal} onClick={handleModalConfirm} />
      )}
    </>
  )
}
