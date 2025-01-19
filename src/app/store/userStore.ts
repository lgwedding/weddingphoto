import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const useUserStore = (set: any) => ({
  currentUser: { id: 0 },
  setCurrent: (user: any) => {
    set(() => ({
      currentUser: user,
    }));
  },
});

export default create(
  devtools(
    persist(useUserStore, {
      name: "user",
    })
  )
);
