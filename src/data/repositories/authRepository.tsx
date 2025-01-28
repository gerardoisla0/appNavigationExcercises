import { User } from '../../domain/entities/users';
import { AuthRepository } from '../../domain/repositories/authRepository.interface';
import { AuthMapper } from '../mappers/auth.mapper';
import { backendDM } from '../sources/remote/api/backendDM';
import { BackendUser } from '../sources/remote/interface/backendDM.interface';


export class AuthRepositoryImpl implements AuthRepository{

    async registerUser(email: string, password: string, fullName: string): Promise<User | undefined> {
        try{
            const url = '/auth/register';
            const inputData = {
                "email": email,
                "password": password,
                "fullName": fullName
            }
            const {data} = await backendDM.post<BackendUser>(url,inputData);

            const user = AuthMapper.backEndUserToEntity(data);

            return user;
            
        }catch(error:any){
            console.log(error);
            throw new Error(error.response?.data?.message || error.message);
        }
    }
    login(email: string, password: string): Promise<string> {
        throw new Error('Method not implemented.');
    }
    checkStatus(email: string, token: string): Promise<User> {
        throw new Error('Method not implemented.');
    }

}