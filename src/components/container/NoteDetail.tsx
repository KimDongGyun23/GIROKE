import { useNavigate } from 'react-router-dom'

import { useBoolean } from '@/hooks/useBoolean'
import { useToggle } from '@/hooks/useToggle'

import { InputGroup } from '../view/inputGroup'
import { Kebab } from '../view/Kebab'
import { ModalDelete } from '../view/modal/Modal'
import { SubHeaderWithIcon } from '../view/SubHeader'
import { Tag } from '../view/Tag'

const detailData = {
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
  const [kebabState, toggleKebabState] = useToggle(false)
  const [modalState, openModal, closeModal] = useBoolean(false)

  const { id, title, createdAt, tag, notes } = detailData

  const kebabArr = [
    { label: '수정', onClick: () => navigate(`/note/edit/${id}`) },
    { label: '삭제', onClick: openModal },
  ]

  return (
    <>
      <div>
        <SubHeaderWithIcon type="kebab" title="" onClickIcon={toggleKebabState} />
        {kebabState && <Kebab list={kebabArr} location="right-0 -translate-x-4" redIndex={1} />}
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

      {modalState && (
        <ModalDelete
          isOpen={modalState}
          closeModal={closeModal}
          leftButtonOnClick={closeModal}
          rightButtonOnClick={() => {}}
        />
      )}
    </>
  )
}
