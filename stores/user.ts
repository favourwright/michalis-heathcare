import { create } from 'zustand'

export type UserState = {
  email: string
  isVerified?: boolean
}

export type GetStartedActions = {
  setEmail: (email: string) => void
  updateIsVerified: (isVerified: boolean) => void
}

export type UserStore = UserState & GetStartedActions

export const defaultInitState: UserState = {
  email: '',
  isVerified: false,
}

const useUserStore = create<UserStore>((set) => ({
  ...defaultInitState,
  setEmail: (email: string) => set({ email }),
  updateIsVerified: (isVerified: boolean) => set({ isVerified }),
}))

export default useUserStore