import { gql } from '@apollo/client'

const GET_All_POKEMONS = gql`
  query GetAllPokemons(
    $offset: Int
    $limit: Int
    $pokemonOrderBy: [pokemon_v2_pokemon_order_by!]
    $pokemonSpriteOrderBy: [pokemon_v2_pokemonsprites_order_by!]
  ) {
    pokemon_v2_pokemon(limit: $limit, offset: $offset, order_by: $pokemonOrderBy) {
      order
      name
      is_default
      id
      height
      base_experience
      weight

      pokemon_v2_pokemonsprites(
        limit: $limit
        offset: $offset
        order_by: $pokemonSpriteOrderBy
      ) {
        sprites
      }
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
      pokemon_v2_pokemonabilities {
        pokemon_v2_ability {
          name
        }
      }
    }
  }
`

const GET_POKEMON_BY_NAME = gql`
  query GetPokemonByName($name: String!) {
    pokemon_v2_pokemon(where: { name: { _ilike: $name } }) {
      order
      name
      is_default
      id
      height
      base_experience
      weight

      pokemon_v2_pokemonsprites(limit: 1) {
        sprites
      }
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
      pokemon_v2_pokemonabilities {
        pokemon_v2_ability {
          name
        }
      }
    }
  }
`

const GET_POKEMON_BY_ID = gql`
  query GetPokemonById($id: Int!) {
    pokemon_v2_pokemon(where: { id: { _eq: $id } }) {
      order
      name
      is_default
      id
      height
      base_experience
      weight
      pokemon_v2_pokemonsprites(limit: 1) {
        sprites
      }
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
      pokemon_v2_pokemonabilities {
        pokemon_v2_ability {
          name
        }
      }
      pokemon_v2_pokemonspecy {
        pokemon_v2_pokemonevolutions {
          pokemon_v2_gender {
            name
          }
        }
      }
    }
  }
`

export { GET_All_POKEMONS, GET_POKEMON_BY_NAME, GET_POKEMON_BY_ID }
