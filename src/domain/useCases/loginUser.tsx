import { AuthRepositoryImpl } from "../../data/repositories/authRepository";

const { login } = new AuthRepositoryImpl();

export const LoginUseCase = async (email: string, password: string):Promise<any> => {
    return await login(email,password);
}