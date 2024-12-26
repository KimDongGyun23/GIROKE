import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import type { TermFormType, TermItemType, TermTagsType } from '@/types/term'

import {
  createTerm,
  deleteTerm,
  fetchTermDetail,
  fetchTerms,
  toggleTermBookmark,
} from './termService'

export const useTerms = (userId: string | null, activeTag: TermTagsType) => {
  const [terms, setTerms] = useState<TermItemType[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!userId) return

    const loadTerms = async () => {
      setLoading(true)
      setError(null)
      try {
        const fetchedTerms = await fetchTerms(userId, activeTag)
        setTerms(fetchedTerms)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('예상치 못한 오류가 발생했습니다.'))
      } finally {
        setLoading(false)
      }
    }

    loadTerms()
  }, [userId, activeTag])

  return { terms, loading, error }
}

export const useTermCreate = () => {
  const [newTermId, setNewTermId] = useState<string | null>(null)
  const [error, setError] = useState<Error | null>(null)

  const handleCreateTerm = async (formData: TermFormType) => {
    try {
      const createdTermId = await createTerm(formData)
      setNewTermId(createdTermId)
      setError(null)
      return createdTermId
    } catch (error) {
      setError(error instanceof Error ? error : new Error('예상치 못한 오류가 발생했습니다.'))
      throw error
    }
  }

  return { createTerm: handleCreateTerm, newTermId, error }
}

export function useTermDetail(termId: string | undefined) {
  const [term, setTerm] = useState<TermItemType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!termId) {
      setError(new Error('TermID가 없습니다.'))
      setLoading(false)
      return
    }

    const loadTermDetail = async () => {
      try {
        const termData = await fetchTermDetail(termId)
        setTerm(termData)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('예상치 못한 오류가 발생했습니다.'))
      } finally {
        setLoading(false)
      }
    }

    loadTermDetail()
  }, [termId])

  return { term, setTerm, loading, error }
}

export const useTermDelete = (userId: string | null, termId: string | undefined) => {
  const navigate = useNavigate()
  const [error, setError] = useState<Error | null>(null)

  const handleDelete = async (closeModal: () => void) => {
    if (!userId || !termId) {
      setError(new Error('유저가 존재하지 않거나 TermID가 없습니다.'))
      return
    }

    await deleteTerm(userId, termId)
    closeModal()
    navigate('/term', { replace: true })
  }

  return { handleDelete, error }
}

export const useTermBookmark = (
  userId: string | null,
  termId: string | undefined,
  setTerm: React.Dispatch<React.SetStateAction<TermItemType | null>>,
) => {
  const [isBookmarked, setIsBookmarked] = useState<boolean | null>(null)
  const [error, setError] = useState<Error | null>(null)

  const handleBookmarkToggle = async (currentBookmarkStatus: boolean) => {
    if (!termId || !userId) {
      setError(new Error('유저가 존재하지 않거나 TermID가 없습니다.'))
      return
    }

    try {
      const newBookmarkStatus = await toggleTermBookmark(userId, termId, currentBookmarkStatus)
      setIsBookmarked(newBookmarkStatus)

      setTerm((prevTerm) => {
        if (!prevTerm) return null
        return {
          ...prevTerm,
          isBookmarked: newBookmarkStatus,
        }
      })

      return newBookmarkStatus
    } catch {
      setError(new Error('북마킹 과정에서 오류가 발생했습니다.'))
      return null
    }
  }

  return { isBookmarked, handleBookmarkToggle, error }
}
