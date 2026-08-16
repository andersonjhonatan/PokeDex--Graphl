import { FiGithub, FiExternalLink } from 'react-icons/fi'

const Footer = () => (
  <footer className="border-t border-white/10 bg-[#05080e]">
    <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
      <div>
        <strong className="text-sm text-white">Ash do Código · Pokédex GraphQL</strong>
        <p className="mt-2 max-w-xl text-xs leading-6 text-slate-600">Projeto criado em 2024 para um processo seletivo e reconstruído em 2026 como registro de evolução técnica.</p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <a href="https://github.com/andersonjhonatan/PokeDex--Graphl" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs font-bold text-slate-400 transition hover:bg-white/5 hover:text-white"><FiGithub /> Repositório</a>
        <a href="https://portfolio-seven-flax-47.vercel.app/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs font-bold text-slate-400 transition hover:bg-white/5 hover:text-white"><FiExternalLink /> Portfólio</a>
      </div>
    </div>
    <div className="border-t border-white/5 px-4 py-5 text-center text-[11px] text-slate-700">© 2026 Anderson Jhonatan · Projeto educacional sem vínculo oficial com Pokémon.</div>
  </footer>
)

export default Footer
