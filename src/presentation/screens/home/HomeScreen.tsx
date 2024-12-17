import React from 'react'
import { Text, View } from 'react-native'
import { styles } from '../../theme/theme';
import { ButtonComponent } from '../../components/ButtonComponent';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackPrams } from '../../routes/StackNavigation';

export const HomeScreen = () => {

  const navigation = useNavigation<NavigationProp<RootStackPrams>>();

  return (
    <View style={styles.container} >
      <Text style={styles.title}>Bienvenido alumno de IDAT</Text>
      <ButtonComponent
          onAction={ () => navigation.navigate('Pokemons')}
          label="Ir a Lista de Pokemons"
      />
      <ButtonComponent
          onAction={ () => navigation.navigate('Settings')}
          label="Ir a Configuraciones"
      />
    </View>
  );
}
