import { useEffect, useState } from 'react'
import { FormProvider } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { InputGroup } from '@/components/view/inputGroup'
import { ModalEdit } from '@/components/view/modal/Modal'
import { SubHeaderWithoutIcon } from '@/components/view/SubHeader'
import { Tag } from '@/components/view/Tag'
import { useBoolean } from '@/hooks/useBoolean'
import { useTermForm } from '@/hooks/useForms'
import type { TermItemType, TermTagsType } from '@/types/term'
import { TERM_TAGS } from '@/utils/constants'

const mockTermEditData: TermItemType = {
  id: 0,
  term: 'DNS',
  description:
    '사용자에게 친숙한 도메인 이름을 컴퓨터가 네트워크에서 서로를 식별하는 데 사용하는 인터넷 프로토콜(IP) 주소로 변환하는 인터넷 표준 프로토콜의 구성 요소',
  tag: '네트워크',
}

export const TermEdit = () => {
  const navigate = useNavigate()
  const formMethod = useTermForm()
  const { handleSubmit, setValue } = formMethod

  const [isModalOpen, openModal, closeModal] = useBoolean(false)
  const [selectedTag, setSelectedTag] = useState<TermTagsType>(mockTermEditData.tag)

  const handleFormSubmit = () => {
    console.log('submit')
    openModal()
  }

  const handleModalConfirm = () => {
    closeModal()
    navigate(`/term/detail/${mockTermEditData.id}`, { replace: true })
  }

  const handleTagSelect = (tag: TermTagsType) => {
    setSelectedTag(tag)
    setValue('tag', tag)
  }

  useEffect(() => {
    Object.entries(mockTermEditData).forEach(([key, value]) => {
      setValue(key as keyof Omit<TermItemType, 'id'>, value as string)
    })
  }, [setValue])

  return (
    <>
      <SubHeaderWithoutIcon
        type="complete"
        title="용어 수정"
        onClickText={handleSubmit(handleFormSubmit)}
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
                    onClick={() => handleTagSelect(tag)}
                  >
                    {tag}
                  </Tag>
                ))}
              </div>
            </InputGroup>
          </form>
        </FormProvider>
      </main>

      {isModalOpen && (
        <ModalEdit isOpen={isModalOpen} closeModal={closeModal} onClick={handleModalConfirm} />
      )}
    </>
  )
}
