import { createContext, PropsWithChildren, useEffect, useMemo, useState } from 'react'
import { Alert, PermissionsAndroid } from 'react-native';
import messaging from '@react-native-firebase/messaging';

type FirebaseContextType = {
    fcmToken: string | null;
    requestPermission: () => void;
}

export const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined);

export const FirebaseProvider = ({children}: PropsWithChildren) => {
    const [fcmToken, setFcmToken] = useState<string | null>(null);

    const requestPermission = async () => {

        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
        if(granted === PermissionsAndroid.RESULTS.GRANTED){
            console.log('Permiso para notificacion ok');
            const fcmToken = await messaging().getToken();
            console.log(fcmToken);
            setFcmToken(fcmToken)
        }else{
            console.log('Permiso denegado');
        }
    }

    useEffect(() => {
        requestPermission();

        const unsubscribeOnMessage = messaging().onMessage( async remoteMessage => {
            console.log('Mensaje dentro del primer plano', remoteMessage);
            Alert.alert('Nuevo mensaje Indeci', remoteMessage.notification?.body ?? 'Tienes un mensaje');
        });

        messaging().setBackgroundMessageHandler(async remoteMessage => {
            console.log('Mensaje dentro del segundo plano', remoteMessage);
        });

        return () => unsubscribeOnMessage();

    }, [])

    const value = useMemo(() => ({
        fcmToken,
        requestPermission
    }), [fcmToken])

  return (
    <FirebaseContext.Provider value={value}>
        {children}
    </FirebaseContext.Provider>
  )

}
