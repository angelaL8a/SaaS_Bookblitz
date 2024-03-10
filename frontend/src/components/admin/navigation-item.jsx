import PropTypes from "prop-types";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const itemVariants = cva(
  "px-12 text-lg font-poppins text-[#A9A9A9] py-2 drop-shadow-[0_4px_12.2px_rgba(0,0,0,0.06)] bg-white w-[250px] duration-300 flex justify-center items-center",
  {
    variants: {
      variant: {
        default:
          "rounded-tr-[58px] rounded-bl-[58px] hover:bg-[#C8C0FF] hover:text-white",
        secondary:
          "rounded-tl-[58px] rounded-br-[58px] hover:bg-[rgba(123,244,244,0.54)] hover:text-black",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const NavigationItem = ({ title, variant, to }) => {
  const location = useLocation();

  const getVariant = () => {
    if (variant === "secondary") {
      if (location.pathname === to) {
        return "bg-[rgba(123,244,244,0.54)] text-black";
      }
    } else if (variant === "default") {
      if (location.pathname === to) {
        return "bg-[#C8C0FF] text-white";
      }
    }
  };

  return (
    <Link
      to={to}
      className={cn(
        itemVariants({
          variant,
          className: getVariant(),
        }),
        "truncate"
      )}
    >
      {title}
    </Link>
  );
};

NavigationItem.propTypes = {
  title: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default NavigationItem;
