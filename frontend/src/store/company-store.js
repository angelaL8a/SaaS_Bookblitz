import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useGetCurrentCompany = create()(
  persist(
    (set) => ({
      currentCompany: null,
      setCurrentCompany: (company) => set(() => ({ currentCompany: company })),
    }),
    { name: "current_company" }
  )
);
