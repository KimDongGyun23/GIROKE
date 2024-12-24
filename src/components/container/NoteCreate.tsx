import { useState } from 'react'
import React from 'react'
import { FormProvider } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { useBoolean } from '@/hooks/useBoolean'
import { useNoteForm } from '@/hooks/useForms'
import type { NoteTagType } from '@/types/note'
import { NOTE_TAGS } from '@/utils/constants'

import { Button } from '../view/Button'
import { InputGroup } from '../view/inputGroup'
import { ModalCreate } from '../view/modal/Modal'
import { SubHeaderWithoutIcon } from '../view/SubHeader'
import { Tag } from '../view/Tag'

export const NoteCreate = () => {
  const navigate = useNavigate()
  const formMethod = useNoteForm()

  const { handleSubmit, setValue } = formMethod

  const [modalState, openModal, closeModal] = useBoolean(false)
  const [numberOfNotes, setNumberOfNotes] = useState<number>(1)
  const [selectedTag, setSelectedTag] = useState<number>(0)

  const handleClickAddNoteButton = () => {
    setNumberOfNotes((prev) => prev + 1)
  }

  const handleSubmitProjectForm = () => {
    console.log('submit')
    openModal()
  }

  const handleClickModalButton = () => {
    closeModal()
    navigate(`/note/detail/0`, { replace: true })
  }

  return (
    <>
      <SubHeaderWithoutIcon
        type="complete"
        title="노트 추가"
        onClickText={handleSubmit(handleSubmitProjectForm)}
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
                    secondary={tag !== NOTE_TAGS[selectedTag]}
                    onClick={() => {
                      setSelectedTag(NOTE_TAGS.indexOf(tag))
                      setValue('tag', tag)
                    }}
                  >
                    {tag}
                  </Tag>
                ))}
              </div>
            </InputGroup>

            {[...Array(numberOfNotes)].map((_, index) => (
              <React.Fragment key={index}>
                <InputGroup>
                  <InputGroup.Label section={`subTitle${index}`}>단락 제목</InputGroup.Label>
                  <InputGroup.Input
                    section={`subTitle${index}`}
                    placeholder="단락 제목을 입력해주세요."
                  />
                </InputGroup>
                <InputGroup.Label section={`content${index}`}>단락 내용</InputGroup.Label>
                <InputGroup.TextArea
                  section={`content${index}`}
                  placeholder="단락 내용을 입력해주세요."
                />
              </React.Fragment>
            ))}

            <Button type="button" size="sm" onClick={() => setNumberOfNotes((prev) => prev + 1)}>
              단락 추가
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={() => setNumberOfNotes((prev) => (prev > 1 ? prev - 1 : 1))}
            >
              마지막 단락 삭제
            </Button>
          </form>
        </FormProvider>
      </main>

      {modalState && (
        <ModalCreate isOpen={modalState} closeModal={closeModal} onClick={handleClickModalButton} />
      )}
    </>
  )
}
