import { useMemo } from 'react'
import { useQuery, useReactiveVar } from '@apollo/client'
import { FiHeart } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { GET_ALL_POKEMONS } from '../graphql/queries/PokemonQueries'
import { pokemonFavoriteVar } from '../graphql/ApolloClient/apolloMemory'
import { Pokemon } from '../interface/IPokemon'
import DetailsPokemon from './DetailsPokemon'
import PokemonCard from './PokemonCard'

const Favorite = () => {
  const favoriteIds = useReactiveVar(pokemonFavoriteVar)
  const { data, loading, error } = useQuery(GET_ALL_POKEMONS, {
    variables: { limit: 151, offset: 0 },
  })

  const favorites = useMemo<Pokemon[]>(() => {
    const pokemons = (data?.pokemon_v2_pokemon ?? []) as Pokemon[]
    return pokemons.filter((pokemon) => favoriteIds.includes(pokemon.id))
  }, [data, favoriteIds])

  return (
    <main className="min-h-screen pt-20">
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_20%_0,rgba(239,68,68,.10),transparent_28rem)]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-red-500/10 text-red-300"><FiHeart aria-hidden="true" /></div>
          <span className="mt-6 block text-xs font-bold uppercase tracking-[0.22em] text-red-400">Coleção pessoal</span>
          <h1 className="mt-4 text-4xl font-black tracking-[-0.045em] text-white sm:text-6xl">Seus favoritos.</h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">Os Pokémon marcados com coração ficam salvos neste navegador, mesmo depois de fechar a página.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {loading && <div className="h-72 animate-pulse rounded-[1.7rem] border border-white/10 bg-white/[0.035]" />}
        {error && !loading && <div className="rounded-[1.7rem] border border-red-400/20 bg-red-500/10 p-7 text-center text-sm text-red-100">Não foi possível carregar sua coleção agora.</div>}

        {!loading && !error && favoriteIds.length === 0 && (
          <div className="rounded-[1.8rem] border border-dashed border-white/10 bg-white/[0.025] px-6 py-20 text-center">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-red-500/10 text-2xl text-red-300"><FiHeart aria-hidden="true" /></div>
            <h2 className="mt-6 text-2xl font-black text-white">Sua coleção ainda está vazia.</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-500">Abra a Pokédex e toque no coração dos Pokémon que você quer guardar.</p>
            <Link to="/pokemons" className="mt-6 inline-flex rounded-xl bg-red-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-400">Explorar Pokédex</Link>
          </div>
        )}

        {!loading && !error && favoriteIds.length > 0 && (
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px] xl:grid-cols-[minmax(0,1fr)_380px]">
            <PokemonCard pokemons={favorites} emptyMessage="Os Pokémon favoritados não foram encontrados." />
            <DetailsPokemon />
          </div>
        )}
      </section>
    </main>
  )
}

export default Favorite
