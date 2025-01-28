import React, { useState } from 'react'
import { Image, StyleSheet, Text, View} from 'react-native'
import { colors } from '../../theme/theme';
import { Background } from '../../components/Background';
import { TextInput } from '../../components/TextInput';
import { Button, Dialog, Portal } from 'react-native-paper';
import { emailValidator, nameValidator, passwordValidator } from '../../utils/Validators';
import { RegisterUseCase } from '../../../domain/useCases/registerUser';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackPrams } from '../../routes/StackNavigation';

interface Props extends StackScreenProps<RootStackPrams, 'RegisterScreen'>{};

export const RegisterScreen = ({navigation}: Props) => {

    const [name, setName] = useState({ value: '', error: ''});
    const [email, setEmail] = useState({ value: '', error: ''});
    const [password, setPassword] = useState({ value: '', error: ''});
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');

    const _onSignUpPressed = async () => {
        const nameError = nameValidator(name.value);
        const emailError = emailValidator(email.value);
        const pwdError = passwordValidator(password.value);

        if( emailError || pwdError || nameError){
            setName({...name, error: nameError});
            setEmail({...email, error: emailError});
            setPassword({...password, error: pwdError});
            return;
        }

        try{
            const userCreated = await RegisterUseCase( email.value, password.value, name.value );
            if(userCreated != null){
              setMessage("Usuario creado correctamente");
              showDialog();
            }else{
              setMessage("Ocurrio un error al crear");
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
        <Text style={styles.header}>Crear Cuenta</Text>
        <Image source={require('../../../../assets/logo.png')} style={styles.image} />
        <TextInput
            label="Nombre"
            value={name.value}
            onChangeText={(text) => setName({value: text, error: ''})}
            error={!!name.error}
            errorText={name.error} 
        />
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
            onPress={_onSignUpPressed}
            style={styles.button}
        >
            Registrarme
        </Button>

        <View style={styles.row}>
          <Text style={styles.label}>Ya tienes una cuenta?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={styles.link}>Ir a Login</Text>
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