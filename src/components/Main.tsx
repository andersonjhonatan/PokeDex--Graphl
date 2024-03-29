import { useEffect, useState } from 'react'
import { GET_All_POKEMONS } from '../graphql/queries/PokemonQueries'
import { useQuery } from '@apollo/client'
import { Pokemon } from '../interface/IPokemon'
import { VscLoading } from 'react-icons/vsc'

const Main = () => {
  const [newPhoto, setNewPhoto] = useState<Pokemon[] | []>([])
  const [photo, setPhoto] = useState(0)
  const { data, loading, error } = useQuery(GET_All_POKEMONS, {
    variables: {
      limit: 25,
      offset: 0,
    },
  })

  /* Função que renderiza todos os pokemons   */

  useEffect(() => {
    if (data) {
      setNewPhoto(data.pokemon_v2_pokemon || [])
    }
  }, [data])

  /* Função que renderiza as imagens dos pokemons aleatórios de tempo em tempo */

  useEffect(() => {
    const interval = setInterval(() => {
      if (newPhoto) {
        setPhoto(Math.floor(Math.random() * newPhoto.length + 1))
      }
    }, 10000)

    return () => clearInterval(interval)
  }, [newPhoto])

  if (error) {
    console.error('Erro ao obter pokemons:', error)
    return 'Erro ao obter pokemons'
  }

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <VscLoading className="text-5xl animate-spin text-red-400" />
      </div>
    )
  }

  return (
    <main className="max-w-7xl mx-auto">
      <div className="flex h-screen ">
        <div className="w-full flex-1 flex flex-col gap-4 justify-center items-center">
          <h1 className="text-3xl text-white font-bold">Bem-vindo ao universo </h1>
          <p className="text-red-500 text-8xl font-bold">Pokédex</p>
          <p className="text-white text-sm">
            mergulhe nas informações detalhadas sobre seus Pokémon favoritos.
          </p>
        </div>
        <div className="flex-1 mt-12 flex  items-center justify-center">
          {newPhoto && newPhoto.length > 0 && (
            <img
              src={
                newPhoto[photo]?.pokemon_v2_pokemonsprites?.[0]?.sprites?.other
                  ?.dream_world?.front_default
              }
              alt=""
              className="w-72"
            />
          )}
        </div>
      </div>
    </main>
  )
}

export default Main
