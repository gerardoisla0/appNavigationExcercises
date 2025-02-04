import { User } from '../../domain/entities/users';
import { AuthRepository } from '../../domain/repositories/authRepository.interface';
import { AuthMapper } from '../mappers/auth.mapper';
import { backendDM } from '../sources/remote/api/backendDM';
import { AuthUser } from '../sources/remote/interface/authUser.interface';
import { BackendUser } from '../sources/remote/interface/backendDM.interface';
import auth from '@react-native-firebase/auth'

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
    async login(email: string, password: string): Promise<string> {
        try{
  
            const userCredentials =  await auth().signInWithEmailAndPassword(email,password);
            
            const idToken = await userCredentials.user.getIdToken();

            console.log('Token :',idToken);

            return idToken;
            
        }catch(error:any){
            console.log(error);
            throw new Error(error.response?.data?.message || error.message);
        }
    }

    async verify(email: string, token: string): Promise<AuthUser> {
        try{
            const url = '/auth/verify';
            const inputData = {
                "email": email,
                "token": token
            }

            const {data} =  await backendDM.post<AuthUser>(url,inputData);

            return data;
            
        }catch(error:any){
            console.log(error);
            throw new Error(error.response?.data?.message || error.message);
        }
    }

}