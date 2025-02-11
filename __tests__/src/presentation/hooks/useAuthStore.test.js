import { renderHook, act } from "@testing-library/react-hooks";
import { useAuthStore } from "../../../../src/presentation/hooks/useAuthStore";


jest.mock('../../../../src/domain/useCases/loginUser', () => ({
    LoginUseCase: jest.fn().mockResolvedValue('token')
}));

jest.mock('../../../../src/domain/useCases/verifyToken', () => ({
    VerifyUseCase: jest.fn().mockResolvedValue('User')
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
    getItem: jest.fn().mockResolvedValue('value'),
    setItem: jest.fn(),
    removeItem: jest.fn(),
  }));

  let component;

describe('Hook: useAuthStore', () => {

    beforeEach(() => {
        component = renderHook(() => useAuthStore());
    });

    it('1.- Renderizar Hook"', () => {
        expect(component).toBeDefined();
    });

    it('2.- Verificar que el estado es "checking"', () => {
        expect(component.result.current.status).toBe('checking');
    });

    it('3.- debe cambiar el estado a "unauthenticated" si la validación de login falla', async () => {
            
        await act(async () => {
          await component.result.current.login('test@example.com', 'password');
        });
    
        expect(component.result.current.status).toBe('checking');
      });
    
      it('4.- debe cambiar el estado a "authenticated" si el login es exitoso', async () => {
        
        await act(async () => {
          await component.result.current.login('test@example.com', 'password');
          await component.result.current.verify();
        });
        
        expect(component.result.current.status).toBe('authenticated');
      });
});