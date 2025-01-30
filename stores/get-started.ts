import { create } from 'zustand'

export type GetStartedState = {
  showModal: boolean
  email: string
}

export type GetStartedActions = {
  openModal: () => void
  closeModal: () => void
}

export type GetStartedStore = GetStartedState & GetStartedActions

export const defaultInitState: GetStartedState = {
  showModal: false,
  email: '',
}

const useGetStartedStore = create<GetStartedStore>((set) => ({
  ...defaultInitState,
  openModal: () => set({ showModal: true }),
  closeModal: () => set({ showModal: false }),
  setEmail: (email: string) => set({ email }),
}))

export default useGetStartedStore