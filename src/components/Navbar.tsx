import { FC } from 'react'
import { MdOutlineCatchingPokemon } from 'react-icons/md'
import { GiNestedHearts } from 'react-icons/gi'
import { MdOutlineFrontHand } from 'react-icons/md'
import { VscGithub } from 'react-icons/vsc'
import { IoCodeSlashOutline } from 'react-icons/io5'
import { GiRabbitHead } from 'react-icons/gi'

const Navbar: FC = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="bg-[#084d51da] text-white  rounded-lg flex items-center justify-between w-full  px-8 p-4 mt-7 max-w-7xl mx-auto shadow-lg shadow-gray-800 fixed top-0 z-20 ">
        <div className="flex">
          <img src="../../public/assets/logo.png" alt="" className="w-24" />
        </div>

        <div className="flex gap-16">
          <div className="flex items-center gap-2">
            <MdOutlineCatchingPokemon className="text-2xl " />
            <a href="/">Home</a>
          </div>

          <div className="flex items-center gap-2">
            <GiRabbitHead className="text-2xl" />
            <a className="font-semibold" href="/pokemons">
              Pokémon
            </a>
          </div>

          <a className="font-semibold" href="/teste">
            teste
          </a>

          <div className="flex items-center gap-2">
            <GiNestedHearts className="text-2xl" />
            <a className="font-semibold" href="/news">
              Favorities
            </a>
          </div>

          <div className="flex items-center gap-2">
            <MdOutlineFrontHand className="text-2xl" />
            <a className="font-semibold" href="/sobre">
              Sobre
            </a>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a href="https://portfolio-seven-flax-47.vercel.app/" target="_blank">
            <IoCodeSlashOutline size={30} className="" />
          </a>
          <a href="https://github.com/andersonjhonatan">
            <VscGithub size={25} />
          </a>
        </div>
      </div>
    </div>
  )
}

export default Navbar
