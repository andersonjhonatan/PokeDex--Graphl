import { IconTypes, typeColors } from '../Record/TypeColors'
import { PokemonType } from '../interface/IPokemon'

export const RenderizarNameTipos = (types: PokemonType[]) => {
  const typesPokemon = types?.map((type: PokemonType) => type.pokemon_v2_type.name)
  return (
    <div className="flex gap-2 justify-center">
      {typesPokemon.map((type: string) => (
        <div
          key={type}
          className={`${
            typeColors[type] || typeColors.default
          } p-2 rounded-lg flex gap-1 items-baseline`}
        >
          <img
            src={IconTypes[type] || IconTypes.default}
            alt={type}
            className="h-3 w-3"
          />
          <p className="text-white text-xs">
            {type.toUpperCase().charAt(0) + type.slice(1)}
          </p>
        </div>
      ))}
    </div>
  )
}
