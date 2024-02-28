import PropTypes from "prop-types";
import { cn } from "@/lib/utils";

export const MailIcon = ({ className }) => {
  return (
    <svg
      className={cn("h-8 w-8", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 30 24"
      fill="none"
    >
      <path
        d="M27 0H3C1.35 0 0.015 1.35 0.015 3L0 21C0 22.65 1.35 24 3 24H27C28.65 24 30 22.65 30 21V3C30 1.35 28.65 0 27 0ZM27 6L15 13.5L3 6V3L15 10.5L27 3V6Z"
        fill="#6967A6"
      />
    </svg>
  );
};
MailIcon.propTypes = {
  className: PropTypes.string,
};

export const StarIcon = ({ className }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 23 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-8 w-8 fill-current", className)}
    >
      <path
        id="Star 5"
        d="M11.5 0L15.5557 5.91778L22.4371 7.9463L18.0623 13.6322L18.2595 20.8037L11.5 18.4L4.74047 20.8037L4.93771 13.6322L0.56285 7.9463L7.44428 5.91778L11.5 0Z"
        fill="#ECECEC"
      />
    </svg>
  );
};
StarIcon.propTypes = {
  className: PropTypes.string,
};

export const StarIconFill = ({ className, color }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 23 21"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-8 w-8", className)}
    >
      <path
        id="Star 4"
        d="M11.5 0L15.5557 5.91778L22.4371 7.9463L18.0623 13.6322L18.2595 20.8037L11.5 18.4L4.74047 20.8037L4.93771 13.6322L0.56285 7.9463L7.44428 5.91778L11.5 0Z"
        fill={color}
      />
    </svg>
  );
};
StarIconFill.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
};
