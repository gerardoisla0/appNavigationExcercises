import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { PropsWithChildren, useEffect } from "react"
import { RootStackPrams } from "../routes/StackNavigation"
import { useAuthStore } from "../hooks/useAuthStore"

export const AuthProvider = ({children}: PropsWithChildren) => {

  const navigation = useNavigation<StackNavigationProp<RootStackPrams>>();
  const {verify, status} = useAuthStore();

  useEffect(() =>{
        verify();
  },[]);

  useEffect(() => {
    if( status !== 'checking'){
        if( status === 'authenticated'){
            navigation.reset({
                index: 0,
                routes: [{ name: 'Home'}]
            });
        }
    }else{
        navigation.reset({
            index: 0,
            routes: [{ name: 'LoginScreen'}]
        });
    }
  }, [status])

  return (
    <>{children}</>
  )
}
