import { useQuery, useReactiveVar } from '@apollo/client'
import { FiHeart, FiX } from 'react-icons/fi'
import { GET_POKEMON_BY_ID } from '../graphql/queries/PokemonQueries'
import { pokemonFavoriteVar, pokemonIDVar } from '../graphql/ApolloClient/apolloMemory'
import { Pokemon } from '../interface/IPokemon'
import { RenderizarNameTipos } from '../constant/RenderizarTipos'
import { formatMeasure, formatPokemonId, getPokemonImage } from '../utils/pokemon'
import { toggleFavorite } from '../utils/favorites'

const DetailsPokemon = () => {
  const pokemonId = useReactiveVar(pokemonIDVar)
  const favorites = useReactiveVar(pokemonFavoriteVar)
  const { data, loading, error } = useQuery(GET_POKEMON_BY_ID, {
    variables: { id: pokemonId },
    skip: pokemonId <= 0,
  })

  const pokemon = data?.pokemon_v2_pokemon?.[0] as Pokemon | undefined

  if (pokemonId <= 0) {
    return (
      <aside className="sticky top-28 hidden h-fit rounded-[1.8rem] border border-dashed border-white/10 bg-white/[0.025] p-8 text-center lg:block">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full border border-white/10 bg-white/[0.035] text-3xl text-slate-700">?</div>
        <h2 className="mt-6 text-xl font-black text-white">Selecione um Pokémon</h2>
        <p className="mt-3 text-sm leading-7 text-slate-500">Os dados completos aparecem aqui sem tirar você da listagem.</p>
      </aside>
    )
  }

  const wrapperClass = 'fixed inset-0 z-50 overflow-y-auto bg-[#060a11]/95 p-4 pt-24 backdrop-blur-xl lg:sticky lg:inset-auto lg:z-auto lg:top-28 lg:max-h-[calc(100vh-8rem)] lg:bg-transparent lg:p-0 lg:pt-0 lg:backdrop-blur-none'

  if (loading) {
    return (
      <aside className={wrapperClass}>
        <div className="mx-auto h-96 max-w-md animate-pulse rounded-[1.8rem] border border-white/10 bg-white/[0.04] lg:mx-0" />
      </aside>
    )
  }

  if (error || !pokemon) {
    return (
      <aside className={wrapperClass}>
        <div className="mx-auto max-w-md rounded-[1.8rem] border border-red-400/20 bg-red-500/10 p-7 text-center lg:mx-0">
          <button type="button" onClick={() => pokemonIDVar(0)} className="ml-auto grid h-9 w-9 place-items-center rounded-full border border-white/10 text-white" aria-label="Fechar detalhes"><FiX /></button>
          <h2 className="mt-6 text-lg font-black text-white">Não foi possível carregar os detalhes.</h2>
          <p className="mt-2 text-sm text-red-100/70">Tente selecionar outro Pokémon ou recarregar a página.</p>
        </div>
      </aside>
    )
  }

  const isFavorite = favorites.includes(pokemon.id)
  const image = getPokemonImage(pokemon)

  return (
    <aside className={wrapperClass} aria-label={`Detalhes de ${pokemon.name}`}>
      <div className="relative mx-auto max-w-md overflow-hidden rounded-[1.8rem] border border-white/10 bg-[#0d1420] shadow-2xl shadow-black/30 lg:mx-0">
        <div className="flex items-center justify-between border-b border-white/10 p-4">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Detalhes</span>
          <button
            type="button"
            onClick={() => pokemonIDVar(0)}
            className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-slate-300 transition hover:bg-white/5 hover:text-white"
            aria-label="Fechar detalhes"
          >
            <FiX aria-hidden="true" />
          </button>
        </div>

        <div className="bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,.10),rgba(255,255,255,.015)_58%,transparent_59%)] px-6 pb-8 pt-7 text-center">
          <span className="text-xs font-black tracking-[0.2em] text-slate-500">{formatPokemonId(pokemon.id)}</span>
          {image && <img src={image} alt={pokemon.name} className="mx-auto mt-4 max-h-56 max-w-56 drop-shadow-[0_24px_28px_rgba(0,0,0,.35)]" />}
          <h2 className="mt-5 text-3xl font-black capitalize text-white">{pokemon.name}</h2>
          <div className="mt-4"><RenderizarNameTipos types={pokemon.pokemon_v2_pokemontypes} /></div>
        </div>

        <div className="p-5 sm:p-6">
          <button
            type="button"
            onClick={() => toggleFavorite(pokemon.id)}
            className={`mb-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-bold transition ${
              isFavorite
                ? 'border-red-400/30 bg-red-500 text-white'
                : 'border-white/10 bg-white/[0.035] text-slate-300 hover:border-red-400/30 hover:text-white'
            }`}
          >
            <FiHeart fill={isFavorite ? 'currentColor' : 'none'} aria-hidden="true" />
            {isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          </button>

          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-center"><span className="block text-[10px] uppercase tracking-wider text-slate-500">Altura</span><strong className="mt-1 block text-sm text-white">{formatMeasure(pokemon.height)} m</strong></div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-center"><span className="block text-[10px] uppercase tracking-wider text-slate-500">Peso</span><strong className="mt-1 block text-sm text-white">{formatMeasure(pokemon.weight)} kg</strong></div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-center"><span className="block text-[10px] uppercase tracking-wider text-slate-500">XP base</span><strong className="mt-1 block text-sm text-white">{pokemon.base_experience ?? '—'}</strong></div>
          </div>

          <div className="mt-6">
            <h3 className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">Habilidades</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {pokemon.pokemon_v2_pokemonabilities.map((ability) => (
                <span key={ability.pokemon_v2_ability.name} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-semibold capitalize text-slate-300">
                  {ability.pokemon_v2_ability.name.replace('-', ' ')}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default DetailsPokemon
