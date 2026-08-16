import { FiArrowRight, FiCheck, FiCode, FiGitBranch, FiLayers } from 'react-icons/fi'

const Sobre = () => {
  const improvements = [
    'Arquitetura simplificada: Apollo para dados remotos e reactive vars apenas para estado global pequeno.',
    'Filtros funcionais por busca, tipo e habilidade, com ordenação dos resultados.',
    'Favoritos persistentes em localStorage e sincronizados com a interface.',
    'Layout reconstruído com prioridade para mobile, estados de erro, loading e vazio.',
    'Detalhes do Pokémon em painel responsivo sem consulta inválida para ID zero.',
    'README reescrito para registrar decisões, evolução e pontos técnicos do desafio.',
  ]

  return (
    <main className="min-h-screen pt-20">
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_75%_0,rgba(59,130,246,.12),transparent_28rem)]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-blue-400">História do projeto</span>
          <h1 className="mt-4 max-w-5xl text-4xl font-black tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl">
            Um teste técnico de 2024 transformado em prova de evolução.
          </h1>
          <p className="mt-7 max-w-3xl text-base leading-8 text-slate-400 sm:text-lg">
            Esta Pokédex nasceu em janeiro de 2024 durante um processo seletivo para uma vaga júnior. Em 2026, o projeto foi revisitado sem apagar a versão original do histórico do Git: a ideia foi corrigir decisões imaturas, terminar funcionalidades e documentar o que mudou.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-5 lg:grid-cols-2">
          <article className="rounded-[1.8rem] border border-white/10 bg-white/[0.035] p-7 sm:p-8">
            <div className="flex items-center justify-between"><span className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">2024</span><FiGitBranch className="text-slate-600" /></div>
            <h2 className="mt-8 text-3xl font-black tracking-[-0.04em] text-white">A versão do candidato júnior.</h2>
            <p className="mt-4 text-sm leading-7 text-slate-400">React + TypeScript, GraphQL, Apollo Client, React Router, React Hook Form e Tailwind. O projeto já mostrava iniciativa, mas mantinha filtros e favoritos incompletos e duplicava a estratégia de acesso a dados.</p>
          </article>

          <article className="rounded-[1.8rem] border border-blue-400/20 bg-blue-500/[0.07] p-7 sm:p-8">
            <div className="flex items-center justify-between"><span className="text-xs font-black uppercase tracking-[0.2em] text-blue-300">2026</span><FiCode className="text-blue-300" /></div>
            <h2 className="mt-8 text-3xl font-black tracking-[-0.04em] text-white">A versão que sabe explicar as decisões.</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">A reconstrução prioriza clareza arquitetural, comportamento real das funcionalidades, responsividade, acessibilidade básica e uma experiência consistente para quem avalia o projeto.</p>
          </article>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[.75fr_1.25fr]">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-red-400">O que foi corrigido</span>
            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] text-white sm:text-5xl">Evolução visível no código e na interface.</h2>
            <p className="mt-5 text-sm leading-7 text-slate-500">O histórico continua sendo parte do projeto. A versão antiga mostra de onde ele saiu; a nova mostra como o mesmo problema seria resolvido hoje.</p>
          </div>
          <div className="grid gap-3">
            {improvements.map((item) => (
              <div key={item} className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                <div className="mt-0.5 grid h-7 w-7 flex-none place-items-center rounded-full bg-emerald-500/10 text-emerald-300"><FiCheck aria-hidden="true" /></div>
                <p className="text-sm leading-7 text-slate-300">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 rounded-[2rem] border border-white/10 bg-[#0d1420] p-7 sm:p-9">
          <div className="grid gap-8 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
            <div>
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-red-500/10 text-red-300"><FiLayers /></div>
              <h2 className="mt-6 text-2xl font-black text-white sm:text-3xl">Arquitetura atual</h2>
              <p className="mt-3 text-sm leading-7 text-slate-400">Uma arquitetura pequena deve continuar pequena. As queries ficam separadas, Apollo cuida do servidor e o estado local/global fica somente onde agrega valor.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-4">
              {['UI React', 'Apollo Client', 'GraphQL', 'PokéAPI'].map((item, index) => (
                <div key={item} className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center text-sm font-bold text-white">
                  {item}
                  {index < 3 && <FiArrowRight className="absolute -right-5 top-1/2 z-10 hidden -translate-y-1/2 text-slate-600 sm:block" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Sobre
