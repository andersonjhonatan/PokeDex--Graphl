
import client from '../ApolloClient';
import  GET_All_POKEMONS from '../queries/PokemonQueries';

class PokemonService {
  async getAllPokemons() {
    try {
      const response = await client.query({
        query: GET_All_POKEMONS,
      });

      const { data, errors } = response;

      if (errors) {
        console.error('GraphQL Errors:', errors);
        throw new Error('Error in GraphQL query');
      }

      const pokemons = data?.pokemon_v2_pokedex || [];
      return { loading: false, error: null, pokemons };
    } catch (error) {
      console.error('Error:', error);
      return { loading: false, error, pokemons: [] };
    }
  }
}

export default new PokemonService();
