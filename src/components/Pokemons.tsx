import { useEffect, useState } from 'react'
import PokemonCard from './PokemonCard'
import { useQuery } from '@apollo/client'
import { GET_All_POKEMONS } from '../graphql/queries/PokemonQueries'
import ParentComponent from './SeaarItemParente'
import DetailsPokemon from './DetailsPokemon'

const Pokemons = () => {
  const [carregando, setCarregando] = useState(false)
  const [pokemons, setPokemons] = useState([])

  const { data, loading, error } = useQuery(GET_All_POKEMONS, {
    variables: {
      limit: 100,
      offset: 0,
    },
  })

  useEffect(() => {
    const fetchData = async () => {
      setCarregando(true)
      try {
        if (loading) {
          setCarregando(true)
          return
        }

        const result = data?.pokemon_v2_pokemon || []
        setPokemons(result)
        setCarregando(false)
      } catch (error) {
        console.error('Error fetching data:', error)
        setCarregando(false)
      }
    }

    fetchData()
  }, [error, loading, data])

  return (
    <div className="flex max-w-7xl mx-auto gap-5">
      {carregando && <div>Carregando...</div>}
      <div className=" flex flex-col max-2xl:flex-auto  justify-between w-2/3 text-center mt-32 relative">
        <ParentComponent />
        <PokemonCard pokemos={pokemons} />
      </div>

      <DetailsPokemon />
    </div>
  )
}

export default Pokemons
