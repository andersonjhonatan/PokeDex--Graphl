import { Pokemon } from '../interface/IPokemon'
import { useReactiveVar } from '@apollo/client'

import { MdOutlineCatchingPokemon } from 'react-icons/md'
import { pokemonDataVar, pokemonIDVar } from '../graphql/ApolloClient/apolloMemory'
import { RenderizarNameTipos } from '../constant/RenderizarTipos'

const PokemonCard = ({ pokemos }: { pokemos: Pokemon[] }) => {
  const pokemonData = useReactiveVar(pokemonDataVar)

  const renderizarImagens = (photo: string, photo2?: string) => {
    return (
      <div className="relative">
        <MdOutlineCatchingPokemon className=" text-white/5  sticky -top-16 " size={90} />

        <img
          alt="pokemon"
          className="h-20 w-20  absolute -top-10 z-10"
          src={photo || photo2}
        />
      </div>
    )
  }
  /* Função que renderiza as imagens dos pokemons */

  const renderizarPokemon = (pokemon: Pokemon) => (
    <div
      key={pokemon.id}
      className="mt-10 h-auto w-48 bg-[#051b1cf6] shadow-xl shadow-gray-800 rounded-3xl justify-center flex flex-col items-center relative hover:scale-105 transition-all duration-300"
      onClick={() => pokemonIDVar(pokemon.id)}
    >
      {renderizarImagens(
        pokemon.pokemon_v2_pokemonsprites[0].sprites.other.dream_world.front_default,
        pokemon.pokemon_v2_pokemonsprites[0].sprites.other.home.front_default
      )}
      <div className="flex flex-col gap-2">
        <p className="text-md text-gray-500 font-bold">Nº {pokemon.id}</p>
        <h1 className="text-md text-white font-bold">{pokemon.name.toUpperCase()}</h1>
        {RenderizarNameTipos(pokemon.pokemon_v2_pokemontypes)}
      </div>
    </div>
  )

  return (
    <div className="grid mt-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full place-items-center cursor-pointer">
      {pokemonData
        ? (pokemonData as Pokemon[]).map((pokemon: Pokemon) => renderizarPokemon(pokemon))
        : pokemos.map((pokemon: Pokemon) => renderizarPokemon(pokemon))}
    </div>
  )
}

export default PokemonCard
