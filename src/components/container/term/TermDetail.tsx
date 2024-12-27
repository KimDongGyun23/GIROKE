import { useNavigate, useParams } from 'react-router-dom'

import { BottomBookmark } from '@/components/view/BottomBookmark'
import { ErrorMessage } from '@/components/view/ErrorMessage'
import { Kebab } from '@/components/view/Kebab'
import { Loading } from '@/components/view/Loading'
import { ModalDelete } from '@/components/view/modal/Modal'
import { SubHeaderWithIcon } from '@/components/view/SubHeader'
import { Tag } from '@/components/view/Tag'
import { useBoolean } from '@/hooks/useBoolean'
import { useToggle } from '@/hooks/useToggle'
import { useTermBookmark, useTermDelete, useTermDetail } from '@/services/useTermService'

export const TermDetail = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [isKebabOpen, toggleKebab] = useToggle(false)
  const [isModalOpen, openModal, closeModal] = useBoolean(false)

  const { term, setTerm, loading: termLoading, error: termError } = useTermDetail(id)
  const { isBookmarked, handleBookmarkToggle, error: bookmarkError } = useTermBookmark(id, setTerm)
  const { handleDelete, error: deleteError } = useTermDelete(id)

  const error = termError || bookmarkError || deleteError

  const handleEdit = () => {
    if (id) navigate(`/term/edit/${id}`)
  }

  const onBookmarkToggle = () => {
    if (!term) return
    handleBookmarkToggle(term.isBookmarked)
  }

  const kebabOptions = [
    { label: '수정', onClick: handleEdit },
    { label: '삭제', onClick: openModal },
  ]

  if (termLoading) {
    return <Loading />
  }

  if (termError || bookmarkError || deleteError || !term) {
    return <ErrorMessage>{error?.message}</ErrorMessage>
  }

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

      <BottomBookmark
        isActive={isBookmarked ?? term.isBookmarked}
        onToggleBookmark={onBookmarkToggle}
      />

      {isModalOpen && (
        <ModalDelete
          isOpen={isModalOpen}
          closeModal={closeModal}
          leftButtonOnClick={closeModal}
          rightButtonOnClick={() => handleDelete(closeModal)}
        />
      )}
    </>
  )
}
