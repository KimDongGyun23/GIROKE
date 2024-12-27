import { useNavigate, useParams } from 'react-router-dom'

import { ErrorMessage } from '@/components/view/ErrorMessage'
import { ThumbIcon } from '@/components/view/icons/ActiveIcon'
import { InputGroup } from '@/components/view/inputGroup'
import { Kebab } from '@/components/view/Kebab'
import { Loading } from '@/components/view/Loading'
import { ModalDelete } from '@/components/view/modal/Modal'
import { SubHeaderWithIcon } from '@/components/view/SubHeader'
import { useBoolean } from '@/hooks/useBoolean'
import { useToggle } from '@/hooks/useToggle'
import { useProjectDelete, useProjectDetail } from '@/services/useProjectService'
import { formatDate } from '@/utils/formatDate'

export const ProjectDetail = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [isKebabOpen, toggleKebabState] = useToggle(false)
  const [isModalOpen, openModal, closeModal] = useBoolean(false)
  const { project, loading, error } = useProjectDetail(id)
  const { handleDelete: onDelete, error: deleteError } = useProjectDelete()

  const handleEdit = () => {
    if (id) navigate(`/project/edit/${id}`)
  }

  const handleDelete = async () => {
    if (id) {
      const success = await onDelete(id)
      if (success) {
        closeModal()
        navigate('/project', { replace: true })
      }
    }
  }

  const kebabOptions = [
    { label: '수정', onClick: handleEdit },
    { label: '삭제', onClick: openModal },
  ]

  if (loading) {
    return <Loading />
  }

  if (error || deleteError || !project) {
    return <ErrorMessage>{error?.message || '해당 프로젝트가 존재하지 않습니다.'}</ErrorMessage>
  }

  const projectDetails = [
    { label: '한줄 설명', content: project.description },
    { label: '공들인 부분', content: project.painstakingPart },
    { label: '좋았던 부분', content: project.likingPart },
    { label: '아쉬운 부분', content: project.disappointingPart },
    { label: '사용한 기술들을 사용한 이유', content: project.reasonOfStack },
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
          <h4 className="font-bold">{project.title}</h4>
          <div className="flex-between items-end">
            <span className="p-xsmall text-grey-5">
              {formatDate(project.startDate, 'dotted')} - {formatDate(project.finishDate, 'dotted')}
            </span>
            <div className="flex gap-2">
              {[...Array(project.satisfaction)].map((_, index) => (
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
