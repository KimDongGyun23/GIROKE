import { useNavigate, useParams } from 'react-router-dom'

import { BottomBookmark } from '@/components/view/BottomBookmark'
import { ErrorMessage } from '@/components/view/ErrorMessage'
import { InputGroup } from '@/components/view/inputGroup'
import { Kebab } from '@/components/view/Kebab'
import { Loading } from '@/components/view/Loading'
import { ModalDelete } from '@/components/view/modal/Modal'
import { SubHeaderWithIcon } from '@/components/view/SubHeader'
import { Tag } from '@/components/view/Tag'
import { useBoolean } from '@/hooks/useBoolean'
import { useToggle } from '@/hooks/useToggle'
import { useNoteBookmark, useNoteData, useNoteDelete } from '@/services/useNoteService'

export const NoteDetail = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [isKebabOpen, toggleKebabState] = useToggle(false)
  const [isModalOpen, openModal, closeModal] = useBoolean(false)

  const { note, setNote, loading, error: fetchError } = useNoteData(id)
  const { handleDelete, error: deleteError } = useNoteDelete(id)
  const { handleBookmarkToggle, error: bookmarkError } = useNoteBookmark(id)

  const error = fetchError || deleteError || bookmarkError

  const onBookmarkToggle = async () => {
    if (!note) return
    const newStatus = await handleBookmarkToggle(note.isBookmarked)
    if (newStatus !== undefined) {
      setNote((prevNote) => ({ ...prevNote!, isBookmarked: newStatus }))
    }
  }

  const handleEdit = () => navigate(`/note/edit/${id}`)

  const kebabOptions = [
    { label: '수정', onClick: handleEdit },
    { label: '삭제', onClick: openModal },
  ]

  if (loading) {
    return <Loading />
  }

  if (error || !note) {
    return <ErrorMessage>{error?.message || '노트가 존재하지 않습니다.'}</ErrorMessage>
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

      <BottomBookmark isActive={note.isBookmarked} onToggleBookmark={onBookmarkToggle} />

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
