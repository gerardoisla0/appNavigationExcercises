import { Pokemon } from "../../domain/entities/pokemon";
import { getColorDominant } from "../helpers/getColorDominant";
import { PokeAPIPokemon } from "../sources/remote/interface/pokeApi.interface";

export class PokemonMapper {

    static async pokeApitoPokemonEntity(data: PokeAPIPokemon): Promise<Pokemon>{
        
        const sprites = PokemonMapper.getSprites(data);
        const avatar = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`;
        const color = await getColorDominant(avatar);

        return{
            id: data.id,
            name: data.name,
            avatar: avatar,
            sprites: sprites,
            type: data.types.map(type => type.type.name),
            color: color
        };
    }

    static getSprites ( data: PokeAPIPokemon): string[] {
        const sprites: string[] = [
            data.sprites.front_default,
            data.sprites.back_default,
            data.sprites.front_shiny,
            data.sprites.back_shiny,
          ];
        return sprites;
    }
}