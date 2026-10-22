function PhotoCard({ photo, isFavourite, onToggleFavourite }) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <img
        src={`https://picsum.photos/id/${photo.id}/400/300`}
        alt={`Photo by ${photo.author}`}
        loading="lazy"
        className="w-full aspect-4/3 object-cover"
      />
      <div className="flex items-center justify-between p-3">
        <p className="text-sm font-medium text-gray-800">{photo.author}</p>
        <button
          type="button"
          aria-label="Toggle favourite"
          aria-pressed={isFavourite}
          onClick={() => onToggleFavourite(photo.id)}
          className={`text-2xl cursor-pointer ${
            isFavourite ? 'text-red-500' : 'text-gray-400'
          }`}
        >
          {isFavourite ? '♥' : '♡'}
        </button>
      </div>
    </div>
  )
}

export default PhotoCard