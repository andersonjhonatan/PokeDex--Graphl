import { gql } from '@apollo/client'

const GET_ALL_POKEMONS = gql`
  query GetAllPokemons($offset: Int = 0, $limit: Int = 151) {
    pokemon_v2_pokemon(
      limit: $limit
      offset: $offset
      order_by: { id: asc }
      where: { is_default: { _eq: true } }
    ) {
      id
      name
      height
      base_experience
      weight
      pokemon_v2_pokemonsprites(limit: 1) {
        sprites
      }
      pokemon_v2_pokemontypes(order_by: { slot: asc }) {
        pokemon_v2_type {
          name
        }
      }
      pokemon_v2_pokemonabilities(order_by: { slot: asc }) {
        pokemon_v2_ability {
          name
        }
      }
    }
  }
`

const GET_POKEMON_BY_NAME = gql`
  query GetPokemonByName($name: String!) {
    pokemon_v2_pokemon(
      limit: 1
      where: { name: { _eq: $name }, is_default: { _eq: true } }
    ) {
      id
      name
      height
      base_experience
      weight
      pokemon_v2_pokemonsprites(limit: 1) {
        sprites
      }
      pokemon_v2_pokemontypes(order_by: { slot: asc }) {
        pokemon_v2_type {
          name
        }
      }
      pokemon_v2_pokemonabilities(order_by: { slot: asc }) {
        pokemon_v2_ability {
          name
        }
      }
    }
  }
`

const GET_POKEMON_BY_ID = gql`
  query GetPokemonById($id: Int!) {
    pokemon_v2_pokemon(
      limit: 1
      where: { id: { _eq: $id }, is_default: { _eq: true } }
    ) {
      id
      name
      height
      base_experience
      weight
      pokemon_v2_pokemonsprites(limit: 1) {
        sprites
      }
      pokemon_v2_pokemontypes(order_by: { slot: asc }) {
        pokemon_v2_type {
          name
        }
      }
      pokemon_v2_pokemonabilities(order_by: { slot: asc }) {
        pokemon_v2_ability {
          name
        }
      }
    }
  }
`

export { GET_ALL_POKEMONS, GET_POKEMON_BY_NAME, GET_POKEMON_BY_ID }
