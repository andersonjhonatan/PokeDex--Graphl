import { InMemoryCache, makeVar } from '@apollo/client'



const pokemonDataVar = makeVar(null)
const pokemonIDVar= makeVar<number>(0)
const pokemonFavoriteVar = makeVar<number[]>([])

export { pokemonDataVar, pokemonIDVar, pokemonFavoriteVar }

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        pokemonData: {
          read() {
            return pokemonDataVar()
          },
        },
        pokemonID: {
          read() {
            return pokemonIDVar();
          },
        },
        pokemonFavorite: {
          read() {
            return pokemonFavoriteVar();
          },
        }
      },
    },
  },
})
