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
        textColor='white'
        style={{width: '47%', justifyContent: "center"}}
    >
       {label}
    </Button>
  )
}
