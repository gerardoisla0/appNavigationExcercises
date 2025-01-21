import React, { useContext } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { RootStackPrams } from '../../routes/StackNavigation'
import { StackScreenProps } from '@react-navigation/stack'
import { useQuery } from '@tanstack/react-query'
import { GetPokemonUseCaseById } from '../../../domain/useCases/getPokemonById'
import { FullScreenLoader } from '../../components/FullScreenLoader'
import { ScrollView } from 'react-native-gesture-handler'
import { PokemonFadeIn } from '../../components/PokemonFadeIn'
import { Chip } from 'react-native-paper'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ThemeContext } from '../../context/ThemeContext'

interface Props extends StackScreenProps<RootStackPrams, 'Pokemon'>{}

export const PokemonScreen = ({navigation, route}:Props) => {

    const {id} = route.params;
    const {top} = useSafeAreaInsets();

    const {isDark} = useContext(ThemeContext);

    const pokeballImg = isDark? require('../../../../assets/pokeball-light.png') : 
                      require('../../../../assets/pokeball-dark.png');
  

    const {data: pokemon} = useQuery({
        queryKey: ['pokemon', id],
        queryFn: () => GetPokemonUseCaseById(id),
        staleTime: 1000 * 60 * 60
    });

    if(!pokemon){
        return <FullScreenLoader />
    }

  return (
    <ScrollView
    style= {{flex:1, backgroundColor: pokemon.color }}
        bounces={false}
        showsVerticalScrollIndicator={false}
    >
        <View style={styles.headerContainer}>
            <Text
            style={{...styles.pokemonName,
                top: top + 5
            }}>
                {pokemon.name}
            </Text>

            <Image source={pokeballImg} style={styles.pokeball} />
            <PokemonFadeIn uri={pokemon.avatar} style={styles.pokemonImage} ></PokemonFadeIn>
        </View>

        <View
        style={{flexDirection: 'row', marginHorizontal: 20, marginTop: 10}}>
            { pokemon.type.map( type => (
                <Chip
                key={type}
                mode="outlined"
                selectedColor="white"
                style={{marginLeft:10}}
                >
                    {type}
                </Chip>
            ))
            }
        </View> 

    </ScrollView>
  )
}

const styles = StyleSheet.create({
    headerContainer: {
      height: 370,
      zIndex: 999,
      alignItems: 'center',
      borderBottomRightRadius: 1000,
      borderBottomLeftRadius: 1000,
      backgroundColor: 'rgba(0,0,0,0.2)',
    },
    pokemonName: {
      color: 'white',
      fontSize: 40,
      alignSelf: 'flex-start',
      left: 20,
    },
    pokeball: {
      width: 250,
      height: 250,
      bottom: -20,
      opacity: 0.7,
    },
    pokemonImage: {
      width: 240,
      height: 240,
      position: 'absolute',
      bottom: -40,
    },
    loadingIndicator: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    subTitle: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
      marginHorizontal: 20,
      marginTop: 20,
    },
    statsContainer: {
      flexDirection: 'column',
      marginHorizontal: 20,
      alignItems: 'center',
    },
  });