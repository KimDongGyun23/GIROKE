import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteDoc, doc, getDoc } from 'firebase/firestore'

import { BottomBookmark } from '@/components/view/BottomBookmark'
import { Kebab } from '@/components/view/Kebab'
import { ModalDelete } from '@/components/view/modal/Modal'
import { SubHeaderWithIcon } from '@/components/view/SubHeader'
import { Tag } from '@/components/view/Tag'
import { auth, db } from '@/firebase/firebase'
import { useBoolean } from '@/hooks/useBoolean'
import { useToggle } from '@/hooks/useToggle'
import type { TermItemType } from '@/types/term'

export const TermDetail = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [isKebabOpen, toggleKebab] = useToggle(false)
  const [isModalOpen, openModal, closeModal] = useBoolean(false)
  const [term, setTerm] = useState<TermItemType | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTermDetail = async () => {
      try {
        const userId = auth.currentUser?.uid
        if (!userId || !id) {
          console.error('User not authenticated or term ID is missing')
          setLoading(false)
          return
        }

        const termDocRef = doc(db, 'users', userId, 'terms', id)
        const termDoc = await getDoc(termDocRef)

        if (termDoc.exists()) {
          setTerm({ id: termDoc.id, ...termDoc.data() } as TermItemType)
        } else {
          console.error('Term not found')
        }
      } catch (error) {
        console.error('Error fetching term details: ', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTermDetail()
  }, [id])

  const handleEdit = () => {
    if (id) navigate(`/term/edit/${id}`)
  }

  const handleDelete = async () => {
    try {
      const userId = auth.currentUser?.uid
      if (!userId || !id) {
        console.error('User not authenticated or term ID is missing')
        return
      }

      const termDocRef = doc(db, 'users', userId, 'terms', id)
      await deleteDoc(termDocRef)

      console.log('Term deleted successfully')
      closeModal()
      navigate('/term', { replace: true })
    } catch (error) {
      console.error('Error deleting term: ', error)
    }
  }

  const kebabOptions = [
    { label: '수정', onClick: handleEdit },
    { label: '삭제', onClick: openModal },
  ]

  if (loading) {
    return <div>Loading...</div>
  }

  if (!term) {
    return <div>Term not found</div>
  }
  console.log(term)
  return (
    <>
      <div>
        <SubHeaderWithIcon type="kebab" title="" onClickIcon={toggleKebab} />
        {isKebabOpen && (
          <Kebab list={kebabOptions} location="right-0 -translate-x-4" redIndex={1} />
        )}
      </div>

      <main className="flex-column scroll grow px-4 pt-5">
        <div>
          <h4 className="font-bold">{term.term}</h4>
          <div className="flex-between items-end">
            <span className="p-xsmall text-grey-5">{term.createdAt}</span>
            <Tag disabled>{term.tag}</Tag>
          </div>
        </div>

        <div className="flex-column mt-4 gap-[10px]">
          <p className="p-large font-medium text-grey-7">상세 설명</p>
          <div className="rounded-lg border border-green-4 px-4 py-[10px] text-grey-7">
            {term.description}
          </div>
        </div>
      </main>

      <BottomBookmark isActive />

      {isModalOpen && (
        <ModalDelete
          isOpen={isModalOpen}
          closeModal={closeModal}
          leftButtonOnClick={closeModal}
          rightButtonOnClick={handleDelete}
        />
      )}
    </>
  )
}
