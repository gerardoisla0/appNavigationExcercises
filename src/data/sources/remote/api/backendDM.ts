import { API_URL_BACKEND } from "@env";
import axios from "axios";

export const backendDM = axios.create({
    baseURL: API_URL_BACKEND
});