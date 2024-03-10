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

export const gradientPastelColors = () => {
  const colorsArray = [
    "[background:linear-gradient(180deg,#FFD6C0_0%,#FFC1AA_100%)]",
    "[background:linear-gradient(180deg,#9FF5CE_0%,#7AFFC3_100%)]",
    "[background:linear-gradient(180deg,#F1BEF3_0%,#FB89FF_100%)]",
    "[background:linear-gradient(180deg,#DDBDFF_0%,#D4ABFF_100%)]",
    "[background:linear-gradient(180deg,#A4E2FB_0%,#89DDFF_100%)]",
    "[background:linear-gradient(180deg,#FBB_0%,#FFADAD_100%)]",
  ];

  return colorsArray.map((color) => {
    const textColor = `${color} [background-clip:text]`;

    return {
      textColor,
      color,
    };
  });
};

// Exported function named cn that accepts multiple arguments (any number)
export function cn(...inputs) {
  // Uses the clsx function to combine and generate a CSS class string based on the provided arguments
  // clsx is a library that simplifies the creation of conditional class strings
  // twMerge appears to be a custom function that performs style merging, possibly Tailwind CSS-specific

  // The result is a combined and merged CSS class string
  return twMerge(clsx(inputs));
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

/**
 * Output format:
 * ```
 * {
 *  dayName: "Wednesday",
 *  dayNumber: 12,
 *  year: 2024,
 *  monthName: "May",
 * }
 * ```
 */
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

/**
 * Convert an object like the one "extractDateInfo" returns to a js date.
 */
export const convertToDateTime = (obj) => {
  const formattedDateTime = new Date(
    Date.UTC(obj.year, obj.monthNumber, obj.dayNumber, 5, 0, 0)
  );
  return formattedDateTime;
};

/**
 * Output format: 13/FEB/2024
 */
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

/**
 * Function to upload a photo to cloudinary
 */
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

/**
 * Function to delete a photo from cloudinary
 */
export const deletePhoto = async (userPublicId) => {
  await axiosClient.delete(`/files/remove?public_id=${userPublicId}`);

  return "success";
};
