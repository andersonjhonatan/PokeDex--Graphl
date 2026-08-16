import { useEffect } from 'react'
import RoutesApp from './Routes/Routes'
import { hydrateFavorites } from './utils/favorites'

function App() {
  useEffect(() => {
    hydrateFavorites()
  }, [])

  return <RoutesApp />
}

export default App
