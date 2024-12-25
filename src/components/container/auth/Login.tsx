import { useState } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { FormProvider } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import {
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from 'firebase/auth'

import { Button } from '@/components/view/Button'
import { InputGroup } from '@/components/view/inputGroup'
import { auth } from '@/firebase/firebase'
import { useLoginForm } from '@/hooks/useForms'
import type { LoginFormType } from '@/types/common'

export const Login = () => {
  const navigate = useNavigate()
  const formMethod = useLoginForm()
  const { handleSubmit } = formMethod
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleFormSubmit: SubmitHandler<LoginFormType> = (formData) => {
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        signInWithEmailAndPassword(auth, formData.id, formData.password).then(() => {
          navigate('/home', { replace: true })
          setErrorMessage(null)
        })
      })
      .catch(() => {
        setErrorMessage('* 아이디와 비밀번호를 확인해주세요.')
      })
  }

  return (
    <div className="flex-column h-full justify-center">
      <FormProvider {...formMethod}>
        <h1 className="pb-24 pt-10 text-center font-jalnan text-6xl font-bold text-green-6">
          기로케
        </h1>

        <form className="flex-column gap-20 px-4" onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="flex-column gap-4">
            <InputGroup>
              <InputGroup.Label section="id">아이디</InputGroup.Label>
              <InputGroup.Input section="id" placeholder="아이디를 입력해주세요." />
            </InputGroup>

            <InputGroup>
              <InputGroup.Label section="password">비밀번호</InputGroup.Label>
              <InputGroup.Input section="password" placeholder="비밀번호를 입력해주세요." />
            </InputGroup>
            <p className="p-small font-medium text-error">{errorMessage}</p>
          </div>

          <Button type="submit" size="md">
            로그인
          </Button>
        </form>
      </FormProvider>
    </div>
  )
}
