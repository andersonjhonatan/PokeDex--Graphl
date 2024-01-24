import { useEffect, useState } from 'react'
import GET_All_POKEMONS from '../graphql/queries/PokemonQueries'
import { useQuery } from '@apollo/client'
import { Pokemon, PokemonType } from '../interface/IPokemon'
import { TbLoaderQuarter } from 'react-icons/tb'
import { MdOutlineCatchingPokemon } from 'react-icons/md'
import { typeColors } from '../Record/TypeColors'

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
      <div className="relative">
        <MdOutlineCatchingPokemon className=" text-white/5  sticky -top-16 " size={90} />

        <img
          alt="pokemon"
          className="h-20 w-20  absolute -top-14 z-10"
          src={photo || photo2}
        />
      </div>
    )
  }

  const PokemonNamesTypes = (types: PokemonType[]) => {
    const typesPokemon = types?.map((type: PokemonType) => type.pokemon_v2_type.name)
    return (
      <div className="flex gap-2">
        {typesPokemon.map((type: string) => (
          <div key={type} className={`${typeColors[type] || typeColors.default}`}>
            <p className="text-white/50">{type}</p>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className=" flex justify-between max-w-6xl mx-auto text-center mt-40">
      {carregando && (
        <TbLoaderQuarter className="animate-spin text-5xl w-full flex text-center text-amber-500" />
      )}
      <div className="grid  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full place-items-center cursor-pointer">
        {pokemons.map((pokemon: Pokemon) => (
          <div
            key={pokemon.id}
            className="mt-10 h-auto w-60 bg-[#051b1cf6] shadow-xl shadow-gray-800 rounded-3xl justify-center flex flex-col items-center relative hover:scale-105 transition-all duration-300"
          >
            {GetPhotoPokemons(
              pokemon.pokemon_v2_pokemonsprites[0].sprites.other.dream_world
                .front_default,
              pokemon.pokemon_v2_pokemonsprites[0].sprites.other.home.front_default
            )}
            <div className="flex flex-col gap-2 ">
              <p className="text-md text-gray-500 font-bold">Nº {pokemon.id}</p>
              <h1 className="text-md text-white font-bold">
                {pokemon.name.toUpperCase()}
              </h1>
              {PokemonNamesTypes(pokemon.pokemon_v2_pokemontypes)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Pokemons
