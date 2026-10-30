import { useState, useEffect } from 'react'
import { loadUserData, saveUserData } from './auth.js'

// Works like useState, but the value is loaded from and saved to
// localStorage under the logged-in student's id.
function useUserData(userId, key, fallback) {
  const [value, setValue] = useState(() => loadUserData(userId, key, fallback))

  useEffect(() => {
    saveUserData(userId, key, value)
  }, [userId, key, value])

  return [value, setValue]
}

export default useUserData
