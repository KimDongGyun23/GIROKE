import { useEffect, useState } from 'react'

import type { TermFormType, TermItemType, TermTagsType } from '@/types/term'

import { createTerm, fetchTerms } from './termService'

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
        setError(err instanceof Error ? err : new Error('예상치 못한 오류 발생'))
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
      setError(error instanceof Error ? error : new Error('예상치 못한 오류 발생'))
      throw error
    }
  }

  return { createTerm: handleCreateTerm, newTermId, error }
}
