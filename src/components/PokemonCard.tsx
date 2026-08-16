import { useReactiveVar } from '@apollo/client'
import { FiHeart } from 'react-icons/fi'
import { pokemonFavoriteVar, pokemonIDVar } from '../graphql/ApolloClient/apolloMemory'
import { Pokemon } from '../interface/IPokemon'
import { RenderizarNameTipos } from '../constant/RenderizarTipos'
import { formatPokemonId, getPokemonImage } from '../utils/pokemon'
import { toggleFavorite } from '../utils/favorites'

interface PokemonCardProps {
  pokemons: Pokemon[]
  emptyMessage?: string
}

const PokemonCard = ({ pokemons, emptyMessage = 'Nenhum Pokémon encontrado com esses filtros.' }: PokemonCardProps) => {
  const favorites = useReactiveVar(pokemonFavoriteVar)

  if (pokemons.length === 0) {
    return (
      <div className="col-span-full rounded-[1.7rem] border border-dashed border-white/10 bg-white/[0.02] px-6 py-16 text-center">
        <p className="text-sm font-semibold text-slate-300">{emptyMessage}</p>
        <p className="mt-2 text-xs text-slate-600">Tente limpar ou combinar filtros diferentes.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">
      {pokemons.map((pokemon) => {
        const isFavorite = favorites.includes(pokemon.id)
        const image = getPokemonImage(pokemon)

        return (
          <article
            key={pokemon.id}
            className="group overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0d1420] transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-2xl hover:shadow-black/25"
          >
            <div className="relative grid aspect-[1/1.02] place-items-center overflow-hidden bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,.09),rgba(255,255,255,.015)_55%,transparent_56%)] p-4">
              <span className="absolute left-4 top-4 text-[10px] font-black tracking-[0.18em] text-slate-500">{formatPokemonId(pokemon.id)}</span>
              <button
                type="button"
                onClick={() => toggleFavorite(pokemon.id)}
                className={`absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full border transition ${
                  isFavorite
                    ? 'border-red-400/30 bg-red-500 text-white'
                    : 'border-white/10 bg-[#080d16]/80 text-slate-400 hover:border-red-400/40 hover:text-red-300'
                }`}
                aria-label={isFavorite ? `Remover ${pokemon.name} dos favoritos` : `Adicionar ${pokemon.name} aos favoritos`}
              >
                <FiHeart fill={isFavorite ? 'currentColor' : 'none'} aria-hidden="true" />
              </button>

              {image ? (
                <img
                  src={image}
                  alt={pokemon.name}
                  loading="lazy"
                  className="max-h-28 max-w-28 drop-shadow-[0_18px_18px_rgba(0,0,0,.3)] transition duration-300 group-hover:scale-110 sm:max-h-36 sm:max-w-36"
                />
              ) : (
                <span className="text-4xl text-slate-700">?</span>
              )}
            </div>

            <div className="p-4 sm:p-5">
              <h2 className="truncate text-base font-black capitalize text-white sm:text-lg">{pokemon.name}</h2>
              <div className="mt-3 flex justify-start">
                <RenderizarNameTipos types={pokemon.pokemon_v2_pokemontypes} />
              </div>
              <button
                type="button"
                onClick={() => pokemonIDVar(pokemon.id)}
                className="mt-5 w-full rounded-xl border border-white/10 bg-white/[0.035] px-3 py-2.5 text-xs font-bold text-slate-300 transition hover:border-red-400/30 hover:bg-red-500/10 hover:text-white"
              >
                Ver detalhes
              </button>
            </div>
          </article>
        )
      })}
    </div>
  )
}

export default PokemonCard
