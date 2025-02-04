import { StyleSheet } from "react-native"

export const colors = {
    primary: 'purple',
    dark: 'black',
    light: 'white',
    surface: '#c2c2c2',
    error: 'red'
}

export const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:20
    },
    containerPokemon:{
        flex:1,
        padding:20,
        alignItems: 'center'
    },
    button :{
        backgroundColor: colors.primary,
        padding: 10,
        borderRadius: 5,
        margin:10,
        alignItems: 'center'
    },
    buttonText:{
        color: colors.light,
        fontSize: 15
    },
    title:{
        color: colors.dark,
        fontSize: 30
    },
    imagePokemon:{
        width:50,
        height:50
    }
})

export const globalTheme = StyleSheet.create({
    globalMargin: {
      marginHorizontal: 20
    },
    imgPosition: {
        position: 'absolute',
        top: -100,
        right: -100,
    },
    buttonMenu: {
        flexDirection: "row", 
        flexWrap:"wrap", 
        gap:5
    }
  })