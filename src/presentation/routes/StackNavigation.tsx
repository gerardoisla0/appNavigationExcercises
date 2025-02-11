import { createStackNavigator } from '@react-navigation/stack';
import { PokemonsScreen } from '../screens/pokemons/PokemonsScreen';
import { HomeScreen } from '../screens/home/HomeScreen';
import { SettingScreen } from '../screens/settings/SettingScreen';
import { PokemonScreen } from '../screens/pokemons/PokemonScreen';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { RegisterScreen } from '../screens/auth/RegisterScreen';
import { LoadingScreen } from '../screens/auth/LoadingScreen';
import { ChatFScreen } from '../screens/settings/ChatFScreen';

export type RootStackPrams = {
  Home: undefined,
  Pokemons:undefined,
  Settings:undefined,
  ChatFS:undefined,
  Pokemon: {id: number},
  LoginScreen: undefined,
  RegisterScreen: undefined,
  LoadingScreen: undefined,
}
const Stack = createStackNavigator<RootStackPrams>();

export const StackNavigation = () => {

  return (
    <Stack.Navigator
      initialRouteName='LoadingScreen'
      screenOptions = {{
        headerShown: false,
        headerStyle:{
          shadowColor: 'transparent'
        }
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Pokemons" component={PokemonsScreen} />
      <Stack.Screen name="Settings" component={SettingScreen} />
      <Stack.Screen name="ChatFS" component={ChatFScreen} />
      <Stack.Screen name="Pokemon" component={PokemonScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
    </Stack.Navigator>
  );
  
}
