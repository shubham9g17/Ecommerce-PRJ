import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface WishlistStore {
  items: number[]
  addItem: (id: number) => void
  removeItem: (id: number) => void
  hasItem: (id: number) => boolean
}

export const useWishlist = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (id) => set((state) => ({
        items: state.items.includes(id) ? state.items : [...state.items, id]
      })),
      removeItem: (id) => set((state) => ({
        items: state.items.filter((item) => item !== id)
      })),
      hasItem: (id) => get().items.includes(id)
    }),
    {
      name: 'wishlist-storage',
    }
  )
)