import { AuthRepositoryImpl } from "../../data/repositories/authRepository";
import { User } from "../entities/users";

const { registerUser } = new AuthRepositoryImpl();

export const RegisterUseCase = async (email: string, password: string, fullName: string): Promise<User | undefined> => {
    return await registerUser(email,password,fullName);
}