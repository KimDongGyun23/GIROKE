import { useEffect, useState } from 'react'

import { auth } from '@/firebase/firebase'
import { useAuthState } from '@/hooks/useAuthState'
import { fetchBookmarkedNotes, fetchBookmarkedTerms } from '@/services/bookmarkService'
import type { NoteItemType, NoteTagType } from '@/types/note'
import type { TermItemType, TermTagsType } from '@/types/term'
import { ERROR_MESSAGE } from '@/utils/constants'

const useBookmarkedItems = <
  T extends NoteItemType | TermItemType,
  U extends NoteTagType | TermTagsType,
>(
  activeTag: U,
  fetchFunction: (userId: string, activeTag: U) => Promise<T[]>,
) => {
  const { userId, loading: authLoading } = useAuthState(auth)
  const [bookmarkedItems, setBookmarkedItems] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const loadBookmarkedItems = async () => {
      if (authLoading || !userId) return

      setLoading(true)
      try {
        const items = await fetchFunction(userId, activeTag)
        setBookmarkedItems(items)
      } catch (err) {
        setError(err instanceof Error ? err : new Error(ERROR_MESSAGE.fetch))
      } finally {
        setLoading(false)
      }
    }

    loadBookmarkedItems()
  }, [authLoading, userId, activeTag, fetchFunction])

  return { bookmarkedItems, loading: loading || authLoading, error }
}

export const useBookmarkedTerms = (activeTag: TermTagsType) => {
  const { bookmarkedItems, loading, error } = useBookmarkedItems<TermItemType, TermTagsType>(
    activeTag,
    fetchBookmarkedTerms,
  )
  return { bookmarkedTerms: bookmarkedItems, loading, error }
}

export const useBookmarkedNotes = (activeTag: NoteTagType) => {
  const { bookmarkedItems, loading, error } = useBookmarkedItems<NoteItemType, NoteTagType>(
    activeTag,
    fetchBookmarkedNotes,
  )
  return { bookmarkedNotes: bookmarkedItems, loading, error }
}
