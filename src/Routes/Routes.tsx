import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { FC } from 'react'
import Main from '../components/Main'
import Pokemons from '../components/Pokemons'

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
])

const RoutesApp: FC = () => {
  return (
    <>
      <RouterProvider router={router} fallbackElement={<Main />} />
    </>
  )
}

export default RoutesApp
