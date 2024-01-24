import { useEffect, useState } from 'react'
import GET_All_POKEMONS from '../graphql/queries/PokemonQueries'
import { useQuery } from '@apollo/client'

interface Pokemon {
  name: string
}
const Pokemons = () => {
  const [pokemons, setPokemons] = useState([])
  const { data, loading, error } = useQuery(GET_All_POKEMONS)

  useEffect(() => {
    const fetchData = async () => {
      if (error) {
        console.error('GraphQL Errors:', error)
        return
      }

      if (loading) {
        console.log('Loading...')
        return
      }

      try {
        const result = data?.pokemon_v2_pokedex || []
        setPokemons(result)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [error, loading, data])

  return (
    <div>
      <h1>All Pokemons</h1>
      <ul>
        {pokemons.map((pokemon: Pokemon) => (
          <li key={pokemon.name}>{pokemon.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default Pokemons
