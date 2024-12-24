import { useState } from 'react'
import { FormProvider } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { InputGroup } from '@/components/view/inputGroup'
import { ModalCreate } from '@/components/view/modal/Modal'
import { SubHeaderWithoutIcon } from '@/components/view/SubHeader'
import { Tag } from '@/components/view/Tag'
import { useBoolean } from '@/hooks/useBoolean'
import { useTermForm } from '@/hooks/useForms'
import type { TermTagsType } from '@/types/term'
import { TERM_TAGS } from '@/utils/constants'

export const TermCreate = () => {
  const navigate = useNavigate()
  const formMethod = useTermForm()
  const { handleSubmit, setValue } = formMethod
  const [selectedTag, setSelectedTag] = useState<TermTagsType | null>(null)
  const [modalState, openModal, closeModal] = useBoolean(false)

  const handleSubmitTermForm = () => {
    console.log('submit')
    openModal()
  }

  const handleClickModalButton = () => {
    closeModal()
    navigate('/term/detail/0', { replace: true })
  }

  return (
    <>
      <SubHeaderWithoutIcon
        type="complete"
        title="용어 추가"
        onClickText={handleSubmit(handleSubmitTermForm)}
      />

      <main className="scroll mx-4 py-5">
        <FormProvider {...formMethod}>
          <form className="flex-column gap-5">
            <InputGroup>
              <InputGroup.Label section="name">용어 이름</InputGroup.Label>
              <InputGroup.Input section="name" placeholder="용어 이름을 입력해주세요." />
            </InputGroup>

            <InputGroup>
              <InputGroup.Label section="description">상세 설명</InputGroup.Label>
              <InputGroup.TextArea section="description" placeholder="상세 설명을 입력해주세요." />
            </InputGroup>

            <InputGroup>
              <div className="flex-between items-end">
                <InputGroup.Label section="tag">태그 선택</InputGroup.Label>
                <p className="p-xsmall text-grey-6">* 최대 2개 선택 가능</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {TERM_TAGS.slice(1).map((tag: TermTagsType) => (
                  <Tag
                    key={tag}
                    secondary={tag !== selectedTag}
                    onClick={() => {
                      setSelectedTag(tag)
                      setValue('tag', tag)
                    }}
                  >
                    {tag}
                  </Tag>
                ))}
              </div>
            </InputGroup>
          </form>
        </FormProvider>
      </main>

      {modalState && (
        <ModalCreate isOpen={modalState} closeModal={closeModal} onClick={handleClickModalButton} />
      )}
    </>
  )
}
