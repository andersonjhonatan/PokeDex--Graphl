import { pokemonFavoriteVar } from '../graphql/ApolloClient/apolloMemory'

const FAVORITES_KEY = 'ash-do-codigo:favorites'

export const hydrateFavorites = () => {
  if (typeof window === 'undefined') return

  try {
    const stored = window.localStorage.getItem(FAVORITES_KEY)
    const parsed = stored ? JSON.parse(stored) : []
    pokemonFavoriteVar(Array.isArray(parsed) ? parsed.filter(Number.isInteger) : [])
  } catch {
    pokemonFavoriteVar([])
  }
}

export const toggleFavorite = (id: number) => {
  const current = pokemonFavoriteVar()
  const next = current.includes(id) ? current.filter((favoriteId) => favoriteId !== id) : [...current, id]

  pokemonFavoriteVar(next)
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(next))
  }

  return next
}
