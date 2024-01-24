import { gql } from '@apollo/client'


const GET_All_POKEMONS = gql`
  query GetAllPokemons($offset: Int, $limit: Int, $orderBy: [pokemon_v2_pokemonsprites_order_by!]) {
    pokemon_v2_pokemon {
      order
      name
      is_default
      id
      height
      base_experience
      weight
      pokemon_v2_pokemonsprites(offset: $offset, limit: $limit, order_by: $orderBy) {
        sprites
      }
    }
  }
`

export default GET_All_POKEMONS
