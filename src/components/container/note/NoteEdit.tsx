import { useEffect, useState } from 'react'
import React from 'react'
import { FormProvider } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { doc, getDoc, updateDoc } from 'firebase/firestore'

import { Button } from '@/components/view/Button'
import { InputGroup } from '@/components/view/inputGroup'
import { ModalEdit } from '@/components/view/modal/Modal'
import { SubHeaderWithoutIcon } from '@/components/view/SubHeader'
import { Tag } from '@/components/view/Tag'
import { auth, db } from '@/firebase/firebase'
import { useBoolean } from '@/hooks/useBoolean'
import { useNoteForm } from '@/hooks/useForms'
import type { NoteFormType, NoteTagType } from '@/types/note'
import { NOTE_TAGS } from '@/utils/constants'

export const NoteEdit = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const formMethod = useNoteForm()
  const { handleSubmit, setValue, getValues } = formMethod

  const [isModalOpen, openModal, closeModal] = useBoolean(false)
  const [paragraphs, setParagraphs] = useState<{ subTitle: string; content: string }[]>([])
  const [selectedTag, setSelectedTag] = useState<NoteTagType>('전체')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNote = async () => {
      if (!id) return
      try {
        const userId = auth.currentUser?.uid
        if (!userId) {
          console.error('User not authenticated')
          return
        }
        const noteRef = doc(db, 'users', userId, 'notes', id)
        const noteSnap = await getDoc(noteRef)
        if (noteSnap.exists()) {
          const noteData = noteSnap.data() as NoteFormType
          setValue('title', noteData.title)
          setValue('tag', noteData.tag)
          setValue('paragraphs', noteData.paragraphs)
          setSelectedTag(noteData.tag)
          setParagraphs(noteData.paragraphs)
        } else {
          console.error('Note not found')
        }
      } catch (error) {
        console.error('Error fetching note:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchNote()
  }, [id, setValue])

  const handleFormSubmit = async () => {
    try {
      const userId = auth.currentUser?.uid
      if (!userId || !id) {
        console.error('User not authenticated or note ID is missing')
        return
      }
      const formData = getValues()
      const noteRef = doc(db, 'users', userId, 'notes', id)
      await updateDoc(noteRef, formData)
      console.log('Note updated successfully')
      openModal()
    } catch (error) {
      console.error('Error updating note:', error)
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
    return <div>Loading...</div>
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
