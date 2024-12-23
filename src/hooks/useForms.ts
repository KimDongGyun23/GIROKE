import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import type { TermFormType } from '@/types/term'

const termSchema = z.object({
  name: z.string().min(1, { message: '용어 이름을 입력해주세요.' }),
  description: z.string().min(1, { message: '상세 설명을 입력해주세요.' }),
  tag: z
    .string()
    .optional()
    .refine((val) => val && val.length > 0, {
      message: '태그를 선택해주세요.',
    }),
})

export const useTermForm = () => {
  const formMethod = useForm<TermFormType>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(termSchema),
  })

  return formMethod
}
