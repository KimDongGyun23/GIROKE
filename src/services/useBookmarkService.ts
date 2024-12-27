import { useEffect, useState } from 'react'

import { auth } from '@/firebase/firebase'
import { useAuthState } from '@/hooks/useAuthState'
import { fetchBookmarkedNotes, fetchBookmarkedTerms } from '@/services/bookmarkService'
import type { NoteItemType, NoteTagType } from '@/types/note'
import type { TermItemType, TermTagsType } from '@/types/term'
import { ERROR_MESSAGE } from '@/utils/constants'

export const useBookmarkedTerms = (activeTag: TermTagsType) => {
  const { userId, loading: authLoading } = useAuthState(auth)
  const [bookmarkedTerms, setBookmarkedTerms] = useState<TermItemType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const loadBookmarkedTerms = async () => {
      if (authLoading || !userId) return

      setLoading(true)
      try {
        const terms = await fetchBookmarkedTerms(userId, activeTag)
        setBookmarkedTerms(terms)
      } catch (err) {
        setError(err instanceof Error ? err : new Error(ERROR_MESSAGE.fetch))
      } finally {
        setLoading(false)
      }
    }

    loadBookmarkedTerms()
  }, [authLoading, userId, activeTag])

  return { bookmarkedTerms, loading: loading || authLoading, error }
}

export const useBookmarkedNotes = (activeTag: NoteTagType) => {
  const { userId, loading: authLoading } = useAuthState(auth)
  const [bookmarkedNotes, setBookmarkedNotes] = useState<NoteItemType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const loadBookmarkedNotes = async () => {
      if (authLoading || !userId) return

      setLoading(true)
      try {
        const notes = await fetchBookmarkedNotes(userId, activeTag)
        setBookmarkedNotes(notes)
      } catch (err) {
        setError(err instanceof Error ? err : new Error(ERROR_MESSAGE.fetch))
      } finally {
        setLoading(false)
      }
    }

    loadBookmarkedNotes()
  }, [authLoading, userId, activeTag])

  return { bookmarkedNotes, loading: loading || authLoading, error }
}
