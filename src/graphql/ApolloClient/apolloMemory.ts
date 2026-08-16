import { makeVar } from '@apollo/client'

export const pokemonIDVar = makeVar<number>(0)
export const pokemonFavoriteVar = makeVar<number[]>([])
