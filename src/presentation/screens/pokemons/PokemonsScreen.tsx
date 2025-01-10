import React from 'react'
import { Image, View } from 'react-native'
import { globalTheme, styles } from '../../theme/theme';
import { FlatList, Pressable } from 'react-native-gesture-handler';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackPrams } from '../../routes/StackNavigation';
import { GetPokemonUseCase } from '../../../domain/useCases/getPokemon';
import { PokeballBackground } from '../../components/PokeballBackground';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { ActivityIndicator, Text } from 'react-native-paper';
import { PokemonCard } from '../../components/PokemonCard';

//https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png

interface Pokemon {
  id: string,
  name: string,
  imageUrl?: string
}

export const PokemonsScreen = () => {

  const navigation = useNavigation<NavigationProp<RootStackPrams>>();
  
  //const pokemons = GetPokemonUseCase(0,20);
  
  const {isLoading, data, fetchNextPage} = useInfiniteQuery({
    queryKey: ['pokemons','infinite'],
    initialPageParam: 0,
    queryFn: (params) => GetPokemonUseCase(params.pageParam,20),
    getNextPageParam: (lastPage, pages) => pages.length,
    staleTime: 1000 * 60 * 60
  });

  if(isLoading){
    return <ActivityIndicator />
  }

  return (
    <View style={globalTheme.globalMargin}>
      <PokeballBackground style={globalTheme.imgPosition} />

        <FlatList
          data={ data?.pages.flat() ?? []} 
          keyExtractor={ (pokemon, index) =>  `${pokemon.id}-${index}`}
          numColumns={2}
          ListHeaderComponent={ () => <Text variant="displayMedium">Lista de Pokemon</Text>}
          renderItem={ ({item}) => ( 
              <PokemonCard pokemon={item}/>
          )
          }
          onStartReachedThreshold={0.6}
          onEndReached= {() => fetchNextPage()}
        /> 
    </View>
  );
}
