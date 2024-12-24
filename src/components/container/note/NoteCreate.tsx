import { useState } from 'react'
import React from 'react'
import { FormProvider } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/view/Button'
import { InputGroup } from '@/components/view/inputGroup'
import { ModalCreate } from '@/components/view/modal/Modal'
import { SubHeaderWithoutIcon } from '@/components/view/SubHeader'
import { Tag } from '@/components/view/Tag'
import { useBoolean } from '@/hooks/useBoolean'
import { useNoteForm } from '@/hooks/useForms'
import type { NoteTagType } from '@/types/note'
import { NOTE_TAGS } from '@/utils/constants'

export const NoteCreate = () => {
  const navigate = useNavigate()
  const formMethod = useNoteForm()
  const { handleSubmit, setValue } = formMethod

  const [isModalOpen, openModal, closeModal] = useBoolean(false)
  const [paragraphCount, setParagraphCount] = useState<number>(1)
  const [selectedTag, setSelectedTag] = useState<NoteTagType>(NOTE_TAGS[0])

  const handleFormSubmit = () => {
    console.log('submit')
    openModal()
  }

  const handleModalConfirm = () => {
    closeModal()
    navigate(`/note/detail/0`, { replace: true })
  }

  const addParagraph = () => setParagraphCount((prev) => prev + 1)
  const removeParagraph = () => setParagraphCount((prev) => Math.max(1, prev - 1))

  const handleTagSelect = (tag: NoteTagType) => {
    setSelectedTag(tag)
    setValue('tag', tag)
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
              <div className="flex-between items-end">
                <InputGroup.Label section="tag">태그 선택</InputGroup.Label>
                <p className="p-xsmall text-grey-6">* 최대 2개 선택 가능</p>
              </div>
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

            {[...Array(paragraphCount)].map((_, index) => (
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
