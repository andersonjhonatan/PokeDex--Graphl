import { useEffect, useMemo, useState } from 'react'
import { useQuery } from '@apollo/client'
import { FiArrowRight, FiCode, FiDatabase, FiSearch } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { GET_ALL_POKEMONS } from '../graphql/queries/PokemonQueries'
import { Pokemon } from '../interface/IPokemon'
import { formatPokemonId, getPokemonImage } from '../utils/pokemon'

const Main = () => {
  const [spotlightIndex, setSpotlightIndex] = useState(0)
  const { data, loading, error } = useQuery(GET_ALL_POKEMONS, {
    variables: { limit: 25, offset: 0 },
  })

  const pokemons = useMemo<Pokemon[]>(() => data?.pokemon_v2_pokemon ?? [], [data])
  const spotlight = pokemons[spotlightIndex]

  useEffect(() => {
    if (pokemons.length <= 1) return

    const interval = window.setInterval(() => {
      setSpotlightIndex((current) => (current + 1) % pokemons.length)
    }, 5000)

    return () => window.clearInterval(interval)
  }, [pokemons.length])

  return (
    <main className="pt-20">
      <section className="relative isolate overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_72%_35%,rgba(239,68,68,0.16),transparent_28rem),radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.12),transparent_24rem)]" />
        <div className="absolute inset-0 -z-10 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)] [background-size:48px_48px]" />

        <div className="mx-auto grid min-h-[calc(100svh-5rem)] max-w-7xl items-center gap-14 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:py-20">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-red-200">
              <span className="h-2 w-2 rounded-full bg-red-400 shadow-[0_0_18px_rgba(248,113,113,.9)]" />
              Teste técnico 2024 · reconstruído em 2026
            </div>
            <h1 className="max-w-4xl text-5xl font-black tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl xl:text-8xl">
              Uma Pokédex feita para mostrar
              <span className="block bg-gradient-to-r from-red-400 via-yellow-300 to-blue-400 bg-clip-text text-transparent">
                evolução técnica.
              </span>
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              React, TypeScript, GraphQL e Apollo Client em uma experiência responsiva para pesquisar,
              filtrar, favoritar e explorar os 151 Pokémon da primeira geração.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/pokemons"
                className="inline-flex min-h-13 items-center justify-center gap-2 rounded-2xl bg-red-500 px-6 py-4 text-sm font-bold text-white shadow-[0_18px_50px_rgba(239,68,68,.22)] transition hover:-translate-y-0.5 hover:bg-red-400"
              >
                Explorar Pokédex <FiArrowRight aria-hidden="true" />
              </Link>
              <Link
                to="/sobre"
                className="inline-flex min-h-13 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-sm font-bold text-white transition hover:border-white/20 hover:bg-white/10"
              >
                Ver evolução do projeto <FiCode aria-hidden="true" />
              </Link>
            </div>

            <div className="mt-12 grid max-w-2xl grid-cols-3 gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                <strong className="block text-2xl font-black text-white">151</strong>
                <span className="text-xs text-slate-500">Pokémon de Kanto</span>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                <strong className="block text-2xl font-black text-white">GraphQL</strong>
                <span className="text-xs text-slate-500">consulta tipada</span>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                <strong className="block text-2xl font-black text-white">Apollo</strong>
                <span className="text-xs text-slate-500">cache + estado</span>
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -inset-10 -z-10 rounded-full bg-red-500/10 blur-3xl" />
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#0d1420]/90 shadow-2xl shadow-black/40">
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <div className="flex gap-2"><span className="h-2.5 w-2.5 rounded-full bg-red-400" /><span className="h-2.5 w-2.5 rounded-full bg-yellow-300" /><span className="h-2.5 w-2.5 rounded-full bg-emerald-400" /></div>
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500">GraphQL live data</span>
              </div>

              <div className="grid min-h-[460px] place-items-center p-7 sm:p-10">
                {loading && <div className="h-36 w-36 animate-pulse rounded-full bg-white/5" />}
                {error && <p className="max-w-sm text-center text-sm leading-6 text-red-200">Não foi possível carregar a prévia agora. A Pokédex continua disponível para navegação.</p>}
                {!loading && !error && spotlight && (
                  <div className="w-full text-center">
                    <div className="mx-auto grid h-64 w-64 place-items-center rounded-full bg-[radial-gradient(circle,rgba(255,255,255,.11),rgba(255,255,255,.02)_60%,transparent_61%)] sm:h-72 sm:w-72">
                      <img
                        src={getPokemonImage(spotlight)}
                        alt={spotlight.name}
                        className="max-h-56 max-w-56 drop-shadow-[0_28px_30px_rgba(0,0,0,.35)] sm:max-h-64 sm:max-w-64"
                      />
                    </div>
                    <span className="mt-4 block text-xs font-bold tracking-[0.18em] text-slate-500">{formatPokemonId(spotlight.id)}</span>
                    <h2 className="mt-2 text-3xl font-black capitalize text-white">{spotlight.name}</h2>
                    <p className="mt-2 text-sm text-slate-400">Dados carregados diretamente da PokéAPI GraphQL.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mb-10 max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-red-400">O que o projeto demonstra</span>
          <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] text-white sm:text-5xl">Mais do que consumir uma API.</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {[
            { icon: FiDatabase, title: 'GraphQL bem definido', text: 'Queries separadas para listagem e detalhes, com somente os campos necessários para a interface.' },
            { icon: FiSearch, title: 'Busca e filtros reais', text: 'Pesquisa por nome ou número, filtros por tipo e habilidade e ordenação dos resultados.' },
            { icon: FiCode, title: 'Estado e experiência', text: 'Detalhes responsivos, favoritos persistentes e estados claros de loading, vazio e erro.' },
          ].map(({ icon: Icon, title, text }) => (
            <article key={title} className="rounded-[1.6rem] border border-white/10 bg-white/[0.035] p-6 sm:p-7">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-red-500/10 text-red-300"><Icon aria-hidden="true" /></div>
              <h3 className="mt-7 text-xl font-black text-white">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-400">{text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export default Main
