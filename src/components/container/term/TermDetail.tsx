import { useNavigate } from 'react-router-dom'

import { BottomBookmark } from '@/components/view/BottomBookmark'
import { Kebab } from '@/components/view/Kebab'
import { ModalDelete } from '@/components/view/modal/Modal'
import { SubHeaderWithIcon } from '@/components/view/SubHeader'
import { Tag } from '@/components/view/Tag'
import { useBoolean } from '@/hooks/useBoolean'
import { useToggle } from '@/hooks/useToggle'

const mockTermDetail = {
  id: 0,
  title: 'DNS',
  tag: '네트워크',
  createdAt: '2024.12.20',
  description:
    '사용자에게 친숙한 도메인 이름을 컴퓨터가 네트워크에서 서로를 식별하는 데 사용하는 인터넷 프로토콜(IP) 주소로 변환하는 인터넷 표준 프로토콜의 구성 요소',
}

export const TermDetail = () => {
  const navigate = useNavigate()
  const [isKebabOpen, toggleKebab] = useToggle(false)
  const [isModalOpen, openModal, closeModal] = useBoolean(false)

  const { id, title, tag, createdAt, description } = mockTermDetail

  const handleEdit = () => navigate(`/term/edit/${id}`)
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
        <SubHeaderWithIcon type="kebab" title="" onClickIcon={toggleKebab} />
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

        <div className="flex-column mt-4 gap-[10px]">
          <p className="p-large font-medium text-grey-7">상세 설명</p>
          <div className="rounded-lg border border-green-4 px-4 py-[10px] text-grey-7">
            {description}
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
