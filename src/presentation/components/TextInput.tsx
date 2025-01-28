import { StyleSheet, Text, View } from 'react-native';
import {TextInput as Input} from 'react-native-paper';
import { colors } from '../theme/theme';

type Props = React.ComponentProps<typeof Input> & {errorText?: string}

export const TextInput = ({errorText, ...props}: Props) => {
  return (
    <View style={styles.container} >
        <Input 
            style={styles.input}
            selectionColor={colors.primary}
            underlineColor='transparent'
            mode='outlined'
            {...props}
        />
        {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
      width: '100%',
      marginVertical: 12,
    },
    input: {
      backgroundColor: colors.surface,
    },
    error: {
      fontSize: 14,
      color: colors.error,
      paddingHorizontal: 4,
      paddingTop: 4,
    },
  });