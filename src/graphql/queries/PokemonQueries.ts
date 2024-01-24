import { gql } from '@apollo/client'


const GET_All_POKEMONS = gql`
  query GetAllPokemons($limit: Int, $offset: Int, $orderBy: [pokemon_v2_pokemon_order_by!])  {
    pokemon_v2_pokemon(limit: $limit, offset: $offset, order_by: $orderBy) {
      base_experience
      height
      id
      name
      weight
    }
  }
`

export default GET_All_POKEMONS
