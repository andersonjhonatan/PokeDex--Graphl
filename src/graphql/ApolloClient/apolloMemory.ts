import { InMemoryCache, makeVar } from '@apollo/client'



const pokemonDataVar = makeVar(null)
const pokemonIDVar= makeVar<number>(0)

export { pokemonDataVar, pokemonIDVar }

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
      },
    },
  },
})
