import type { Dispatch, SetStateAction } from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { auth } from '@/firebase/firebase'
import { useAuthState } from '@/hooks/useAuthState'
import type { TermFormType, TermItemType, TermTagsType } from '@/types/term'

import {
  createTerm,
  deleteTerm,
  fetchTermData,
  fetchTermDetail,
  fetchTerms,
  fetchTermsByTagAndSearch,
  toggleTermBookmark,
  updateTermData,
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
  const { loading: authLoading, userId } = useAuthState(auth)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (authLoading) {
      return
    }

    if (!userId || !termId) {
      setError(new Error('유저가 존재하지 않거나 TermID가 없습니다.'))
      setLoading(false)
      return
    }

    const loadTermDetail = async () => {
      try {
        const termData = await fetchTermDetail(userId, termId)
        setTerm(termData)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('예상치 못한 오류가 발생했습니다.'))
      } finally {
        setLoading(false)
      }
    }

    loadTermDetail()
  }, [authLoading, userId, termId])

  return { term, setTerm, loading: loading || authLoading, error }
}

export const useTermDelete = (termId: string | undefined) => {
  const navigate = useNavigate()
  const { userId, loading: authLoading } = useAuthState(auth)
  const [error, setError] = useState<Error | null>(null)

  const handleDelete = async (closeModal: () => void) => {
    if (authLoading || !userId || !termId) {
      setError(new Error('유저가 존재하지 않거나 TermID가 없습니다.'))
      return
    }

    try {
      await deleteTerm(userId, termId)
      closeModal()
      navigate('/term', { replace: true })
    } catch (error) {
      setError(error instanceof Error ? error : new Error('삭제 중 오류가 발생했습니다.'))
    }
  }

  return { handleDelete, error }
}

export const useTermBookmark = (
  termId: string | undefined,
  setTerm: Dispatch<SetStateAction<TermItemType | null>>,
) => {
  const { userId, loading: authLoading } = useAuthState(auth)
  const [isBookmarked, setIsBookmarked] = useState<boolean | null>(null)
  const [error, setError] = useState<Error | null>(null)

  const handleBookmarkToggle = async (currentBookmarkStatus: boolean) => {
    if (authLoading || !termId || !userId) {
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

export const useTermData = (id: string | undefined) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [termData, setTermData] = useState<TermItemType | null>(null)

  useEffect(() => {
    const loadTermData = async () => {
      if (!id) return
      try {
        const data = await fetchTermData(id)
        setTermData(data)
      } catch (error) {
        setError(
          error instanceof Error
            ? error
            : new Error('데이터를 불러오는 과정에서 오류가 발생했습니다.'),
        )
      } finally {
        setLoading(false)
      }
    }
    loadTermData()
  }, [id])

  return { termData, loading, error }
}

export const useTermUpdate = (id: string | undefined) => {
  const [error, setError] = useState<Error | null>(null)

  const updateTerm = async (formData: Omit<TermItemType, 'id'>) => {
    if (!id) return
    try {
      await updateTermData(id, formData)
    } catch (error) {
      setError(
        error instanceof Error ? error : new Error('업데이트 하는 과정에서 오류가 발생했습니다.'),
      )
      throw error
    }
  }

  return { updateTerm, error }
}

export const useTermSearch = (activeTag: TermTagsType, searchName: string) => {
  const [terms, setTerms] = useState<TermItemType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const loadTerms = async () => {
      setLoading(true)
      setError(null)
      try {
        const fetchedTerms = await fetchTermsByTagAndSearch(activeTag, searchName)
        setTerms(fetchedTerms)
      } catch (error) {
        setError(error instanceof Error ? error : new Error('예상치 못한 오류가 발생했습니다.'))
      } finally {
        setLoading(false)
      }
    }

    loadTerms()
  }, [activeTag, searchName])

  return { terms, loading, error }
}
