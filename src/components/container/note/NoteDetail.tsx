import { useNavigate } from 'react-router-dom'

import { InputGroup } from '@/components/view/inputGroup'
import { Kebab } from '@/components/view/Kebab'
import { ModalDelete } from '@/components/view/modal/Modal'
import { SubHeaderWithIcon } from '@/components/view/SubHeader'
import { Tag } from '@/components/view/Tag'
import { useBoolean } from '@/hooks/useBoolean'
import { useToggle } from '@/hooks/useToggle'

const mockNoteDetail = {
  id: 0,
  title: '리액트 렌더링 과정',
  createdAt: '2024.12.24',
  tag: '공부',
  notes: [
    { subTitle: '단락1 제목', content: '단락1 내용' },
    { subTitle: '단락1 제목', content: '단락1 내용' },
  ],
}

export const NoteDetail = () => {
  const navigate = useNavigate()
  const [isKebabOpen, toggleKebabState] = useToggle(false)
  const [isModalOpen, openModal, closeModal] = useBoolean(false)

  const { id, title, createdAt, tag, notes } = mockNoteDetail

  const handleEdit = () => navigate(`/note/edit/${id}`)
  const handleDelete = () => {
    // 삭제 로직 구현
    closeModal()
  }

  const kebabOptions = [
    { label: '수정', onClick: handleEdit },
    { label: '삭제', onClick: openModal },
  ]

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
          <h4 className="font-bold">{title}</h4>
          <div className="flex-between items-end">
            <span className="p-xsmall text-grey-5">{createdAt}</span>
            <Tag disabled>{tag}</Tag>
          </div>
        </div>

        <section className="flex-column my-4 gap-[10px]">
          {notes.map(({ subTitle, content }, index) => (
            <InputGroup key={index}>
              <InputGroup.LabelWithoutForm>{subTitle}</InputGroup.LabelWithoutForm>
              <InputGroup.InputBox>{content}</InputGroup.InputBox>
            </InputGroup>
          ))}
        </section>
      </main>

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
