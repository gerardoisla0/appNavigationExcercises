import { API_URL_POKEMON } from "@env";
import axios from "axios";

export const pokeApi = axios.create({
    baseURL: API_URL_POKEMON
});