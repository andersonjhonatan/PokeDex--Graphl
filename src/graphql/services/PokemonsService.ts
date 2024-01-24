import client from '../ApolloClient'
import { GET_All_POKEMONS, GET_POKEMON_BY_NAME } from '../queries/PokemonQueries'

class PokemonService {
  async getAllPokemons() {
    try {
      const response = await client.query({
        query: GET_All_POKEMONS,
      })

      const { data, errors } = response

      if (errors) {
        console.error('GraphQL Errors:', errors)
        throw new Error('Error in GraphQL query')
      }

      const pokemons = data?.pokemon_v2_pokedex || []
      return { loading: false, error: null, pokemons }
    } catch (error) {
      console.error('Error:', error)
      return { loading: false, error, pokemons: [] }
    }
  }

  async getPokemonByName(name: string) {
    try {
      const response = await client.query({
        query: GET_POKEMON_BY_NAME,
        variables: {
          name,
        },
      })

      const { data, errors } = response

      console.log(data)

      if (errors) {
        console.error('GraphQL Errors:', errors)
        throw new Error('Error in GraphQL query')
      }

      const pokemon = data?.pokemon_v2_pokemon[0] || []

      return { loading: false, error: null, pokemon }
    } catch (error) {
      console.error('Error:', error)
      return { loading: false, error, pokemon: [] }
    }
  }

  async getPokemonById(id: number) {
    try {
      const response = await client.query({
        query: GET_POKEMON_BY_NAME,
        variables: {
          id,
        },
      })

      const { data, errors } = response

      if (errors) {
        console.error('GraphQL Errors:', errors)
        throw new Error('Error in GraphQL query')
      }
      const pokemon = data?.pokemon_v2_pokemon[0] || []

      return { loading: false, error: null, pokemon }
    } catch (error) {
      console.error('Error:', error)
      return { loading: false, error, pokemon: [] }
    }
  }
}

export default new PokemonService()
