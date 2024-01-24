import { useEffect, useState } from 'react'
import GET_All_POKEMONS from '../graphql/queries/PokemonQueries'
import { useQuery } from '@apollo/client'
import { Pokemon } from '../interface/IPokemon'
import { TbLoaderQuarter } from "react-icons/tb";


const Pokemons = () => {
  const [pokemons, setPokemons] = useState([])
  const [carregando, setCarregando] = useState(false)
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

      try {
        if (loading) {
          setCarregando(true)
          return
        }
        const result = data?.pokemon_v2_pokemon || []
        setPokemons(result)
        setCarregando(false)

      } catch (error) {
        console.error('Error fetching data:', error)
        setCarregando(false)
      }
    }

    fetchData()
  }, [error, loading, data])

  const GetPhotoPokemons = (photo: string, photo2?: string) => {
    return (
      <img
        alt="pokemon"
        className="h-20 w-20  absolute -top-10 shadow-xl shadow-slate-100"
        src={photo || photo2}
      />
    )
  }

  return (
    <div className=" flex flex-col justify-between max-w-6xl mx-auto text-center">
      {carregando && <TbLoaderQuarter className="animate-spin text-5xl w-full flex text-center text-amber-500" />}
      <div className="grid grid-cols-4 gap-4 w-full place-items-center">
        {pokemons.map((pokemon: Pokemon) => (
          <div
            key={pokemon.id}
            className="border mt-10 h-40 w-60 bg-white shadow-xl shadow-slate-400/70 rounded-3xl justify-center flex flex-col items-center relative  k"
          >
            {GetPhotoPokemons(
              pokemon.pokemon_v2_pokemonsprites[0].sprites.other.dream_world
                .front_default,
              pokemon.pokemon_v2_pokemonsprites[0].sprites.other.home.front_default
            )}
            <h1 className="text-md font-bold">{pokemon.name.toUpperCase()}</h1>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Pokemons
