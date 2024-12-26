import { useEffect, useState } from 'react'

import type { TermItemType, TermTagsType } from '@/types/term'

import { fetchTerms } from './termService'

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
