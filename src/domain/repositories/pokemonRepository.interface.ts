import { Pokemon } from "../entities/pokemon";

export interface PokemonRepository {
    getPokemons(page: number, limit: number): Promise<Pokemon[]>;
    getPokemonsById(id: number): Promise<Pokemon>;
}