import { useEffect } from 'react'
import RoutesApp from './Routes/Routes'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import { hydrateFavorites } from './utils/favorites'

function App() {
  useEffect(() => {
    hydrateFavorites()
  }, [])

  return (
    <div className="min-h-screen bg-[#070b13] text-white">
      <Navbar />
      <RoutesApp />
      <Footer />
    </div>
  )
}

export default App
