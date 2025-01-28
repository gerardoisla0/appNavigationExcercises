import { User } from "../../domain/entities/users";
import { BackendUser } from "../sources/remote/interface/backendDM.interface";


export class AuthMapper{
    static backEndUserToEntity(user: BackendUser): User{
        return{
            id:         user.uid,
            email:      user.email,
            fullName:   user.displayName,
        }
    }
}