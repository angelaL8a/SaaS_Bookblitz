import { create } from "zustand";
import { createId } from "@paralleldrive/cuid2";

export const getEmptyAppointment = () => {
  return {
    id: createId(),
    currentPhoto: null,
    previewPhoto: null,

    referencialImageUrl: "",
    referencialImageId: "",
    startTime: {
      hour: "hh",
      minute: "mm",
      time: "aa",
    },
    endTime: {
      hour: "hh",
      minute: "mm",
      time: "aa",
    },
    title: "",
    description: "",
    fee: "0",
    clientId: "",
  };
};

export const useGetScheduleStore = create()((set) => ({
  appointments: [getEmptyAppointment()],
  setAppointments: (value) => set(() => ({ appointments: value })),
  addAppointment: (value) =>
    set((state) => ({ appointments: [...state.appointments, value] })),
  removeAppointment: (value) =>
    set((state) => ({
      appointments: state.appointments.filter((s) => s.id !== value.id),
    })),
  updateAppointment: (updatedValue) =>
    set((state) => ({
      appointments: state.appointments.map((s) =>
        s.id === updatedValue.id ? updatedValue : s
      ),
    })),
}));
