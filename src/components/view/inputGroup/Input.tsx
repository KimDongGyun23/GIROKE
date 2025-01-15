import { type InputHTMLAttributes, useContext } from 'react'
import { useFormContext } from 'react-hook-form'

import { useToggle } from '@/hooks/useToggle'

import { InputGroupContext } from '.'

export const Input = ({
  type = 'text',
  readOnly = false,
  placeholder,
}: InputHTMLAttributes<HTMLInputElement>) => {
  const { register } = useFormContext()
  const section = useContext(InputGroupContext)
  const isPasswordField = type === 'password'
  const [isVisible, toggleVisibility] = useToggle(false)

  return (
    <div className="flex-align w-full gap-3 rounded-lg border border-black-300 px-4 py-[10px]">
      <input
        type={isPasswordField && !isVisible ? 'password' : type}
        {...register(section)}
        readOnly={readOnly}
        className="p-700 w-full py-1 text-black-500 placeholder:text-black-300 focus:outline-none"
        placeholder={placeholder}
        autoComplete={type === 'id' ? 'username' : isPasswordField ? 'current-password' : 'off'}
      />
      {isPasswordField && !readOnly && (
        <button type="button" className="shrink-0" onClick={toggleVisibility}>
          {isVisible ? <div>비밀번호 보기</div> : <div>비밀번호 가리기</div>}
        </button>
      )}
    </div>
  )
}

export const TextArea = ({
  readOnly = false,
  placeholder,
}: InputHTMLAttributes<HTMLTextAreaElement>) => {
  const { register } = useFormContext()
  const section = useContext(InputGroupContext)

  return (
    <textarea
      {...register(section)}
      readOnly={readOnly}
      className="p-700 h-[104px] resize-none rounded-lg border border-black-300 px-4 py-[10px] text-black-500 placeholder:text-black-300 focus:outline-none"
      placeholder={placeholder}
    />
  )
}
