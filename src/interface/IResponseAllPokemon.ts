import { Pokemon } from "./IPokemon"

export interface ResponseAllPokemons {
  loading: boolean
  error: unknown
  pokemons: Pokemon[] | null
}