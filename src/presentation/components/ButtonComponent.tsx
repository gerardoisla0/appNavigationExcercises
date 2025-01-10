import React from 'react'
import { Button } from 'react-native-paper';

interface Props {
    onAction: () => void;
    label: string;
}

export const ButtonComponent = (
    {onAction, label}:Props
) => {
  return (
    <Button
        onPress={() => onAction()}
        mode="contained"
        textColor='black'
        style={{marginBottom: 15}}
    >
       {label}
    </Button>
  )
}
