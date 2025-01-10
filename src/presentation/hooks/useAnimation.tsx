import React, { useRef } from 'react'
import { Animated } from 'react-native'

export const useAnimation = () => {

    const animatedOpacity = useRef(new Animated.Value(0)).current; 

    const fadeIn = ({duration = 2000, toValue = 1, callback = () => {}}) => {
        Animated.timing(animatedOpacity, {
            toValue: duration,
            duration: toValue,
            useNativeDriver: true,
          }).start(callback);
    }

    const fadeOut = ({duration = 300, toValue = 0, callback = () => {}}) => {
        Animated.timing(animatedOpacity, {
            toValue: duration,
            duration: toValue,
            useNativeDriver: true,
          }).start(callback);
    }

  return {
    animatedOpacity,
    fadeIn,
    fadeOut
  }
}
