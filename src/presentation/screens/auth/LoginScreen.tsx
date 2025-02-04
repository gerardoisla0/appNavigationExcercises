import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react'
import {Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Portal, Dialog, Button } from 'react-native-paper';
import { Background } from '../../components/Background';
import { RootStackPrams } from '../../routes/StackNavigation';
import { colors } from '../../theme/theme';
import { emailValidator, passwordValidator } from '../../utils/Validators';
import { TextInput } from '../../components/TextInput';
import { useAuthStore } from '../../hooks/useAuthStore';

interface Props extends StackScreenProps<RootStackPrams, 'LoginScreen'>{};

export const LoginScreen = ({navigation}: Props) => {

    const {login, verify} = useAuthStore();
    const [email, setEmail] = useState({ value: '', error: ''});
    const [password, setPassword] = useState({ value: '', error: ''});
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [isPosting, setIsPosting] = useState(false);

    const _onLoginInPressed = async () => {
        const emailError = emailValidator(email.value);
        const pwdError = passwordValidator(password.value);

        if( emailError || pwdError ){
            setEmail({...email, error: emailError});
            setPassword({...password, error: pwdError});
            return;
        }

        try{
          setIsPosting(true);
          await login(email.value, password.value);
          const verityUser = await verify();
          setIsPosting(false);
          if(verityUser != null){
            setMessage("Usuario autenticado");
            showDialog();
          }else{
            setMessage("Usuario incorrecto");
            showDialog();
          }
        }catch(error:any){
          setMessage(error.message);
          showDialog();
        }
    }
    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

  return (
    <Background>
        <Portal>
          <Dialog visible={visible}
          onDismiss={hideDialog}
          theme={{colors: {elevation: {level3: colors.surface}, backdrop: 'rgba(0,0,0,0.7)'}}}>
            <Dialog.Title>Mensaje</Dialog.Title>
            <Dialog.Content>
              <Text>{message}</Text>
              </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>OK</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <Text style={styles.header}>Inicio de Sesión</Text>
        <Image source={require('../../../../assets/logo.png')} style={styles.image} />
        <TextInput
            label="Email"
            value={email.value}
            onChangeText={(text) => setEmail({value: text, error: ''})}
            error={!!email.error}
            errorText={email.error} 
            autoCapitalize='none'
            textContentType='emailAddress'
            keyboardType='email-address'
        />
        <TextInput
            label="Password"
            value={password.value}
            onChangeText={(text) => setPassword({value: text, error: ''})}
            error={!!password.error}
            errorText={password.error} 
            secureTextEntry
        />

        <Button 
            mode="contained" 
            onPress={_onLoginInPressed}
            style={styles.button}
            disabled={isPosting}
        >
            Iniciar Sesión
        </Button>

        <View style={styles.row}>
          <Text style={styles.label}>No estas registrado??</Text>
          <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
            <Text style={styles.link}>Crear Cuenta</Text>
          </TouchableOpacity>
        </View>

    </Background>
  )
}

const styles = StyleSheet.create({
    label: {
      color: colors.surface,
      marginRight:5,
    },
    button: {
      marginTop: 24,
    },
    row: {
      flexDirection: 'row',
      marginTop: 4,
    },
    link: {
      fontWeight: 'bold',
      color: colors.primary,
    },
    header: {
        fontSize: 26,
        color: colors.primary,
        fontWeight: 'bold',
        paddingVertical: 14,
      },
    image: {
    width: 128,
    height: 128,
    marginBottom: 12,
    },
  });