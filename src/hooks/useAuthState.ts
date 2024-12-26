import { useEffect, useState } from 'react'
import type { Auth } from 'firebase/auth'
import { onAuthStateChanged } from 'firebase/auth'

export const useAuthState = (auth: Auth) => {
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid)
      } else {
        setUserId(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [auth])

  return { loading, userId }
}
