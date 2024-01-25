import { FC } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useQuery } from '@apollo/client';
import { MdOutlineCatchingPokemon } from 'react-icons/md';
import { pokemonDataVar } from '../graphql/ApolloClient/apolloMemory';
import { GET_POKEMON_BY_NAME } from '../graphql/queries/PokemonQueries';

interface FormDataSearch {
  pokemonName: string;
}

const SeachItem: FC = () => {
  const { control, handleSubmit, setValue, watch } = useForm<FormDataSearch>();
  const { data } = useQuery(GET_POKEMON_BY_NAME, {
    variables: { name: watch('pokemonName') },
    skip: !watch('pokemonName'),
  });

  const onSubmit: SubmitHandler<FormDataSearch> = () => {
    const pokemon = data?.pokemon_v2_pokemon;
    pokemonDataVar(pokemon);
    setValue('pokemonName', '');
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="z-30 fixed w-full lg:max-w-[80rem] 2xl:max-w-[53rem] mx-auto sm:mx-4 md:mx-3 lg:mx-0"
      >
        <Controller
          name="pokemonName"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <>
              <input
                {...field}
                type="text"
                placeholder="Pesquise seu pokemon"
                className="p-3 rounded-lg w-full"
              />
            </>
          )}
        />

        <button type="submit" className="disabled:opacity-70">
          <MdOutlineCatchingPokemon
            className="text-white bg-rose-600 shadow-xl shadow-rose-300 rounded-md absolute right-4 top-3"
            size={25}
          />
        </button>
      </form>
    </>
  );
};

export default SeachItem;
