import { useState, useCallback, useMemo, useReducer, useEffect } from 'react'
import useFetchPhotos from './useFetchPhotos'
import PhotoCard from './PhotoCard'
import {
  favouritesReducer,
  loadFavourites,
  saveFavourites,
} from './favouritesReducer'

function Gallery() {
  const { photos, loading, error } = useFetchPhotos()
  const [query, setQuery] = useState('')
  const [favourites, dispatch] = useReducer(
    favouritesReducer,
    [],
    loadFavourites
  )

  useEffect(() => {
    saveFavourites(favourites)
  }, [favourites])

  const handleSearchChange = useCallback((e) => {
    setQuery(e.target.value)
  }, [])

  const filteredPhotos = useMemo(() => {
    const search = query.trim().toLowerCase()
    if (!search) return photos
    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(search)
    )
  }, [photos, query])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
      </div>
    )
  }

  if (error) {
    return (
      <p className="p-6 text-center text-red-600 font-medium">{error}</p>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Photo Gallery</h1>

      <input
        type="text"
        value={query}
        onChange={handleSearchChange}
        placeholder="Search by author..."
        className="w-full mb-6 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {filteredPhotos.length === 0 ? (
        <p className="text-center text-gray-600">No photos match your search.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredPhotos.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              isFavourite={favourites.includes(photo.id)}
              onToggleFavourite={(id) =>
                dispatch({ type: 'TOGGLE_FAVOURITE', id })
              }
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Gallery