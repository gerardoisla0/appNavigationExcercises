import ImageColors from "react-native-image-colors";

export const getColorDominant = async (imagenUrl: string) => {

    const defaultColor = 'grey';

    const colors = await ImageColors.getColors(imagenUrl, { fallback: defaultColor});

    switch(colors.platform){
        case 'android':
            return colors.dominant ?? defaultColor;
        case 'ios':
            return colors.background ?? defaultColor;
        default:
            return defaultColor;
    }
}
