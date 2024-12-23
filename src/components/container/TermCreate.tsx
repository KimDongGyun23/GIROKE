import { useState } from 'react'
import { FormProvider } from 'react-hook-form'

import { useTermForm } from '@/hooks/useForms'
import type { CSSubjectType } from '@/types/common'
import { CS_SUBJECT } from '@/utils/constants'

import { InputGroup } from '../view/inputGroup'
import { SubHeaderWithoutIcon } from '../view/SubHeader'
import { Tag } from '../view/Tag'

export const TermCreate = () => {
  const formMethod = useTermForm()
  const { handleSubmit, setValue } = formMethod
  const [selectedSubject, setSelectedSubject] = useState<CSSubjectType | null>(null)

  const handleSubmitTermForm = () => {
    console.log('submit')
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
              <InputGroup.Input section="description" placeholder="상세 설명을 입력해주세요." />
            </InputGroup>

            <InputGroup>
              <div className="flex-between items-end">
                <InputGroup.Label section="tag">태그 선택</InputGroup.Label>
                <p className="p-xsmall text-grey-6">* 최대 2개 선택 가능</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {CS_SUBJECT.map((subject: CSSubjectType) => (
                  <Tag
                    key={subject}
                    secondary={subject !== selectedSubject}
                    onClick={() => {
                      setSelectedSubject(subject)
                      setValue('tag', subject)
                    }}
                  >
                    {subject}
                  </Tag>
                ))}
              </div>
            </InputGroup>
          </form>
        </FormProvider>
      </main>
    </>
  )
}
