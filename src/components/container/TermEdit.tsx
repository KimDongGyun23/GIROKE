import { useEffect, useState } from 'react'
import { FormProvider } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { useBoolean } from '@/hooks/useBoolean'
import { useTermForm } from '@/hooks/useForms'
import type { TermTagsType } from '@/types/term'
import { TERM_TAGS } from '@/utils/constants'

import { InputGroup } from '../view/inputGroup'
import { ModalEdit } from '../view/modal/Modal'
import { SubHeaderWithoutIcon } from '../view/SubHeader'
import { Tag } from '../view/Tag'

type TermEditData = {
  id: number
  name: string
  description: string
  tag: TermTagsType
}

const termEditData: TermEditData = {
  id: 0,
  name: 'DNS',
  description:
    '사용자에게 친숙한 도메인 이름을 컴퓨터가 네트워크에서 서로를 식별하는 데 사용하는 인터넷 프로토콜(IP) 주소로 변환하는 인터넷 표준 프로토콜의 구성 요소',
  tag: '네트워크',
}

export const TermEdit = () => {
  const navigate = useNavigate()
  const formMethod = useTermForm()

  const { id, name, description, tag } = termEditData
  const { handleSubmit, setValue } = formMethod

  const [modalState, openModal, closeModal] = useBoolean(false)
  const [selectedTag, setSelectedTag] = useState<TermTagsType>(tag)

  const handleSubmitTermForm = () => {
    console.log('submit')
    openModal()
  }

  const handleClickModalButton = () => {
    closeModal()
    navigate(`/term/detail/${id}`, { replace: true })
  }

  useEffect(() => {
    setValue('name', name)
    setValue('tag', tag)
    setValue('description', description)
  }, [])

  return (
    <>
      <SubHeaderWithoutIcon
        type="complete"
        title="용어 수정"
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
        <ModalEdit isOpen={modalState} closeModal={closeModal} onClick={handleClickModalButton} />
      )}
    </>
  )
}
