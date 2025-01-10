import { PokemonRepositoryImpl } from "../../data/repositories/pokemonRepository";
import { Pokemon } from "../entities/pokemon";

const { getPokemons } = new PokemonRepositoryImpl();

export const GetPokemonUseCase = async (page: number, limit: number): Promise<Pokemon[]> => {
    return await getPokemons(page,limit);
}