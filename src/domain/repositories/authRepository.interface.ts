import { AuthUser } from "../../data/sources/remote/interface/authUser.interface";
import { User } from "../entities/users";

export interface AuthRepository {
    registerUser(email:string, password: string, fullName: string): Promise<User | undefined>;
    login(email:string, password: string): Promise<string>;
    verify(email:string, token: string): Promise<AuthUser>;
}