import { create } from "zustand";
import { createId } from "@paralleldrive/cuid2";
import { useEffect } from "react";
import { useMemo } from "react";
import { useCallback } from "react";

export const defaultTime = {
  hour: "hh",
  minute: "mm",
  time: "aa",
};

export const getEmptyAppointment = () => {
  return {
    id: createId(),
    currentPhoto: null,
    previewPhoto: null,

    referencialImageUrl: "",
    referencialImageId: "",
    startTime: defaultTime,
    endTime: defaultTime,
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
  resetAppointments: () =>
    set(() => ({
      appointments: [getEmptyAppointment()],
    })),

  daysOfWeek: [],
  setDaysOfWeek: (value) => set(() => ({ daysOfWeek: value })),
  addDay: (value) =>
    set((state) => ({ daysOfWeek: [...state.daysOfWeek, value] })),
}));

export const useGetDays = () => {
  const { daysOfWeek, setDaysOfWeek } = useGetScheduleStore();

  // Get the current date in UTC
  const currentDate = useMemo(() => new Date(new Date().toUTCString()), []);

  // Format the date as "MMM DD" in UTC
  const formatDate = useCallback((date) => {
    if (date) {
      const options = { month: "short", day: "numeric" };
      return date.toLocaleDateString("en-US", { ...options, timeZone: "UTC" });
    }
  }, []);

  const getDays = useCallback(() => {
    // Get the current day of the week (0 is Sunday, 1 is Monday, ..., 6 is Saturday)
    const currentDayOfWeek = currentDate.getUTCDay();

    // Calculate the starting day of the week (Monday)
    const startingDayOfWeek = new Date(currentDate);
    const mondayOffset = currentDayOfWeek === 0 ? -6 : 1;
    startingDayOfWeek.setUTCDate(
      currentDate.getUTCDate() - currentDayOfWeek + mondayOffset
    );

    // Loop through the days of the week (Monday to Sunday)
    let days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startingDayOfWeek);

      day.setUTCDate(startingDayOfWeek.getUTCDate() + i);
      days.push({
        formattedDay: formatDate(day),
        dayName: day.toLocaleDateString("en-US", {
          weekday: "long",
          timeZone: "UTC",
        }),
        dayNumber: day.getUTCDate(),
        monthNumber: day.getUTCMonth(),
        monthName: day.toLocaleDateString("en-US", {
          month: "long",
          timeZone: "UTC",
        }),
        year: day.getUTCFullYear(),
      });
    }

    return days;
  }, [currentDate, formatDate]);

  useEffect(() => {
    setDaysOfWeek(getDays());
  }, [setDaysOfWeek, getDays]);

  return { formatDate, daysOfWeek, currentDate };
};
