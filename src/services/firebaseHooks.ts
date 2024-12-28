import { useEffect, useState } from 'react'

import { auth } from '@/firebase/firebase'
import { useAuthState } from '@/hooks/useAuthState'
import { ERROR_MESSAGE } from '@/utils/constants'

export const useItemsFetch = <T, U>(
  fetchFunction: (userId: string, activeTag: U) => Promise<T[]>,
  activeTag: U,
) => {
  const { userId, loading: authLoading } = useAuthState(auth)
  const [items, setItems] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const loadItems = async () => {
      if (authLoading || !userId) return

      setLoading(true)
      try {
        const fetchedItems = await fetchFunction(userId, activeTag)
        setItems(fetchedItems)
      } catch (err) {
        setError(err instanceof Error ? err : new Error(ERROR_MESSAGE.fetch))
      } finally {
        setLoading(false)
      }
    }

    loadItems()
  }, [authLoading, userId, activeTag])

  return { items, loading: loading || authLoading, error }
}

export const useItemCreate = <T>(createFunction: (userId: string, data: T) => Promise<string>) => {
  const { userId } = useAuthState(auth)
  const [newItemId, setNewItemId] = useState<string | null>(null)
  const [error, setError] = useState<Error | null>(null)

  const handleCreate = async (data: T) => {
    if (!userId) {
      setError(new Error(ERROR_MESSAGE.auth))
      return null
    }

    try {
      const createdItemId = await createFunction(userId, data)
      setNewItemId(createdItemId)
      return createdItemId
    } catch (err) {
      setError(err instanceof Error ? err : new Error(ERROR_MESSAGE.create))
      return null
    }
  }

  return { handleCreate, newItemId, error }
}

export const useItemDetail = <T>(
  fetchFunction: (userId: string, itemId: string) => Promise<T>,
  itemId: string | undefined,
) => {
  const { userId, loading: authLoading } = useAuthState(auth)
  const [item, setItem] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const loadItemDetail = async () => {
      if (authLoading || !userId || !itemId) return

      try {
        const itemData = await fetchFunction(userId, itemId)
        setItem(itemData)
      } catch (err) {
        setError(err instanceof Error ? err : new Error(ERROR_MESSAGE.fetch))
      } finally {
        setLoading(false)
      }
    }

    loadItemDetail()
  }, [authLoading, userId, itemId])

  return { item, setItem, loading: loading || authLoading, error }
}

export const useItemDelete = (
  deleteFunction: (userId: string, itemId: string) => Promise<void>,
) => {
  const { userId } = useAuthState(auth)
  const [error, setError] = useState<Error | null>(null)

  const handleDelete = async (itemId: string) => {
    if (!userId || !itemId) {
      setError(new Error(ERROR_MESSAGE.auth))
      return false
    }
    try {
      await deleteFunction(userId, itemId)
      return true
    } catch (err) {
      setError(err instanceof Error ? err : new Error(ERROR_MESSAGE.delete))
      return false
    }
  }

  return { handleDelete, error }
}

export const useItemUpdate = <T>(
  updateFunction: (userId: string, itemId: string, data: T) => Promise<void>,
) => {
  const { userId } = useAuthState(auth)
  const [error, setError] = useState<Error | null>(null)

  const updateItem = async (itemId: string, formData: T) => {
    if (!userId || !itemId) {
      setError(new Error(ERROR_MESSAGE.auth))
      return false
    }

    try {
      await updateFunction(userId, itemId, formData)
      return true
    } catch (err) {
      setError(err instanceof Error ? err : new Error(ERROR_MESSAGE.update))
      return false
    }
  }

  return { updateItem, error }
}

export const useItemSearch = <T, U>(
  searchFunction: (userId: string, activeTag: U, searchName: string) => Promise<T[]>,
  activeTag: U,
  searchName: string,
) => {
  const { userId, loading: authLoading } = useAuthState(auth)
  const [items, setItems] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchItems = async () => {
      if (authLoading || !userId) return

      setLoading(true)
      try {
        const fetchedItems = await searchFunction(userId, activeTag, searchName)
        setItems(fetchedItems)
      } catch (err) {
        setError(err instanceof Error ? err : new Error(ERROR_MESSAGE.fetch))
      } finally {
        setLoading(false)
      }
    }

    fetchItems()
  }, [authLoading, userId, activeTag, searchName, searchFunction])

  return { items, loading: loading || authLoading, error }
}

export const useItemBookmark = (
  toggleFunction: (userId: string, itemId: string, currentStatus: boolean) => Promise<boolean>,
  itemId: string | undefined,
) => {
  const { userId } = useAuthState(auth)
  const [error, setError] = useState<Error | null>(null)

  const handleBookmarkToggle = async (currentStatus: boolean) => {
    if (!userId || !itemId) {
      setError(new Error(ERROR_MESSAGE.auth))
      return
    }
    try {
      return await toggleFunction(userId, itemId, currentStatus)
    } catch (err) {
      setError(err instanceof Error ? err : new Error(ERROR_MESSAGE.bookmark))
    }
  }

  return { handleBookmarkToggle, error }
}
