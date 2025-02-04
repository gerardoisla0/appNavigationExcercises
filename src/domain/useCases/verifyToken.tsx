import { AuthRepositoryImpl } from "../../data/repositories/authRepository";

const { verify } = new AuthRepositoryImpl();

export const VerifyUseCase = async (email: string, token: string):Promise<any> => {
    return await verify(email,token);
}