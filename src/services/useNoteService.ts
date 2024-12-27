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
        setError(
          err instanceof Error ? err : new Error('노트 목록을 가져오는 중에 오류가 발생했습니다.'),
        )
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
      setError(new Error('사용자가 인증되지 않았습니다.'))
      return null
    }

    try {
      const createdNoteId = await createNote(userId, data, selectedTag)
      setNewNoteId(createdNoteId)
      return createdNoteId
    } catch (err) {
      setError(err instanceof Error ? err : new Error('노트 생성 중에 오류가 발생했습니다.'))
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
        setError(
          err instanceof Error ? err : new Error('노트를 가져오는 중에 오류가 발생했습니다.'),
        )
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
      setError(new Error('사용자가 인증되지 않았거나 NoteID가 없습니다.'))
      return false
    }
    try {
      await deleteNote(userId, noteId)
      return true
    } catch (err) {
      setError(err instanceof Error ? err : new Error('노트를 삭제하는 중에 오류가 발생했습니다.'))
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
      setError(new Error('사용자가 인증되지 않았거나 NoteID가 없습니다.'))
      return
    }
    try {
      return await toggleNoteBookmark(userId, noteId, currentStatus)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('북마킹 중에 오류가 발생했습니다.'))
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
        setError(
          err instanceof Error ? err : new Error('노트를 가져오는 중에 오류가 발생했습니다.'),
        )
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
      setError(new Error('사용자가 인증되지 않았거나 NoteID가 없습니다.'))
      return false
    }

    try {
      await updateNoteData(userId, noteId, formData)
      return true
    } catch (err) {
      setError(err instanceof Error ? err : new Error('업데이트 중에 오류가 발생했습니다.'))
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
        setError(
          err instanceof Error ? err : new Error('데이터를 불러오는 중에 오류가 발생했습니다.'),
        )
      } finally {
        setLoading(false)
      }
    }

    fetchNotes()
  }, [authLoading, userId, activeTag, searchName])

  return { notes, loading: loading || authLoading, error }
}