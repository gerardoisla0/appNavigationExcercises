import { StackNavigation } from './presentation/routes/StackNavigation';
import { ThemeContextProvider } from './presentation/context/ThemeContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient()

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContextProvider>
          <StackNavigation />
      </ThemeContextProvider>
    </QueryClientProvider>
  )
}