import React from 'react';
import {render} from '@testing-library/react-native';
import { PokemonsScreen } from '../../../../../src/presentation/screens/pokemons/PokemonsScreen';

let component;

jest.mock('@react-navigation/native', () => ({
    NavigationProp: jest.fn(),
    useNavigation: jest.fn(),
}));

jest.mock('../../../../../src/presentation/context/ThemeContext', () => ({
    ThemeContext: jest.fn()
}));

jest.spyOn(React, 'useContext').mockImplementation(() => ({}));

jest.mock('../../../../../src/presentation/components/PokemonFadeIn', () => ({
    PokemonFadeIn: jest.fn()
}));

jest.mock('@tanstack/react-query', () => ({
    useInfiniteQuery: jest.fn().mockReturnValue({
        data: {
            pages: [
                [
                    {
                        id: 10,
                        name: 'Bulbasaur',
                        type: ['Hierba']
                    }
                ]
            ]
        },
        isLoading: false
    })
}));

describe('<PokemonsScreen />', () => {

    beforeEach(() => {
        component = render(<PokemonsScreen />);
    });

    it('1.- Debe renderizar correctamente el Componente', () => {
        expect(component).toBeDefined();
    });

    it('1.- Debe renderizar el pokemon 10 - Bulbasaur', () => {
        const pokemonCard = component.getByTestId('pokemon-10');
        expect(pokemonCard).toBeDefined();
    });

});