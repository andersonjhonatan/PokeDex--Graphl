export interface PokemonSprite {
  sprites: {
    other: {
      dream_world: {
        front_default: string
      }
      home: {
        front_default: string
      }
    }
  }
}

export interface PokemonType {
  pokemon_v2_type: {
    name: string
  }
}

export interface Pokemon {
  base_experience: number
  height: number
  id: number
  name: string
  weight: number
  pokemon_v2_pokemonsprites: PokemonSprite[]
  pokemon_v2_pokemontypes: PokemonType[]
}
