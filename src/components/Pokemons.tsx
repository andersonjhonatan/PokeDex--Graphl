import { useEffect, useState } from 'react'
import GET_All_POKEMONS from '../graphql/queries/PokemonQueries'
import { useQuery } from '@apollo/client'
import { Pokemon } from '../interface/IPokemon'

const Pokemons = () => {
  const [pokemons, setPokemons] = useState([])
  const { data, loading, error } = useQuery(GET_All_POKEMONS, {
    variables: {
      limit: 9,
      offset: 0,
    },
  })

  useEffect(() => {
    const fetchData = async () => {
      if (error) {
        console.error('GraphQL Errors:', error)
        return
      }

      if (loading) {
        return <div>Loading...</div>
      }

      try {
        const result = data?.pokemon_v2_pokemon || []
        setPokemons(result)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [error, loading, data])

  const GetPhotoPokemons = (photo: string, photo2?: string) => {
    return <img alt="pokemon" className="h-16 w-16" src={photo || photo2} />
  }

  return (
    <div>
      <div className=" flex flex-col justify-between max-w-6xl mx-auto">
        <div className="grid grid-cols-3 gap-9 w-full place-items-center ">
          {pokemons.map((pokemon: Pokemon) => (
            <div
              key={pokemon.id}
              className="border p-4 h-48 w-60 bg-white shadow-md shadow-slate-300 rounded-3xl justify-center flex flex-col items-center"
            >
              {GetPhotoPokemons(
                pokemon.pokemon_v2_pokemonsprites[0].sprites.other.dream_world
                  .front_default, pokemon.pokemon_v2_pokemonsprites[0].sprites.other.home.front_default
              )}
              <h1 className="text-md font-bold">{pokemon.name.toUpperCase()}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Pokemons
