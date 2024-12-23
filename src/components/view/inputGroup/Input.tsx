import { useFormContext } from 'react-hook-form'

type InputProps = {
  type?: string
  section: string
  readOnly?: boolean
  placeholder?: string
}

type TextAreaProps = Omit<InputProps, 'type'>

export const Input = ({ type = 'text', section, readOnly = false, placeholder }: InputProps) => {
  const { register } = useFormContext()

  return (
    <div className="flex-align p-medium w-full gap-3 rounded-lg border border-green-4 px-4 py-[10px]">
      <input
        type={type}
        {...register(section)}
        readOnly={readOnly}
        className="w-full py-1 text-grey-7 placeholder:text-grey-5 focus:outline-none"
        placeholder={placeholder}
      />
    </div>
  )
}

export const TextArea = ({ section, readOnly = false, placeholder }: TextAreaProps) => {
  const { register } = useFormContext()

  return (
    <textarea
      {...register(section)}
      readOnly={readOnly}
      className="p-medium h-[148px] resize-none rounded-lg border border-green-4 px-4 py-[10px] text-grey-7 placeholder:text-grey-5 focus:outline-none"
      placeholder={placeholder}
    />
  )
}
