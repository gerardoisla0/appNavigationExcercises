import { PokemonRepositoryImpl } from "../../data/repositories/pokemonRepository";
import { Pokemon } from "../entities/pokemon";

const { getPokemonsById } = new PokemonRepositoryImpl();


export const GetPokemonUseCaseById = async (id: number): Promise<Pokemon> => {
    return await getPokemonsById(id);
}