import { Pokemon } from '../interface/IPokemon'
import { useReactiveVar } from '@apollo/client'
import { MdOutlineCatchingPokemon } from 'react-icons/md'
import { pokemonDataVar, pokemonIDVar } from '../graphql/ApolloClient/apolloMemory'
import { RenderizarNameTipos } from '../constant/RenderizarTipos'
import { CiHeart } from 'react-icons/ci'

const PokemonCard = ({ pokemos }: { pokemos: Pokemon[] }) => {
  const pokemonData = useReactiveVar(pokemonDataVar)

  /**
 * Função que renderiza as imagens dos pokemons
 * photo - URL da imagem do pokemon
 * photo2 - URL alternativa da imagem do pokemon
 */
  const renderizarImagens = (photo: string, photo2?: string) => {
    return (
      <div className="relative flex items-center  w-full">
        <div className="mb-16">
          <MdOutlineCatchingPokemon
            className=" text-white/5  absolute top-1  left-4 "
            size={80}
          />

          <img
            alt="pokemon"
            className="h-20 w-20 left-4 absolute -top-10 z-10"
            src={photo || photo2}
          />
        </div>
        <div className="absolute top-2 right-2  ">
          <button
            className={`rounded-full p-1 hover:bg-red-500 hover:text-white
              `}
          >
            <CiHeart size={30} />
          </button>
        </div>
      </div>
    )
  }

  /* 
 * Função que renderiza os pokemons
 * pokemon - Objeto do pokemon
 * renderizarImagens - Função que renderiza as imagens dos pokemons
 * renderizarNameTipos - Função que renderiza os tipos dos pokemons
 */

  const renderizarPokemon = ({ id, name, pokemon_v2_pokemonsprites, pokemon_v2_pokemontypes }: Pokemon) => (
    <div
      key={id}
      className="mt-12 h-auto w-48 bg-[#051b1cf6] shadow-xl shadow-gray-800 rounded-3xl justify-center flex flex-col items-center relative hover:scale-105 transition-all duration-300"
      onClick={() => pokemonIDVar(id)}
    >
      {renderizarImagens(
        pokemon_v2_pokemonsprites[0].sprites.other.dream_world.front_default,
        pokemon_v2_pokemonsprites[0].sprites.other.home.front_default
      )}
      <div className="flex flex-col gap-3 mb-3">
        <p className="text-md text-gray-500 font-bold">Nº {id}</p>
        <h1 className="text-md text-white font-bold">{name.toUpperCase()}</h1>
        {RenderizarNameTipos(pokemon_v2_pokemontypes)}
      </div>
    </div>
  )

  /* Estou renderizando os pokemons todos e apenas e o pokemon pesquisado na busca 
  * (pokemonData as Pokemon[]) Usei a tipagem para garantir que o pokemonData seja um array
  */

  return (
    <div className="grid mt-32 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full place-items-center cursor-pointer">
      {pokemonData
        ? (pokemonData as Pokemon[]).map((pokemon: Pokemon) => renderizarPokemon(pokemon))
        : pokemos.map((pokemon: Pokemon) => renderizarPokemon(pokemon))}
    </div>
  )
}

export default PokemonCard
