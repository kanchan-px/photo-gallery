# Photo Gallery

A React photo gallery built for the Celebrare Frontend React Internship pre-screening assignment.

## Tech stack

- React (functional components and hooks only) with Vite
- Tailwind CSS for all styling
- Picsum Photos API: `https://picsum.photos/v2/list?limit=30`

## Features

- Fetches 30 photos on load, with a loading spinner and an error message
- Responsive grid: 1 column on mobile, 2 on tablet, 4 on desktop
- Real-time, case-insensitive search by author name (filters the data already fetched, with no extra API call)
- Favourite photos with a heart button, managed with `useReducer` and saved in `localStorage`
- Custom hook `useFetchPhotos` returns `photos`, `loading` and `error`
- `useCallback` for the search handler and `useMemo` for the filtered list

## Run locally

    npm install
    npm run dev

Build for production with `npm run build`.