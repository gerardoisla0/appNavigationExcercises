import React, { useEffect } from 'react'
import { Image, Text, View } from 'react-native'
import { styles } from '../../theme/theme'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { RootStackPrams } from '../../routes/StackNavigation'

export const PokemonScreen = () => {

    const params = useRoute<RouteProp<RootStackPrams, 'Pokemon'>>().params;
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
                title: params.name
            }
        )
    }, [])

  return (
    <View style={styles.containerPokemon}>
        <Image source= {{
            uri: params.imageUrl
        }}
            style={{width:200, height:200}}
        />
        <Text style={styles.title}>Pokemon N°{params.id} - {params.name}</Text>
    </View>
  )
}
