import { Pokemon } from "../../domain/entities/pokemon";
import { PokemonRepository } from "../../domain/repositories/pokemonRepository.interface";
import { PokemonMapper } from "../mappers/pokemon.mapper";
import { pokeApi } from "../sources/remote/api/pokeApi";
import { PokeAPIPaginatedResponse, PokeAPIPokemon } from "../sources/remote/interface/pokeApi.interface";

export class PokemonRepositoryImpl implements PokemonRepository{

    getPokemons = async (page: number, limit: number = 20): Promise<Pokemon[]>  => {
        try{
            const url = `/pokemon?offset=${page * 20}}&limit=${limit}",`
            const { data } = await pokeApi.get<PokeAPIPaginatedResponse>(url);

            const pokemonPromises = data.results.map( info => {
                return pokeApi.get<PokeAPIPokemon>(info.url);
                }
            );

            const pokeApiPokemons = await Promise.all(pokemonPromises);

            const pokemonsPromises = pokeApiPokemons.map(item =>
                PokemonMapper.pokeApitoPokemonEntity(item.data)
            );

            return await Promise.all(pokemonsPromises);

        }catch(error){
            console.log(error);
            throw new Error("Error obtiendo pokemons.");
        }
    }

    getPokemonsById = async (id: number): Promise<Pokemon>  => {
        try{
            const url = `/pokemon/${id}`
            const { data } = await pokeApi.get<PokeAPIPokemon>(url);
            const pokemon = PokemonMapper.pokeApitoPokemonEntity(data);
            return pokemon;
        }catch(error){
            console.log(error);
            throw new Error("Error obtiendo pokemons.");
        }
    }
    
}