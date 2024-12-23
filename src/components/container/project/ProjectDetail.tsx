import { useNavigate } from 'react-router-dom'

import { ThumbIcon } from '@/components/view/icons/ActiveIcon'
import { InputGroup } from '@/components/view/inputGroup'
import { Kebab } from '@/components/view/Kebab'
import { ModalDelete } from '@/components/view/modal/Modal'
import { SubHeaderWithIcon } from '@/components/view/SubHeader'
import { useBoolean } from '@/hooks/useBoolean'
import { useToggle } from '@/hooks/useToggle'

const mockProjectDetail = {
  id: 0,
  title: 'BROOM',
  satisfaction: 2,
  description: '광운대를 위한 예비군 종합 서비스',
  startDate: '2024.12.24',
  finishDate: '2024.12.24',
  painstakingPart:
    '공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분',
  likingPart:
    '공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분',
  disappointingPart:
    '공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분',
  reasonOfStack:
    '공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분공들인 부분',
}

export const ProjectDetail = () => {
  const navigate = useNavigate()
  const [isKebabOpen, toggleKebabState] = useToggle(false)
  const [isModalOpen, openModal, closeModal] = useBoolean(false)

  const {
    id,
    title,
    description,
    startDate,
    finishDate,
    satisfaction,
    painstakingPart,
    likingPart,
    disappointingPart,
    reasonOfStack,
  } = mockProjectDetail

  const projectDetails = [
    { label: '한줄 설명', content: description },
    { label: '공들인 부분', content: painstakingPart },
    { label: '좋았던 부분', content: likingPart },
    { label: '아쉬운 부분', content: disappointingPart },
    { label: '사용한 기술들을 사용한 이유', content: reasonOfStack },
  ]

  const handleEdit = () => navigate(`/project/edit/${id}`)
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
            <span className="p-xsmall text-grey-5">
              {startDate} - {finishDate}
            </span>
            <div className="flex gap-2">
              {[...Array(satisfaction)].map((_, index) => (
                <ThumbIcon active key={index} />
              ))}
            </div>
          </div>
        </div>

        <section className="flex-column my-4 gap-[10px]">
          {projectDetails.map(({ label, content }) => (
            <InputGroup key={label}>
              <InputGroup.LabelWithoutForm>{label}</InputGroup.LabelWithoutForm>
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
