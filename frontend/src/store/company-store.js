import { create } from "zustand";
import { persist } from "zustand/middleware";

// Hook made with zustand to store the state of the current company
export const useGetCurrentCompany = create()(
  persist(
    (set) => ({
      currentCompany: null,
      setCurrentCompany: (company) => set(() => ({ currentCompany: company })),
    }),
    { name: "current_company" }
  )
);
