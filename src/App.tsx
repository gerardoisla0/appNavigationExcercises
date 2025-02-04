import { StackNavigation } from './presentation/routes/StackNavigation';
import { ThemeContextProvider } from './presentation/context/ThemeContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './presentation/context/AuthProvider';
import { FirebaseProvider } from './presentation/context/FirebaseProvider';

const queryClient = new QueryClient()

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContextProvider>
        <AuthProvider>
          <FirebaseProvider>
            <StackNavigation />
          </FirebaseProvider> 
        </AuthProvider>
      </ThemeContextProvider>
    </QueryClientProvider>
  )
}