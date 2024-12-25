import { useEffect, useState } from 'react'
import React from 'react'
import { FormProvider } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/view/Button'
import { InputGroup } from '@/components/view/inputGroup'
import { ModalEdit } from '@/components/view/modal/Modal'
import { SubHeaderWithoutIcon } from '@/components/view/SubHeader'
import { Tag } from '@/components/view/Tag'
import { useBoolean } from '@/hooks/useBoolean'
import { useNoteForm } from '@/hooks/useForms'
import type { NoteFormType, NoteTagType } from '@/types/note'
import { NOTE_TAGS } from '@/utils/constants'

const noteEditData: NoteFormType = {
  title: '리액트 렌더링 과정',
  tag: '공부',
  paragraphs: [
    { subTitle: '단락1 제목', content: '단락1 내용' },
    { subTitle: '단락2 제목', content: '단락2 내용' },
  ],
}

export const NoteEdit = () => {
  const navigate = useNavigate()
  const formMethod = useNoteForm()
  const { handleSubmit, setValue } = formMethod

  const [isModalOpen, openModal, closeModal] = useBoolean(false)
  const [paragraphs, setParagraphs] = useState(noteEditData.paragraphs)
  const [selectedTag, setSelectedTag] = useState<NoteTagType>(noteEditData.tag)

  const handleFormSubmit = () => {
    console.log('submit')
    openModal()
  }

  const handleModalConfirm = () => {
    closeModal()
    navigate(`/note/detail/0`, { replace: true })
  }

  const addParagraph = () => {
    setParagraphs((prev) => [...prev, { subTitle: '', content: '' }])
  }

  const removeParagraph = () => {
    if (paragraphs.length > 1) {
      setParagraphs((prev) => prev.slice(0, -1))
    }
  }

  useEffect(() => {
    setValue('title', noteEditData.title)
    setValue('tag', noteEditData.tag)
    setValue('paragraphs', noteEditData.paragraphs)
  }, [])

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
