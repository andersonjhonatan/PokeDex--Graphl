import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { FC } from 'react'
import Main from '../components/Main'
import Pokemons from '../components/Pokemons'
import Favorite from '../components/Favorite'
import Sobre from '../components/Sobre'

/* Criando as rotas e renderizando os componentes */

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <div>Error</div>,
  },

  {
    path: '/pokemons',
    element: <Pokemons />,
    errorElement: <div>Error</div>,
  },

  {
    path: '/favorite',
    element: <Favorite />,
    errorElement: <div>Error</div>,
  },

  {
    path: '/sobre',
    element: <Sobre />,
    errorElement: <div>Error</div>,
  },
])

/* componente principal de roteamento */

const RoutesApp: FC = () => {
  return (
    <>
      <RouterProvider router={router} fallbackElement={<Main />} />
    </>
  )
}

export default RoutesApp
