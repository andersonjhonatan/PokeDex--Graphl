import { useCallback, useMemo, useState } from 'react'
import { useQuery } from '@apollo/client'
import { FiRefreshCw } from 'react-icons/fi'
import { GET_ALL_POKEMONS } from '../graphql/queries/PokemonQueries'
import { FormData } from '../interface/IFormData'
import { Pokemon } from '../interface/IPokemon'
import { pokemonHasAbility, pokemonHasType } from '../utils/pokemon'
import DetailsPokemon from './DetailsPokemon'
import Filtered from './Filtered'
import PokemonCard from './PokemonCard'

const defaultFilters: FormData = {
  search: '',
  type: '',
  ability: '',
  sort: 'id-asc',
}

const Pokemons = () => {
  const [filters, setFilters] = useState<FormData>(defaultFilters)
  const { data, loading, error, refetch } = useQuery(GET_ALL_POKEMONS, {
    variables: { limit: 151, offset: 0 },
  })

  const pokemons = useMemo<Pokemon[]>(() => data?.pokemon_v2_pokemon ?? [], [data])
  const handleFiltersChange = useCallback((nextFilters: FormData) => setFilters(nextFilters), [])

  const filteredPokemons = useMemo(() => {
    const normalizedSearch = filters.search.trim().toLowerCase()
    const result = pokemons.filter((pokemon) => {
      const matchesSearch =
        !normalizedSearch ||
        pokemon.name.toLowerCase().includes(normalizedSearch) ||
        String(pokemon.id).includes(normalizedSearch.replace('#', ''))

      return matchesSearch && pokemonHasType(pokemon, filters.type) && pokemonHasAbility(pokemon, filters.ability)
    })

    return [...result].sort((a, b) => {
      switch (filters.sort) {
        case 'id-desc':
          return b.id - a.id
        case 'name-asc':
          return a.name.localeCompare(b.name)
        case 'name-desc':
          return b.name.localeCompare(a.name)
        default:
          return a.id - b.id
      }
    })
  }, [filters, pokemons])

  return (
    <main className="min-h-screen pt-20">
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_20%_0,rgba(239,68,68,.11),transparent_28rem)]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-red-400">Pokédex · Kanto</span>
          <div className="mt-4 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <h1 className="text-4xl font-black tracking-[-0.045em] text-white sm:text-6xl">Explore os 151 originais.</h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">Busque por nome ou número, combine tipo e habilidade e abra os detalhes sem perder o contexto da lista.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.035] px-5 py-4">
              <strong className="block text-2xl font-black text-white">{pokemons.length || 151}</strong>
              <span className="text-xs text-slate-500">registros consultados via GraphQL</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        {loading && (
          <div className="space-y-5">
            <div className="h-28 animate-pulse rounded-[1.7rem] border border-white/10 bg-white/[0.035]" />
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => <div key={index} className="h-72 animate-pulse rounded-[1.5rem] border border-white/10 bg-white/[0.035]" />)}
            </div>
          </div>
        )}

        {error && !loading && (
          <div className="rounded-[1.7rem] border border-red-400/20 bg-red-500/10 p-7 text-center">
            <h2 className="text-xl font-black text-white">Não foi possível carregar a Pokédex.</h2>
            <p className="mt-3 text-sm text-red-100/70">A API pode estar temporariamente indisponível. Tente novamente.</p>
            <button type="button" onClick={() => refetch()} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-red-500 px-4 py-3 text-sm font-bold text-white"><FiRefreshCw /> Tentar novamente</button>
          </div>
        )}

        {!loading && !error && (
          <>
            <Filtered pokemons={pokemons} resultCount={filteredPokemons.length} onFiltersChange={handleFiltersChange} />
            <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px] xl:grid-cols-[minmax(0,1fr)_380px]">
              <PokemonCard pokemons={filteredPokemons} />
              <DetailsPokemon />
            </div>
          </>
        )}
      </section>
    </main>
  )
}

export default Pokemons
