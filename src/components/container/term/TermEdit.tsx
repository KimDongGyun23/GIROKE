import { useEffect, useState } from 'react'
import { FormProvider } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { doc, getDoc, updateDoc } from 'firebase/firestore'

import { InputGroup } from '@/components/view/inputGroup'
import { ModalEdit } from '@/components/view/modal/Modal'
import { SubHeaderWithoutIcon } from '@/components/view/SubHeader'
import { Tag } from '@/components/view/Tag'
import { auth, db } from '@/firebase/firebase'
import { useBoolean } from '@/hooks/useBoolean'
import { useTermForm } from '@/hooks/useForms'
import type { TermItemType, TermTagsType } from '@/types/term'
import { TERM_TAGS } from '@/utils/constants'

export const TermEdit = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const formMethod = useTermForm()
  const { handleSubmit, setValue, getValues } = formMethod

  const [isModalOpen, openModal, closeModal] = useBoolean(false)
  const [selectedTag, setSelectedTag] = useState<TermTagsType | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTermData = async () => {
      if (!id) return
      try {
        const userId = auth.currentUser?.uid
        if (!userId) {
          console.error('User not authenticated')
          return
        }
        const termDocRef = doc(db, 'users', userId, 'terms', id)
        const termDoc = await getDoc(termDocRef)
        if (termDoc.exists()) {
          const data = termDoc.data() as TermItemType
          Object.entries(data).forEach(([key, value]) => {
            setValue(key as keyof Omit<TermItemType, 'id'>, value as string)
          })
          setSelectedTag(data.tag)
        } else {
          console.error('Term not found')
        }
      } catch (error) {
        console.error('Error fetching term data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchTermData()
  }, [id, setValue])

  const handleFormSubmit = async () => {
    try {
      const userId = auth.currentUser?.uid
      if (!userId || !id) {
        console.error('User not authenticated or term ID is missing')
        return
      }
      const formData = getValues()
      const termDocRef = doc(db, 'users', userId, 'terms', id)
      await updateDoc(termDocRef, formData)
      console.log('Term updated successfully')
      openModal()
    } catch (error) {
      console.error('Error updating term:', error)
    }
  }

  const handleModalConfirm = () => {
    closeModal()
    navigate(`/term/detail/${id}`, { replace: true })
  }

  const handleTagSelect = (tag: TermTagsType) => {
    setSelectedTag(tag)
    setValue('tag', tag)
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <SubHeaderWithoutIcon
        type="complete"
        title="용어 수정"
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
              <InputGroup.Label section="tag">태그 선택</InputGroup.Label>
              <div className="flex flex-wrap gap-2">
                {TERM_TAGS.slice(1).map((tag: TermTagsType) => (
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
        <ModalEdit isOpen={isModalOpen} closeModal={closeModal} onClick={handleModalConfirm} />
      )}
    </>
  )
}
