import { FC } from 'react'
import { MdOutlineCatchingPokemon } from 'react-icons/md'

const Navbar: FC = () => {
  return (
    <div className="bg-white  rounded-lg flex items-center justify-evenly max-w-6xl mx-auto p-7 m-8 shadow-lg shadow-slate-300">
      <div className='flex items-center gap-2'>
        <MdOutlineCatchingPokemon className="text-2xl " />
        <a href="/">Home</a>
      </div>
      <a href="/pokemons">Pokemon</a>
      <a href="/teste">Tesutando</a>
      <a href="/teste">Tesutando</a>
      <a href="/teste">Tesutando</a>
      <a href="/sobre">Sobre</a>
      <a href="/footer">Footer</a>
    </div>
  )
}

export default Navbar
