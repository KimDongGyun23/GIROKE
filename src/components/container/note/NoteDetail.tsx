import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore'

import { BottomBookmark } from '@/components/view/BottomBookmark'
import { InputGroup } from '@/components/view/inputGroup'
import { Kebab } from '@/components/view/Kebab'
import { ModalDelete } from '@/components/view/modal/Modal'
import { SubHeaderWithIcon } from '@/components/view/SubHeader'
import { Tag } from '@/components/view/Tag'
import { auth, db } from '@/firebase/firebase'
import { useBoolean } from '@/hooks/useBoolean'
import { useToggle } from '@/hooks/useToggle'
import type { NotedDetailType } from '@/types/note'

export const NoteDetail = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [isKebabOpen, toggleKebabState] = useToggle(false)
  const [isModalOpen, openModal, closeModal] = useBoolean(false)
  const [note, setNote] = useState<NotedDetailType | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const userId = auth.currentUser?.uid
        if (!userId || !id) {
          console.error('User not authenticated or note ID is missing')
          return
        }
        const noteRef = doc(db, 'users', userId, 'notes', id)
        const noteSnap = await getDoc(noteRef)
        if (noteSnap.exists()) {
          setNote({ id: noteSnap.id, ...noteSnap.data() } as NotedDetailType)
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
  }, [id])

  const handleEdit = () => navigate(`/note/edit/${id}`)

  const handleDelete = async () => {
    try {
      const userId = auth.currentUser?.uid
      if (!userId || !id) {
        console.error('User not authenticated or note ID is missing')
        return
      }
      const noteRef = doc(db, 'users', userId, 'notes', id)
      await deleteDoc(noteRef)
      console.log('Note deleted successfully')
      closeModal()
      navigate('/note', { replace: true })
    } catch (error) {
      console.error('Error deleting note:', error)
    }
  }

  const handleBookmarkToggle = async () => {
    if (!note || !id) return

    try {
      const userId = auth.currentUser?.uid
      if (!userId) {
        console.error('User not authenticated')
        return
      }

      const noteRef = doc(db, 'users', userId, 'notes', id)
      const newBookmarkStatus = !note.isBookmarked

      await updateDoc(noteRef, { isBookmarked: newBookmarkStatus })

      setNote((prevNote) => ({
        ...prevNote!,
        isBookmarked: newBookmarkStatus,
      }))
    } catch (error) {
      console.error('Error toggling bookmark: ', error)
    }
  }

  const kebabOptions = [
    { label: '수정', onClick: handleEdit },
    { label: '삭제', onClick: openModal },
  ]

  if (loading) {
    return <div>Loading...</div>
  }

  if (!note) {
    return <div>Note not found</div>
  }

  return (
    <>
      <div>
        <SubHeaderWithIcon type="kebab" title="" onClickIcon={toggleKebabState} />
        {isKebabOpen && (
          <Kebab list={kebabOptions} location="right-0 -translate-x-4" redIndex={1} />
        )}
      </div>

      <main className="flex-column scroll grow px-4 pt-5">
        <div>
          <h4 className="font-bold">{note.title}</h4>
          <div className="flex-between items-end">
            <span className="p-xsmall text-grey-5">{note.createdAt}</span>
            <Tag disabled>{note.tag}</Tag>
          </div>
        </div>

        <section className="flex-column my-4 gap-[10px]">
          {note.paragraphs.map(({ subTitle, content }, index) => (
            <InputGroup key={index}>
              <InputGroup.LabelWithoutForm>{subTitle}</InputGroup.LabelWithoutForm>
              <InputGroup.InputBox>{content}</InputGroup.InputBox>
            </InputGroup>
          ))}
        </section>
      </main>

      <BottomBookmark isActive={note.isBookmarked} onToggleBookmark={handleBookmarkToggle} />

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
