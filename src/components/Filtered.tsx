import { useEffect, useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { FiSearch, FiSliders, FiX } from 'react-icons/fi'
import { FormData } from '../interface/IFormData'
import { Pokemon } from '../interface/IPokemon'

interface FilteredProps {
  pokemons: Pokemon[]
  resultCount: number
  onFiltersChange: (filters: FormData) => void
}

const defaultFilters: FormData = {
  search: '',
  type: '',
  ability: '',
  sort: 'id-asc',
}

const Filtered = ({ pokemons, resultCount, onFiltersChange }: FilteredProps) => {
  const { control, register, reset, watch } = useForm<FormData>({ defaultValues: defaultFilters })
  const search = watch('search')
  const type = watch('type')
  const ability = watch('ability')
  const sort = watch('sort')

  const uniqueTypes = useMemo(
    () =>
      [...new Set(pokemons.flatMap((pokemon) => pokemon.pokemon_v2_pokemontypes.map((item) => item.pokemon_v2_type.name)))].sort(),
    [pokemons]
  )

  const uniqueAbilities = useMemo(
    () =>
      [...new Set(pokemons.flatMap((pokemon) => pokemon.pokemon_v2_pokemonabilities.map((item) => item.pokemon_v2_ability.name)))].sort(),
    [pokemons]
  )

  useEffect(() => {
    onFiltersChange({ search, type, ability, sort })
  }, [ability, onFiltersChange, search, sort, type])

  const hasFilters = Boolean(search || type || ability || sort !== 'id-asc')

  return (
    <section className="rounded-[1.7rem] border border-white/10 bg-white/[0.035] p-4 sm:p-5" aria-label="Filtros da Pokédex">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center">
        <label className="relative min-w-0 flex-1">
          <span className="sr-only">Pesquisar Pokémon</span>
          <FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" aria-hidden="true" />
          <input
            {...register('search')}
            type="search"
            placeholder="Pesquise por nome ou número"
            className="h-12 w-full rounded-2xl border border-white/10 bg-[#080d16] pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-red-400/50 focus:ring-4 focus:ring-red-500/10"
          />
        </label>

        <div className="grid gap-3 sm:grid-cols-3 xl:w-[620px]">
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <select {...field} className="h-12 rounded-2xl border border-white/10 bg-[#080d16] px-4 text-sm text-slate-300 outline-none focus:border-red-400/50">
                <option value="">Todos os tipos</option>
                {uniqueTypes.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            )}
          />
          <Controller
            name="ability"
            control={control}
            render={({ field }) => (
              <select {...field} className="h-12 rounded-2xl border border-white/10 bg-[#080d16] px-4 text-sm text-slate-300 outline-none focus:border-red-400/50">
                <option value="">Todas as habilidades</option>
                {uniqueAbilities.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            )}
          />
          <Controller
            name="sort"
            control={control}
            render={({ field }) => (
              <select {...field} className="h-12 rounded-2xl border border-white/10 bg-[#080d16] px-4 text-sm text-slate-300 outline-none focus:border-red-400/50">
                <option value="id-asc">Número ↑</option>
                <option value="id-desc">Número ↓</option>
                <option value="name-asc">Nome A–Z</option>
                <option value="name-desc">Nome Z–A</option>
              </select>
            )}
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <FiSliders aria-hidden="true" />
          <strong className="text-slate-300">{resultCount}</strong> resultado{resultCount === 1 ? '' : 's'}
        </div>
        {hasFilters && (
          <button
            type="button"
            onClick={() => reset(defaultFilters)}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-xs font-bold text-slate-300 transition hover:bg-white/5 hover:text-white"
          >
            <FiX aria-hidden="true" /> Limpar filtros
          </button>
        )}
      </div>
    </section>
  )
}

export default Filtered
