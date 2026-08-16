import { createBrowserRouter, Link, RouterProvider } from 'react-router-dom'
import Main from '../components/Main'
import Pokemons from '../components/Pokemons'
import Favorite from '../components/Favorite'
import Sobre from '../components/Sobre'

const NotFound = () => (
  <main className="grid min-h-screen place-items-center px-4 pt-20 text-center">
    <div>
      <span className="text-xs font-bold uppercase tracking-[0.22em] text-red-400">404</span>
      <h1 className="mt-4 text-4xl font-black text-white">Essa rota escapou da Pokédex.</h1>
      <p className="mt-3 text-sm text-slate-500">Volte para a página inicial e continue explorando.</p>
      <Link to="/" className="mt-6 inline-flex rounded-xl bg-red-500 px-5 py-3 text-sm font-bold text-white">Voltar ao início</Link>
    </div>
  </main>
)

const router = createBrowserRouter([
  { path: '/', element: <Main />, errorElement: <NotFound /> },
  { path: '/pokemons', element: <Pokemons />, errorElement: <NotFound /> },
  { path: '/favorite', element: <Favorite />, errorElement: <NotFound /> },
  { path: '/sobre', element: <Sobre />, errorElement: <NotFound /> },
  { path: '*', element: <NotFound /> },
])

const RoutesApp = () => <RouterProvider router={router} />

export default RoutesApp
