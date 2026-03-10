import { create } from 'zustand'

interface FavoriteState {
  favoriteIds: string []
  setFavorite: (ids: string[]) => void
  toggleFavorite: (id: string) => void
  isFavorite: (id: string) => boolean
}

export const useFavoriteStore = create<FavoriteState>((set,get ) => ({
  favoriteIds: [],
  setFavorite: (ids) => set({ favoriteIds: ids }),
  toggleFavorite: (id) => {
    const { favoriteIds } = get()
    const isFavorite = favoriteIds.includes(id)
    if (isFavorite) {
      set({ favoriteIds: favoriteIds.filter((favId: string) => favId !== id) })
    } else {
      set({ favoriteIds: [...favoriteIds, id] })
    }
  },
  isFavorite: (id) => get().favoriteIds.includes(id),
}))

