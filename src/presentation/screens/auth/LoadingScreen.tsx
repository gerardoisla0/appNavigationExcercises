import React from 'react'
import { View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'

export const LoadingScreen = () => {
  return (
    <View style={{flex:1, justifyContent: 'center' , alignItems: 'center' }}>
        <ActivityIndicator />
    </View>
  )
}
