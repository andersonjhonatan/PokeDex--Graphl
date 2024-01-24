import PokemonService from '../services/PokemonsService'

class PokemonRepository {
  async getAllPokemons() {
    try {
      const {pokemons, loading, error} = await PokemonService.getAllPokemons()

      if (error) {
        console.error('Erro ao obter pokémons:', error)
        return { data: [], loading: false, error: 'Erro ao obter pokémons' }
      }

      if (loading) {
        return { data: [], loading: true, error: null }
      }

      return { pokemons, loading: false, error: null }
    } catch (error) {
      console.error('Erro ao obter pokémons no repositório:', error)
      return { data: [], loading: false, error: 'Erro ao obter pokémons' }
    }
  }
}

export default new PokemonRepository()
