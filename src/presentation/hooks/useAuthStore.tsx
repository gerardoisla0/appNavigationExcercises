import { create } from "zustand";
import { AuthStatus } from "../../domain/entities/authState"
import { User } from "../../domain/entities/users"
import { LoginUseCase } from "../../domain/useCases/loginUser";
import { VerifyUseCase } from "../../domain/useCases/verifyToken";
import { StorageAdapter } from "../../data/sources/local/storage-adapter";

export interface AuthState{
    status: AuthStatus,
    token?: string,
    user?: User

    login: (email: string, password: string) => Promise<any>;
    verify: () => Promise<void>;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()((set,get) => ({
    status: 'checking',
    token: undefined,
    user: undefined,

    login: async (email: string, password: string): Promise<any> => {
        const resp = await LoginUseCase(email,password);
        if(!resp){
            set({status: 'unauthenticated', token: undefined, user: undefined})
            return resp;
        }
        await StorageAdapter.setItem('token', resp);        
        await StorageAdapter.setItem('email', email);
        return resp;
    },
    verify: async () => {

        const token = await StorageAdapter.getItem('token') ?? '';        
        const email = await StorageAdapter.getItem('email') ?? '';

        if(email == '' || token == ''){
            set({status: 'unauthenticated', token: undefined, user: undefined})
            return null;
        }

        const resp = await VerifyUseCase(email,token);
        if(!resp){
            set({status: 'unauthenticated', token: undefined, user: undefined})
            return resp;
        }
        set({status: 'authenticated', token: token, user: resp})
        return resp;
    },
    logout: async () => {
        await StorageAdapter.removeItem('token');        
        await StorageAdapter.removeItem('email');
        set({status: 'unauthenticated', token: undefined, user: undefined})
        console.log('logout')
    }

}))