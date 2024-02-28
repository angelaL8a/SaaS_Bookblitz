import { addDays } from "date-fns";
import { create } from "zustand";

export const defaultRange = {
  from: new Date(),
  to: addDays(new Date(), 31),
};

export const useGetPayrollStore = create()((set) => ({
  dateRange: defaultRange,
  monthRange: defaultRange,
  yearRange: defaultRange,
  setDays: (date) => set(() => ({ dateRange: date })),
  setMonths: (date) => set(() => ({ monthRange: date })),
  setYears: (date) => set(() => ({ yearRange: date })),
}));
