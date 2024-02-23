import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const convertToJSDate = ({ hour, minute, time }) => {
  let hour24 = parseInt(hour);

  if (time === "PM" && hour24 !== 12) {
    hour24 += 12;
  }

  if (time === "AM" && hour24 === 12) {
    hour24 = 0;
  }

  const date = new Date();
  date.setHours(hour24);
  date.setMinutes(parseInt(minute));
  date.setSeconds(0);

  // Get year, month, and day
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  // Get hours, minutes, and seconds
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  // Construct the formatted date string
  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  return formattedDate;
};
