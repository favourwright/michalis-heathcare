import { create } from 'zustand'

export type UserState = {
  uid: string | null
  email: string
  isVerified?: boolean
  isSpecialist?: boolean
}

export type GetStartedActions = {
  setUId: (uid: string) => void
  setEmail: (email: string) => void
  updateIsVerified: (isVerified: boolean) => void
  setIsSpecialist: (isSpecialist: boolean) => void
  reset: () => void
}

export type UserStore = UserState & GetStartedActions

export const defaultInitState: UserState = {
  uid: null,
  email: '',
  isVerified: false,
  isSpecialist: false
}

const useUserStore = create<UserStore>((set) => ({
  ...defaultInitState,
  setUId: (uid: string) => set({ uid }),
  setEmail: (email: string) => set({ email }),
  updateIsVerified: (isVerified: boolean) => set({ isVerified }),
  setIsSpecialist: (isSpecialist: boolean) => set({ isSpecialist }),
  reset: () => set(defaultInitState),
}))

export default useUserStore