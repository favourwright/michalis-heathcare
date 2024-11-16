'use client'
import { ReactLenis } from 'lenis/react'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()
export function Providers({children}: { children: React.ReactNode }) {
  return (
    <ReactLenis root>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </ReactLenis>
  )
}