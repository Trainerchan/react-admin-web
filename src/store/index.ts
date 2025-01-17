import { create } from "zustand";
import { AdminUser } from "@/types/user";
import { createJSONStorage, persist } from "zustand/middleware";


type UserState = {
  user: AdminUser
  auth: boolean
}

type UserAction = {
  setUser: (userData: AdminUser) => void
  setAuth: (authState: boolean) => void
  reset: () => void
}

const initialState: UserState = {
  user: {
    id: 0,
    username: '',
    email: '',
    avatarUrl: '',
  },
  auth: false,
}

const useUserStore = create<UserState & UserAction>()(
  persist(
    (set) => ({
      ...initialState,
      setUser: (userData) => set(() => ({ user: userData })),
      setAuth: (authState) => set(() => ({ auth: authState })),
      reset: () => set(initialState)
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => sessionStorage)

    }
  )
)

export default useUserStore