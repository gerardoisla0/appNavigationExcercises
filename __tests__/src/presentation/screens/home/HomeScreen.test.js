import React from 'react';
import {render} from '@testing-library/react-native';
import { HomeScreen } from '../../../../../src/presentation/screens/home/HomeScreen';

let component;

jest.mock('../../../../../src/presentation/hooks/useAuthStore', () => ({
    useAuthStore: jest.fn().mockReturnValue({
        logout: jest.fn()
    })
}));

jest.mock('@react-navigation/native', () => ({
    NavigationProp: jest.fn(),
    useNavigation: jest.fn(),
}));

jest.mock('../../../../../src/presentation/context/ThemeContext', () => ({
    ThemeContext: jest.fn()
}));

jest.spyOn(React, 'useContext').mockImplementation(() => ({}));

describe('<HomeScreen />', () => {

    beforeEach(() => {
        component = render(<HomeScreen />);
    });

    it('1.- Debe renderizar correctamente el Componente', () => {
        expect(component).toBeDefined();
    });

    it('2.- Debe mostrar la imagen de Fondo Pokeball', () => {
        const pokemonBallImg = component.getByTestId('pokeball-img');
        expect(pokemonBallImg).toBeDefined();
    })
});