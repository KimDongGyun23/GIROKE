import { useEffect, useState } from 'react'
import React from 'react'
import { FormProvider } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

import { Button } from '@/components/view/Button'
import { ErrorMessage } from '@/components/view/ErrorMessage'
import { InputGroup } from '@/components/view/inputGroup'
import { Loading } from '@/components/view/Loading'
import { ModalEdit } from '@/components/view/modal/Modal'
import { SubHeaderWithoutIcon } from '@/components/view/SubHeader'
import { Tag } from '@/components/view/Tag'
import { useBoolean } from '@/hooks/useBoolean'
import { useNoteForm } from '@/hooks/useForms'
import { useNoteEdit, useNoteEditData } from '@/services/useNoteService'
import type { NoteTagType } from '@/types/note'
import { NOTE_TAGS } from '@/utils/constants'

export const NoteEdit = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const formMethod = useNoteForm()
  const { handleSubmit, setValue, getValues } = formMethod

  const [isModalOpen, openModal, closeModal] = useBoolean(false)
  const [paragraphs, setParagraphs] = useState<{ subTitle: string; content: string }[]>([])
  const [selectedTag, setSelectedTag] = useState<NoteTagType>('전체')

  const { noteData, loading, error: fetchError } = useNoteEditData(id)
  const { updateNote, error: updateError } = useNoteEdit(id)

  useEffect(() => {
    if (noteData) {
      setValue('title', noteData.title)
      setValue('tag', noteData.tag)
      setValue('paragraphs', noteData.paragraphs)
      setSelectedTag(noteData.tag)
      setParagraphs(noteData.paragraphs)
    }
  }, [noteData, setValue])

  const handleFormSubmit = async () => {
    const formData = getValues()
    const success = await updateNote(formData)
    if (success) {
      openModal()
    }
  }

  const handleModalConfirm = () => {
    closeModal()
    navigate(`/note/detail/${id}`, { replace: true })
  }

  const addParagraph = () => {
    setParagraphs((prev) => [...prev, { subTitle: '', content: '' }])
    setValue('paragraphs', [...paragraphs, { subTitle: '', content: '' }])
  }

  const removeParagraph = () => {
    if (paragraphs.length > 1) {
      const newParagraphs = paragraphs.slice(0, -1)
      setParagraphs(newParagraphs)
      setValue('paragraphs', newParagraphs)
    }
  }

  if (loading) {
    return <Loading />
  }

  if (fetchError || updateError) {
    return <ErrorMessage>{(fetchError || updateError)?.message}</ErrorMessage>
  }

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

            <InputGroup>
              <div className="flex-between items-end">
                <InputGroup.Label section="tag">태그 선택</InputGroup.Label>
                <p className="p-xsmall text-grey-6">* 최대 2개 선택 가능</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {NOTE_TAGS.slice(1).map((tag: NoteTagType) => (
                  <Tag
                    key={tag}
                    secondary={tag !== selectedTag}
                    onClick={() => {
                      setSelectedTag(tag)
                      setValue('tag', tag)
                    }}
                  >
                    {tag}
                  </Tag>
                ))}
              </div>
            </InputGroup>

            {paragraphs.map((_, index) => (
              <React.Fragment key={index}>
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
        <ModalEdit isOpen={isModalOpen} closeModal={closeModal} onClick={handleModalConfirm} />
      )}
    </>
  )
}
