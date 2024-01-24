import { ChangeEvent, FC, FormEvent, useState } from 'react'
import { GET_POKEMON_BY_NAME } from '../graphql/queries/PokemonQueries'
import { MdOutlineCatchingPokemon } from 'react-icons/md'
import { useQuery } from '@apollo/client'
import { pokemonDataVar } from '../graphql/ApolloClient/apolloMemory'

const SeachItem: FC = () => {
  const [value, setValue] = useState('')
  const { data } = useQuery(GET_POKEMON_BY_NAME, {
    variables: { name: value },
    skip: !value,
  })

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const pokemon = data?.pokemon_v2_pokemon

    pokemonDataVar(pokemon)

    setValue('')
  }

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="z-30 fixed w-full lg:max-w-[80rem] 2xl:max-w-[53rem] mx-auto sm:mx-4 md:mx-3 lg:mx-0"
      >
        <input
          type="text"
          placeholder="Pesquise seu pokemon"
          className="p-3 rounded-lg w-full"
          onChange={handleChange}
          value={value}
        />

        <button type="submit" disabled={!value} className="disabled:opacity-70">
          <MdOutlineCatchingPokemon
            className="text-white bg-rose-600 shadow-xl shadow-rose-300 rounded-md absolute right-4 top-3"
            size={25}
          />
        </button>
      </form>
    </>
  )
}

export default SeachItem
