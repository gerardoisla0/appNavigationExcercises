import React from 'react'
import {  View, FlatList } from 'react-native'
import { globalTheme } from '../../theme/theme';
import { GetPokemonUseCase } from '../../../domain/useCases/getPokemon';
import { PokeballBackground } from '../../components/PokeballBackground';
import { useInfiniteQuery } from '@tanstack/react-query';
import {  Text } from 'react-native-paper';
import { PokemonCard } from '../../components/PokemonCard';
import { FullScreenLoader } from '../../components/FullScreenLoader';

export const PokemonsScreen = () => {
  
  const {isLoading, data, fetchNextPage} = useInfiniteQuery({
    queryKey: ['pokemons','infinite'],
    initialPageParam: 0,
    queryFn: (params) => GetPokemonUseCase(params.pageParam,20),
    getNextPageParam: (lastPage, pages) => pages.length,
    staleTime: 1000 * 60 * 60
  });

  if(isLoading){
    return <FullScreenLoader />
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
