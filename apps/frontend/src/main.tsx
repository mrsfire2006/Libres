
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from "react-helmet-async";
import './index.css'

import { ThemeProvider } from 'next-themes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import AppRouter from './routes/index'
import { Toaster } from "sonner";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      refetchOnWindowFocus: false,
      retry: 1,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: false,
    },
  }
})





createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider >

      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AppRouter />
        </ThemeProvider>
        <Toaster />
      </QueryClientProvider>
    </HelmetProvider>

  </StrictMode>,
)
