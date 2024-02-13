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
