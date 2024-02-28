import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { axiosClient } from "./axios";

export const pastelColors = [
  "#FFD6C0",
  "#FBB",
  "#9FF5CE",
  "#F1BEF3",
  "#A4E2FB",
  "#F2C18D",
  "#F6F193",
  "#C5EBAA",
  "#FDFFAB",
  "#FFCF81",
  "#FFB996",
  "#D9EDBF",
  "#D7E5CA",
  "#F9F3CC",
  "#D2E0FB",
];

export const gradientPastelColors = [
  "[background:linear-gradient(180deg,#FFD6C0_0%,#FFC1AA_100%)]",
  "[background:linear-gradient(180deg,#9FF5CE_0%,#7AFFC3_100%)]",
  "[background:linear-gradient(180deg,#F1BEF3_0%,#FB89FF_100%)]",
  "[background:linear-gradient(180deg,#DDBDFF_0%,#D4ABFF_100%)]",
  "[background:linear-gradient(180deg,#A4E2FB_0%,#89DDFF_100%)]",
  "[background:linear-gradient(180deg,#FBB_0%,#FFADAD_100%)]",
];

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getRandomPastelColor() {
  const hue = Math.floor(Math.random() * 360);
  const pastelness = Math.floor(Math.random() * 50) + 50;
  const saturation = Math.floor(Math.random() * 20) + 70;

  const hslToRgb = (h, s, l) => {
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;
    let r, g, b;
    if (h < 60) {
      [r, g, b] = [c, x, 0];
    } else if (h < 120) {
      [r, g, b] = [x, c, 0];
    } else if (h < 180) {
      [r, g, b] = [0, c, x];
    } else if (h < 240) {
      [r, g, b] = [0, x, c];
    } else if (h < 300) {
      [r, g, b] = [x, 0, c];
    } else {
      [r, g, b] = [c, 0, x];
    }
    return [(r + m) * 255, (g + m) * 255, (b + m) * 255];
  };

  const [r, g, b] = hslToRgb(hue, saturation / 100, pastelness / 100);

  return `rgb(${Math.floor(r)}, ${Math.floor(g)}, ${Math.floor(b)})`;
}

export const convertToJSDate = ({ hour, minute, time, year, month, day }) => {
  let hour24 = parseInt(hour);

  if (time === "PM" && hour24 !== 12) {
    hour24 += 12;
  }

  if (time === "AM" && hour24 === 12) {
    hour24 = 0;
  }

  const date = new Date();
  date.setUTCHours(hour24);
  date.setUTCMinutes(parseInt(minute));
  date.setUTCSeconds(0);

  // Get hours, minutes, and seconds
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();

  const formattedDate = new Date(
    Date.UTC(year, month, day, hours, minutes, seconds)
  );

  return formattedDate;
};

export const convertFromDate = (dateString) => {
  const date = new Date(dateString);

  const hour = date.getUTCHours();
  const minute = date.getUTCMinutes();
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth();
  const day = date.getUTCDate();

  let hour12 = hour;
  let time = "AM";

  if (hour >= 12) {
    hour12 = hour === 12 ? hour : hour - 12;
    time = "PM";
  }

  if (hour === 0) {
    hour12 = 12;
  }

  return {
    hour: hour12.toString().padStart(2, "0"),
    minute: minute.toString().padStart(2, "0"),
    time,
    year,
    month,
    day,
  };
};

export function convertTime(dateTimeString) {
  function addZero(number) {
    return number < 10 ? "0" + number : number;
  }

  const dateTime = new Date(dateTimeString);

  // Get the hours and minutes
  const hours = dateTime.getUTCHours();
  const minutes = dateTime.getUTCMinutes();

  // Format the time
  const formattedTime = `${addZero(hours)}:${addZero(minutes)}`;

  return formattedTime;
}

export const validCheckTime = (time) => {
  if (time.hour === "hh" || time.minute === "mm" || time.time === "aa") {
    return false;
  }

  return true;
};

export const extractDateInfo = (dateString) => {
  const date = new Date(dateString);

  // Extract the day name
  const dayName = date.toLocaleDateString("en-US", { weekday: "long" });

  // Extract the year
  const year = date.getFullYear();

  // Extract the month name
  const monthName = date.toLocaleDateString("en-US", { month: "long" });

  const dayNumber = date.getUTCDate();

  return {
    dayName: dayName,
    dayNumber: dayNumber,
    year: year,
    monthName: monthName,
  };
};

export const convertToDateTime = (obj) => {
  const formattedDateTime = new Date(
    Date.UTC(obj.year, obj.monthNumber, obj.dayNumber, 5, 0, 0)
  );
  return formattedDateTime;
};

export const getTableDate = (inputDate) => {
  // Convert the date string to a date object
  const date = new Date(inputDate);

  // Define month names and days in an array
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  // Get date components
  const day = date.getUTCDate().toString().padStart(2, "0");
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear().toString();

  // Format the date in the desired format
  return `${day}/${month}/${year}`;
};

export const uploadPhoto = async (currentPhoto) => {
  const formDataToSend = new FormData();
  formDataToSend.append("file", currentPhoto);

  const { data: fileData } = await axiosClient.post(
    "/files/upload",
    formDataToSend,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return {
    secure_url: fileData.secure_url,
    public_id: fileData.public_id,
  };
};

export const deletePhoto = async (userPublicId) => {
  await axiosClient.delete(`/files/remove?public_id=${userPublicId}`);

  return "success";
};
