import { FC } from 'react'
import { MdOutlineCatchingPokemon } from 'react-icons/md'

const Navbar: FC = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="bg-[#084d51da] text-white  rounded-lg flex items-center justify-evenly  w-screen  p-7 mt-7 max-w-7xl mx-auto shadow-lg shadow-gray-800 fixed top-0 z-20 ">
        <div className="flex items-center gap-2">
          <MdOutlineCatchingPokemon className="text-2xl " />
          <a href="/">Home</a>
        </div>
        <a className='font-semibold' href="/pokemons">Pokémon</a>
        <a className='font-semibold' href="/tvpokemon">TV Pokemon</a>
        <a className='font-semibold' href="/teste"></a>
        <a className='font-semibold' href="/news">News</a>
        <a className='font-semibold' href="/sobre">Sobre</a>
      </div>
    </div>
  )
}

export default Navbar
