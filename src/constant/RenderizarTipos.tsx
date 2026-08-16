import { typeColors } from '../Record/TypeColors'
import { PokemonType } from '../interface/IPokemon'

interface TypeBadgesProps {
  types: PokemonType[]
  align?: 'start' | 'center'
}

export const RenderizarNameTipos = ({ types, align = 'center' }: TypeBadgesProps) => (
  <div className={`flex flex-wrap gap-2 ${align === 'start' ? 'justify-start' : 'justify-center'}`}>
    {types.map((type) => {
      const name = type.pokemon_v2_type.name

      return (
        <span
          key={name}
          className={`${typeColors[name] || typeColors.default} rounded-full border px-3 py-1 text-[11px] font-semibold capitalize tracking-wide`}
        >
          {name}
        </span>
      )
    })}
  </div>
)
