import { useEffect, useState } from 'react'

import { auth } from '@/firebase/firebase'
import { useAuthState } from '@/hooks/useAuthState'
import {
  createNote,
  deleteNote,
  fetchNoteData,
  fetchNoteDetail,
  fetchNotes,
  searchNotes,
  toggleNoteBookmark,
  updateNoteData,
} from '@/services/noteService'
import type { NotedDetailType, NoteFormType, NoteItemType, NoteTagType } from '@/types/note'
import { ERROR_MESSAGE } from '@/utils/constants'

export const useNotes = (activeTag: NoteTagType) => {
  const { userId, loading: authLoading } = useAuthState(auth)
  const [notes, setNotes] = useState<NoteItemType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const loadNotes = async () => {
      if (authLoading || !userId) return

      setLoading(true)
      try {
        const fetchedNotes = await fetchNotes(userId, activeTag)
        setNotes(fetchedNotes)
      } catch (err) {
        setError(err instanceof Error ? err : new Error(ERROR_MESSAGE.fetch))
      } finally {
        setLoading(false)
      }
    }

    loadNotes()
  }, [authLoading, userId, activeTag])

  return { notes, loading: loading || authLoading, error }
}

export const useNoteCreate = () => {
  const { userId } = useAuthState(auth)
  const [newNoteId, setNewNoteId] = useState<string | null>(null)
  const [error, setError] = useState<Error | null>(null)

  const handleCreateNote = async (data: NoteFormType, selectedTag: NoteTagType) => {
    if (!userId) {
      setError(new Error(ERROR_MESSAGE.auth))
      return null
    }

    try {
      const createdNoteId = await createNote(userId, data, selectedTag)
      setNewNoteId(createdNoteId)
      return createdNoteId
    } catch (err) {
      setError(err instanceof Error ? err : new Error(ERROR_MESSAGE.create))
      return null
    }
  }

  return { handleCreateNote, newNoteId, error }
}

export const useNoteData = (noteId: string | undefined) => {
  const { userId, loading: authLoading } = useAuthState(auth)
  const [note, setNote] = useState<NotedDetailType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const loadNoteDetail = async () => {
      if (authLoading || !userId || !noteId) return

      try {
        const noteData = await fetchNoteDetail(userId, noteId)
        setNote(noteData)
      } catch (err) {
        setError(err instanceof Error ? err : new Error(ERROR_MESSAGE.fetch))
      } finally {
        setLoading(false)
      }
    }

    loadNoteDetail()
  }, [authLoading, userId, noteId])

  return { note, setNote, loading: loading || authLoading, error }
}

export const useNoteDelete = (noteId: string | undefined) => {
  const { userId } = useAuthState(auth)
  const [error, setError] = useState<Error | null>(null)

  const handleDelete = async () => {
    if (!userId || !noteId) {
      setError(new Error(ERROR_MESSAGE.auth))
      return false
    }
    try {
      await deleteNote(userId, noteId)
      return true
    } catch (err) {
      setError(err instanceof Error ? err : new Error(ERROR_MESSAGE.delete))
      return false
    }
  }

  return { handleDelete, error }
}

export const useNoteBookmark = (noteId: string | undefined) => {
  const { userId } = useAuthState(auth)
  const [error, setError] = useState<Error | null>(null)

  const handleBookmarkToggle = async (currentStatus: boolean) => {
    if (!userId || !noteId) {
      setError(new Error(ERROR_MESSAGE.auth))
      return
    }
    try {
      return await toggleNoteBookmark(userId, noteId, currentStatus)
    } catch (err) {
      setError(err instanceof Error ? err : new Error(ERROR_MESSAGE.bookmark))
    }
  }

  return { handleBookmarkToggle, error }
}

export const useNoteEditData = (noteId: string | undefined) => {
  const { userId, loading: authLoading } = useAuthState(auth)
  const [noteData, setNoteData] = useState<NoteFormType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const loadNoteData = async () => {
      if (authLoading || !userId || !noteId) return

      try {
        const data = await fetchNoteData(userId, noteId)
        setNoteData(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error(ERROR_MESSAGE.fetch))
      } finally {
        setLoading(false)
      }
    }

    loadNoteData()
  }, [authLoading, userId, noteId])

  return { noteData, loading: loading || authLoading, error }
}

export const useNoteEdit = (noteId: string | undefined) => {
  const { userId } = useAuthState(auth)
  const [error, setError] = useState<Error | null>(null)

  const updateNote = async (formData: NoteFormType) => {
    if (!userId || !noteId) {
      setError(new Error(ERROR_MESSAGE.auth))
      return false
    }

    try {
      await updateNoteData(userId, noteId, formData)
      return true
    } catch (err) {
      setError(err instanceof Error ? err : new Error(ERROR_MESSAGE.update))
      return false
    }
  }

  return { updateNote, error }
}

export const useNoteSearch = (activeTag: NoteTagType, searchName: string) => {
  const { userId, loading: authLoading } = useAuthState(auth)
  const [notes, setNotes] = useState<NoteItemType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchNotes = async () => {
      if (authLoading || !userId) return

      setLoading(true)
      try {
        const fetchedNotes = await searchNotes(userId, activeTag, searchName)
        setNotes(fetchedNotes)
      } catch (err) {
        setError(err instanceof Error ? err : new Error(ERROR_MESSAGE.fetch))
      } finally {
        setLoading(false)
      }
    }

    fetchNotes()
  }, [authLoading, userId, activeTag, searchName])

  return { notes, loading: loading || authLoading, error }
}
