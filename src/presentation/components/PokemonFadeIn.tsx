import React, { useEffect, useRef, useState } from 'react'
import { View, Image, Animated, StyleProp, ImageStyle } from 'react-native';
import { useAnimation } from '../hooks/useAnimation';
import { ActivityIndicator } from 'react-native-paper';

interface Props{
    uri: string;
    style?: StyleProp<ImageStyle>;
}

export const PokemonFadeIn = ({uri,style}:Props) => {
    const {animatedOpacity, fadeIn} = useAnimation();
    const [isLoading, setIsLoading] = useState(true);

    const isDisposed = useRef(false);

    useEffect(() => {
        return () => {
            isDisposed.current = true;
        }
    },[]);

    const onLoadEnd = () => {
        if (isDisposed.current) return;
        fadeIn({});
        setIsLoading(false);
    }

  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
        {
            isLoading && (<ActivityIndicator />)
        }
        <Animated.Image
            source={{uri}}
            onLoadEnd = {onLoadEnd}
            style= {[style,{opacity: animatedOpacity}]}
        />
    </View>
  )
}
