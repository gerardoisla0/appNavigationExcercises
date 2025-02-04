import React from 'react'
import { View } from 'react-native'
import { globalTheme, styles } from '../../theme/theme';
import { ButtonComponent } from '../../components/ButtonComponent';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackPrams } from '../../routes/StackNavigation';
import { Text } from 'react-native-paper';
import { useAuthStore } from '../../hooks/useAuthStore';
import { PokeballBackground } from '../../components/PokeballBackground';

export const HomeScreen = () => {

  const navigation = useNavigation<NavigationProp<RootStackPrams>>();
  const {logout} = useAuthStore();

  return (
    <View style={globalTheme.globalMargin} >

      <PokeballBackground style={globalTheme.imgPosition} />

      <View style={globalTheme.buttonMenu} >
        <Text variant='headlineLarge' style={{color:'black'}}>Bienvenido alumno de IDAT</Text>
        <ButtonComponent
            onAction={ () => navigation.navigate('Pokemons')}
            label="Lista de Pokemons"
        />
        <ButtonComponent
            onAction={ () => navigation.navigate('Settings')}
            label="Buscar Pokemon"
        />
        <ButtonComponent
            onAction={ () => navigation.navigate('Settings')}
            label="Chat Grupal RT"
        />
        <ButtonComponent
            onAction={ () => navigation.navigate('Pokemons')}
            label="Chat Grupal FS"
        />
        <ButtonComponent
              onAction={logout}
            label="Cerrar Sesión"
        />
      </View>
    </View>
  );
}
