import { create } from 'zustand'

export type GetStartedState = {
  showModal: boolean
  email: string
  processing: boolean
}

export type GetStartedActions = {
  openModal: () => void
  closeModal: () => void
  setProcessing: (processing: boolean) => void
  reset: () => void
}

export type GetStartedStore = GetStartedState & GetStartedActions

export const defaultInitState: GetStartedState = {
  showModal: false,
  email: '',
  processing: false,
}

const useGetStartedStore = create<GetStartedStore>((set) => ({
  ...defaultInitState,
  openModal: () => set({ showModal: true }),
  closeModal: () => set({ showModal: false }),
  setEmail: (email: string) => set({ email }),
  setProcessing: (processing: boolean) => set({ processing }),
  reset: () => set(defaultInitState),
}))

export default useGetStartedStore