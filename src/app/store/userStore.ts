import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface User {
  id: number;
  email?: string;
  name?: string;
  role?: string;
}

interface UserState {
  currentUser: User;
  setCurrent: (user: User) => void;
}

const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        currentUser: { id: 0 },
        setCurrent: (user) => set({ currentUser: user }),
      }),
      {
        name: "user-storage",
      }
    )
  )
);

export default useUserStore;
