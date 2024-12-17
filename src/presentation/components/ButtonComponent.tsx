import React from 'react'
import { Pressable, Text } from 'react-native'
import { styles } from '../theme/theme';

interface Props {
    onAction: () => void;
    label: string;
}

export const ButtonComponent = (
    {onAction, label}:Props
) => {
  return (
    <Pressable
        onPress={() => onAction()}
        style={styles.button}
    >
        <Text style={styles.buttonText}>{label}</Text>
    </Pressable>
  )
}
