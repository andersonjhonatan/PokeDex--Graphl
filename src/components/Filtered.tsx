import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { FormData } from '../interface/IFormData'
import { Pokemon } from '../interface/IPokemon'

/*
 * Este component sera paa a filtragem do pokemon
 * O componente de filtragem recebera os dados do formulario
 * com isso estou usando o react-hook-form
 */

const Filtered = ({ pokemos }: { pokemos: Pokemon[] }) => {
  const { control, handleSubmit } = useForm<FormData>()

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data)
  }

  const type = (pokemon: Pokemon[]) => {
    return pokemon.map((pokemon) => {
      return pokemon.pokemon_v2_pokemontypes[0].pokemon_v2_type.name
    })
  }
  const uniqueType = [...new Set(type(pokemos))]

  /* filtrando as abilities para as option */

  const abilityOptions = (ability: Pokemon[]) => {
    return ability.map(
      (ability) => ability.pokemon_v2_pokemonabilities[0].pokemon_v2_ability.name
    )
  }

  /* esse new set serve para remover os duplicados */
  const uniqueAbility = [...new Set(abilityOptions(pokemos))]

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex rounded-lg mt-3 gap-4">
      <div className="flex w-full h-12 justify-between gap-4">
        <Controller
          name="height"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <select
              className="w-full bg-white text-gray-400 rounded-xl text-center"
              {...field}
            >
              <option value="" disabled>
                Height
              </option>
              <option value="2">Option 2</option>
            </select>
          )}
        />
        <Controller
          name="weight"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <select
              className="w-full bg-white text-gray-400 rounded-xl text-center"
              {...field}
            >
              <option value="" disabled>
                Weight
              </option>
              {pokemos &&
                pokemos.map((pokemon) => (
                  <option key={pokemon.id} value={pokemon.id}>
                    {pokemon.weight}
                  </option>
                ))}
            </select>
          )}
        />
        <Controller
          name="type"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <select
              className="w-full bg-white text-gray-400 rounded-xl text-center"
              {...field}
            >
              <option value="" disabled>
                Type
              </option>
              {pokemos && uniqueType.map((type) => <option key={type}>{type}</option>)}
            </select>
          )}
        />
        <Controller
          name="ability"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <select
              className="w-full bg-white text-gray-400 rounded-xl text-center"
              {...field}
            >
              <option value="" disabled>
                Ability
              </option>
              {pokemos &&
                uniqueAbility.map((ability) => <option key={ability}>{ability}</option>)}
            </select>
          )}
        />
        <Controller
          name="weaknesses"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <select
              className="w-full bg-white text-gray-400 rounded-xl text-center"
              {...field}
            >
              <option value="" disabled>
                Weaknesses
              </option>
              <option value="2">Option 2</option>
            </select>
          )}
        />
        <button
          type="submit"
          className="w-full h-12 bg-red-500 text-white rounded-tr-lg rounded-lg"
        >
          Submit
        </button>
      </div>
    </form>
  )
}

export default Filtered
