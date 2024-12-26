import { useState } from 'react'
import { FormProvider } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { collection, doc, setDoc } from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'

import { InputGroup } from '@/components/view/inputGroup'
import { ModalCreate } from '@/components/view/modal/Modal'
import { SubHeaderWithoutIcon } from '@/components/view/SubHeader'
import { Tag } from '@/components/view/Tag'
import { auth, db } from '@/firebase/firebase'
import { useBoolean } from '@/hooks/useBoolean'
import { useTermForm } from '@/hooks/useForms'
import type { TermTagsType } from '@/types/term'
import { TERM_TAGS } from '@/utils/constants'
import { formatDate } from '@/utils/formatDate'

export const TermCreate = () => {
  const navigate = useNavigate()
  const formMethod = useTermForm()
  const { handleSubmit, setValue, getValues } = formMethod
  const [selectedTag, setSelectedTag] = useState<TermTagsType | null>(null)
  const [isModalOpen, openModal, closeModal] = useBoolean(false)
  const [newTermId, setNewTermId] = useState<string | null>(null)

  const handleFormSubmit = async () => {
    try {
      const formData = getValues()
      const userId = auth.currentUser?.uid as string

      const newTermId = uuidv4()
      const userDocRef = doc(db, 'users', userId)
      const termsCollectionRef = collection(userDocRef, 'terms')
      const newTermDocRef = doc(termsCollectionRef, newTermId)

      await setDoc(newTermDocRef, {
        id: newTermId,
        term: formData.term,
        description: formData.description,
        createdAt: formatDate(new Date(), 'dotted'),
        tag: formData.tag,
      })
      setNewTermId(newTermId)
      openModal()
    } catch (error) {
      console.error('Error adding document: ', error)
    }
  }

  const handleModalConfirm = () => {
    closeModal()
    navigate(`/term/detail/${newTermId}`, { replace: true })
  }

  const handleTagSelect = (tag: TermTagsType) => {
    setSelectedTag(tag)
    setValue('tag', tag)
  }

  return (
    <>
      <SubHeaderWithoutIcon
        type="complete"
        title="용어 추가"
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

            <InputGroup>
              <div className="flex-between items-end">
                <InputGroup.Label section="tag">태그 선택</InputGroup.Label>
                <p className="p-xsmall text-grey-6">* 최대 2개 선택 가능</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {TERM_TAGS.slice(1).map((tag) => (
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
          </form>
        </FormProvider>
      </main>

      {isModalOpen && (
        <ModalCreate isOpen={isModalOpen} closeModal={closeModal} onClick={handleModalConfirm} />
      )}
    </>
  )
}
