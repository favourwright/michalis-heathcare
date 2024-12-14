'use client'
import { ReactLenis } from 'lenis/react'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { AuthProvider } from '@/context/auth'

const queryClient = new QueryClient()
export function Providers({children}: { children: React.ReactNode }) {
  return (
    <ReactLenis root>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>{children}</AuthProvider>
      </QueryClientProvider>
    </ReactLenis>
  )
}