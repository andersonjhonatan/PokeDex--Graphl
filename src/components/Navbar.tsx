import { useState } from 'react'
import { useReactiveVar } from '@apollo/client'
import { FiGithub, FiHeart, FiMenu, FiX } from 'react-icons/fi'
import { Link, NavLink } from 'react-router-dom'
import { pokemonFavoriteVar } from '../graphql/ApolloClient/apolloMemory'

const navItems = [
  { to: '/', label: 'Início' },
  { to: '/pokemons', label: 'Pokédex' },
  { to: '/favorite', label: 'Favoritos' },
  { to: '/sobre', label: 'Sobre' },
]

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const favorites = useReactiveVar(pokemonFavoriteVar)

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-full px-4 py-2 text-sm font-semibold transition ${
      isActive ? 'bg-white text-slate-950' : 'text-slate-300 hover:bg-white/10 hover:text-white'
    }`

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[#070b13]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3" onClick={() => setMenuOpen(false)}>
          <img src="/assets/logo.png" alt="Ash do Código" className="h-10 w-auto" />
          <div className="hidden sm:block">
            <p className="text-sm font-bold text-white">Ash do Código</p>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">Pokédex GraphQL</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navegação principal">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/favorite"
            className="relative grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-red-400/50 hover:bg-red-500/10"
            aria-label={`${favorites.length} Pokémon favoritos`}
          >
            <FiHeart aria-hidden="true" />
            {favorites.length > 0 && (
              <span className="absolute -right-1 -top-1 min-w-5 rounded-full bg-red-500 px-1.5 py-0.5 text-center text-[10px] font-bold text-white">
                {favorites.length}
              </span>
            )}
          </Link>
          <a
            href="https://github.com/andersonjhonatan/PokeDex--Graphl"
            target="_blank"
            rel="noreferrer"
            className="hidden h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10 sm:grid"
            aria-label="Abrir repositório no GitHub"
          >
            <FiGithub aria-hidden="true" />
          </a>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 text-white lg:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="border-t border-white/10 bg-[#070b13] px-4 py-4 lg:hidden" aria-label="Navegação móvel">
          <div className="mx-auto grid max-w-7xl gap-2">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} className={linkClass} onClick={() => setMenuOpen(false)}>
                {item.label}
              </NavLink>
            ))}
            <a
              href="https://github.com/andersonjhonatan/PokeDex--Graphl"
              target="_blank"
              rel="noreferrer"
              className="rounded-full px-4 py-2 text-sm font-semibold text-slate-300 hover:bg-white/10 hover:text-white"
            >
              GitHub ↗
            </a>
          </div>
        </nav>
      )}
    </header>
  )
}

export default Navbar
