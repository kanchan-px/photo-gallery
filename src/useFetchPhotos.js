import { useState, useEffect } from 'react'

const API_URL = 'https://picsum.photos/v2/list?limit=30'

function useFetchPhotos() {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    async function fetchPhotos() {
      try {
        const response = await fetch(API_URL, { signal: controller.signal })

        if (!response.ok) {
          throw new Error(`Server responded with status ${response.status}`)
        }

        const data = await response.json()
        setPhotos(data)
      } catch (err) {
        if (err.name === 'AbortError') return
        setError(`Could not load photos. ${err.message}`)
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    fetchPhotos()

    return () => controller.abort()
  }, [])

  return { photos, loading, error }
}

export default useFetchPhotos