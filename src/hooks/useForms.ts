import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import type { NoteFormType } from '@/types/note'
import type { ProjectFormType } from '@/types/project'
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

const projectSchema = z.object({
  title: z.string().min(1, { message: '프로젝트 이름을 입력해주세요.' }),
  description: z.string().min(1, { message: '상세 설명을 입력해주세요.' }),
  startDate: z.string().min(1, { message: '시작 날짜를 입력해주세요.' }),
  finishDate: z.string().min(1, { message: '종료 날짜를 입력해주세요.' }),
  satisfaction: z
    .number()
    .optional()
    .refine((val) => val && val > 0, {
      message: '만족도를 선택해주세요.',
    }),
  painstakingPart: z.string().min(1, { message: '공들인 부분을 입력해주세요.' }),
  likingPart: z.string().min(1, { message: '좋았던 부분을 입력해주세요.' }),
  disappointingPart: z.string().min(1, { message: '아쉬운 부분을 입력해주세요.' }),
  reasonOfStack: z.string().min(1, { message: '기술 스택을 사용한 이유를 입력해주세요.' }),
})

export const useProjectForm = () => {
  const formMethod = useForm<ProjectFormType>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(projectSchema),
  })

  return formMethod
}

const noteSchema = z.object({
  title: z.string().min(1, { message: '노트 제목을 입력해주세요.' }),
  paragraphs: z.array(
    z.object({
      subTitle: z.string().min(1, { message: '단락 제목을 입력해주세요.' }),
      content: z.string().min(1, { message: '단락 내용을 입력해주세요.' }),
    }),
  ),
})

export const useNoteForm = () => {
  const formMethod = useForm<NoteFormType>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(noteSchema),
  })

  return formMethod
}
