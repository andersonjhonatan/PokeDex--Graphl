import { createBrowserRouter, Link, Outlet, RouterProvider } from 'react-router-dom'
import Main from '../components/Main'
import Pokemons from '../components/Pokemons'
import Favorite from '../components/Favorite'
import Sobre from '../components/Sobre'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Layout = () => (
  <div className="min-h-screen bg-[#070b13] text-white">
    <Navbar />
    <Outlet />
    <Footer />
  </div>
)

const NotFound = () => (
  <main className="grid min-h-screen place-items-center bg-[#070b13] px-4 text-center text-white">
    <div>
      <span className="text-xs font-bold uppercase tracking-[0.22em] text-red-400">404</span>
      <h1 className="mt-4 text-4xl font-black">Essa rota escapou da Pokédex.</h1>
      <p className="mt-3 text-sm text-slate-500">Volte para a página inicial e continue explorando.</p>
      <Link to="/" className="mt-6 inline-flex rounded-xl bg-red-500 px-5 py-3 text-sm font-bold text-white">Voltar ao início</Link>
    </div>
  </main>
)

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { path: '/', element: <Main /> },
      { path: '/pokemons', element: <Pokemons /> },
      { path: '/favorite', element: <Favorite /> },
      { path: '/sobre', element: <Sobre /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])

const RoutesApp = () => <RouterProvider router={router} />

export default RoutesApp
