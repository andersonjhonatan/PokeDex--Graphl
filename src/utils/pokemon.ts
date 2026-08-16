import { Pokemon } from '../interface/IPokemon'

export const getPokemonImage = (pokemon?: Pokemon | null) => {
  const sprites = pokemon?.pokemon_v2_pokemonsprites?.[0]?.sprites?.other
  return sprites?.dream_world?.front_default || sprites?.home?.front_default || ''
}

export const formatPokemonId = (id: number) => `#${String(id).padStart(3, '0')}`

export const formatMeasure = (value: number, divisor = 10) => (value / divisor).toFixed(1)

export const pokemonHasType = (pokemon: Pokemon, type: string) =>
  !type || pokemon.pokemon_v2_pokemontypes.some((item) => item.pokemon_v2_type.name === type)

export const pokemonHasAbility = (pokemon: Pokemon, ability: string) =>
  !ability || pokemon.pokemon_v2_pokemonabilities.some((item) => item.pokemon_v2_ability.name === ability)
