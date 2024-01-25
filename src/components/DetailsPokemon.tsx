import { useQuery, useReactiveVar } from '@apollo/client'
import { useEffect, useState } from 'react'
import { GET_POKEMON_BY_ID } from '../graphql/queries/PokemonQueries'
import { pokemonIDVar } from '../graphql/ApolloClient/apolloMemory'
import { Pokemon } from '../interface/IPokemon'
import { RenderizarNameTipos } from '../constant/RenderizarTipos'
import { VscLoading } from 'react-icons/vsc'

const DetailsPokemon = () => {
  const [pokemoId, setpokemoId] = useState(0)
  const [pokemonData, setPokemonData] = useState<Pokemon[] | []>([])

  const newPokemonId = useReactiveVar(pokemonIDVar)

  const { data, loading } = useQuery(GET_POKEMON_BY_ID, {
    variables: {
      id: pokemoId,
    },
  })

  useEffect(() => {
    setpokemoId(newPokemonId)

    const pokemon = data?.pokemon_v2_pokemon
    setPokemonData(pokemon)
  }, [data, newPokemonId])

  if (loading) {
    return (
      <div className="mt-72 flex justify-center text-center  w-96">
        <VscLoading className="text-5xl animate-spin text-red-400" />
      </div>
    )
  }

  return (
    <div
      className={`flex flex-col ${
        pokemonData && pokemonData.length <= 0 ? 'mt-32' : 'mt-60'
      } bg-[#051b1cf6] flex-auto shadow-xl shadow-gray-800 rounded-3xl`}
    >
      
      <div>
        {pokemonData && pokemonData.length <= 0 && (
          <h1 className="text-2xl text-white font-bold p-8 m-16 flex text-center items-center justify-center bg-[#084d51da] rounded-full mt-32 h-72 animate-pulse shadow-md shadow-slate-400">
            <img src="https://pipedream.com/s.v0/app_mvNhzR/logo/orig" alt="" />
          </h1>
        )}
      </div>
      <div className="flex flex-col gap-4 relative">
        {pokemonData &&
          pokemonData.map((pokemon: Pokemon) => (
            <div key={pokemon.id} className="flex flex-col items-center h-auto">
              <div className="flex flex-col items-center gap-4">
                <figure className="flex justify-center">
                  <img
                    src={
                      pokemon.pokemon_v2_pokemonsprites[0].sprites.other.dream_world
                        .front_default
                    }
                    alt={pokemon.name}
                    className="absolute -top-28 h-60 w-60"
                  />
                </figure>
                <div className="flex flex-col mt-36 items-center gap-4">
                  <p className="text-gray-500 font-bold">Nº {pokemon.id}</p>
                  <h1 className="text-white font-bold">{pokemon.name.toUpperCase()}</h1>
                  {RenderizarNameTipos(pokemon.pokemon_v2_pokemontypes)}
                </div>
                <p className="text-white font-bold mt-5">Abilities</p>
                <div className="grid grid-cols-2 gap-6 items-center justify-center">
                  {pokemon.pokemon_v2_pokemonabilities.map((ability) => (
                    <p
                      key={ability.pokemon_v2_ability.name}
                      className="text-white font-bold text-center border border-gray-500 px-9 py-2 rounded-xl"
                    >
                      {ability.pokemon_v2_ability.name}
                    </p>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-6 items-center justify-center w-full mx-auto">
                  <div className="flex flex-col gap-2 justify-center items-center">
                    <p className="text-white font-bold">Height</p>
                    <p className="text-white font-bold bg-slate-900 px-9 py-1 rounded-lg">
                      {pokemon.height} Cm
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 items-center">
                    <p className="text-white font-bold">Weight</p>
                    <p className="text-white font-bold bg-slate-900 px-9 py-1 rounded-lg">
                      {pokemon.weight} Kg
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 items-center">
                    <p className="text-white font-bold">Base experience</p>
                    <p className="text-white font-bold bg-slate-900 px-9 py-1 rounded-lg">
                      {pokemon.base_experience}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default DetailsPokemon
