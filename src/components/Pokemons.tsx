import { useEffect, useState } from 'react'
import PokemonCard from './PokemonCard'
import { useQuery } from '@apollo/client'
import { GET_All_POKEMONS } from '../graphql/queries/PokemonQueries'
import ParentComponent from './SeaarItemParente'
import DetailsPokemon from './DetailsPokemon'
import { VscLoading } from 'react-icons/vsc'
import Filtered from './Filtered'

const Pokemons = () => {
  const [pokemons, setPokemons] = useState([])

  const { data, loading, error } = useQuery(GET_All_POKEMONS, {
    variables: {
      limit: 50,
      offset: 0,
    },
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = data?.pokemon_v2_pokemon || []
        setPokemons(result)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [error, loading, data])

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <VscLoading className="text-5xl animate-spin text-red-400" />
      </div>
    )
  }

  return (
    <div className="flex max-w-7xl mx-auto gap-5 mb-20">
      <div className=" flex flex-col max-2xl:flex-auto  justify-between w-2/3 text-center mt-32 relative gap-12">
        <ParentComponent />
        <Filtered pokemos={pokemons} />

        <PokemonCard pokemos={pokemons} />
      </div>

      <DetailsPokemon />
    </div>
  )
}

export default Pokemons
