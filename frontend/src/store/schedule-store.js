import { create } from "zustand";
import { createId } from "@paralleldrive/cuid2";
import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";

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

  // State to keep track of the current week's start date
  const [currentWeekStartDate, setCurrentWeekStartDate] = useState(() => {
    const today = new Date();
    const currentDayOfWeek = today.getUTCDay();
    const mondayOffset = currentDayOfWeek === 0 ? -6 : 1;
    const startingDayOfWeek = new Date(today);
    startingDayOfWeek.setUTCDate(
      today.getUTCDate() - currentDayOfWeek + mondayOffset
    );
    return startingDayOfWeek;
  });

  // Format the date as "MMM DD" in UTC
  const formatDate = useCallback((date) => {
    if (date) {
      const options = { month: "short", day: "numeric" };
      return date.toLocaleDateString("en-US", { ...options, timeZone: "UTC" });
    }
  }, []);

  const getDays = useCallback(() => {
    // Initialize the starting day of the week from currentWeekStartDate
    let startingDayOfWeek = new Date(currentWeekStartDate);

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
  }, [currentWeekStartDate, formatDate]);

  const nextWeek = () => {
    const nextWeekStartDate = new Date(currentWeekStartDate);
    nextWeekStartDate.setUTCDate(nextWeekStartDate.getUTCDate() + 7);
    setCurrentWeekStartDate(nextWeekStartDate);
  };

  const prevWeek = () => {
    const prevWeekStartDate = new Date(currentWeekStartDate);
    prevWeekStartDate.setUTCDate(prevWeekStartDate.getUTCDate() - 7);
    setCurrentWeekStartDate(prevWeekStartDate);
  };

  useEffect(() => {
    setDaysOfWeek(getDays());
  }, [setDaysOfWeek, getDays]);

  return { formatDate, daysOfWeek, nextWeek, prevWeek, currentWeekStartDate };
};
