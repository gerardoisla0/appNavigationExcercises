import { createStackNavigator } from '@react-navigation/stack';
import { PokemonsScreen } from '../screens/pokemons/PokemonsScreen';
import { HomeScreen } from '../screens/home/HomeScreen';
import { SettingScreen } from '../screens/settings/SettingScreen';
import { PokemonScreen } from '../screens/pokemons/PokemonScreen';

export type RootStackPrams = {
  Home: undefined,
  Pokemons:undefined,
  Settings:undefined,
  Pokemon: {id: string, name: string, imageUrl: string}
}
const Stack = createStackNavigator<RootStackPrams>();

export const StackNavigation = () => {

  return (
    <Stack.Navigator
      screenOptions = {{
        headerShown: true,
        headerStyle:{
          shadowColor: 'transparent'
        }
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Pokemons" component={PokemonsScreen} />
      <Stack.Screen name="Settings" component={SettingScreen} />
      <Stack.Screen name="Pokemon" component={PokemonScreen} />
    </Stack.Navigator>
  );
  
}
