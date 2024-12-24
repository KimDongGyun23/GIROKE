import { useEffect, useState } from 'react'
import React from 'react'
import { FormProvider } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { useBoolean } from '@/hooks/useBoolean'
import { useNoteForm } from '@/hooks/useForms'
import type { NoteFormType, NoteTagType } from '@/types/note'
import { NOTE_TAGS } from '@/utils/constants'

import { Button } from '../view/Button'
import { InputGroup } from '../view/inputGroup'
import { ModalCreate } from '../view/modal/Modal'
import { SubHeaderWithoutIcon } from '../view/SubHeader'
import { Tag } from '../view/Tag'

const noteEditData: NoteFormType = {
  title: '리액트 렌더링 과정',
  tag: '공부',
  notes: [
    { subTitle: '단락1 제목', content: '단락1 내용' },
    { subTitle: '단락2 제목', content: '단락2 내용' },
  ],
}

export const NoteEdit = () => {
  const navigate = useNavigate()
  const formMethod = useNoteForm()

  const { title, tag, notes } = noteEditData

  const { handleSubmit, setValue } = formMethod

  const [modalState, openModal, closeModal] = useBoolean(false)
  const [notesState, setNotesState] = useState(notes)
  const [selectedTag, setSelectedTag] = useState<number>(0)

  const handleSubmitProjectForm = () => {
    console.log('submit')
    openModal()
  }

  const handleClickModalButton = () => {
    closeModal()
    navigate(`/note/detail/0`, { replace: true })
  }

  useEffect(() => {
    setValue('title', title)
    setValue('tag', tag)
    setValue('notes', notes)
  }, [])

  return (
    <>
      <SubHeaderWithoutIcon
        type="complete"
        title="노트 수정"
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

            {notesState.map((_, index) => (
              <React.Fragment key={index}>
                <InputGroup>
                  <InputGroup.Label section={`notes.${index}.subTitle`}>단락 제목</InputGroup.Label>
                  <InputGroup.Input
                    section={`notes.${index}.subTitle`}
                    placeholder="단락 제목을 입력해주세요."
                  />
                </InputGroup>
                <InputGroup.Label section={`notes.${index}.content`}>단락 내용</InputGroup.Label>
                <InputGroup.TextArea
                  section={`notes.${index}.content`}
                  placeholder="단락 내용을 입력해주세요."
                />
              </React.Fragment>
            ))}

            <Button
              type="button"
              size="sm"
              onClick={() => setNotesState((prev) => [...prev, { subTitle: '', content: '' }])}
            >
              단락 추가
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={() =>
                notesState.length > 1 &&
                setNotesState((prev) => {
                  const newState = [...prev]
                  newState.pop()
                  return newState
                })
              }
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
