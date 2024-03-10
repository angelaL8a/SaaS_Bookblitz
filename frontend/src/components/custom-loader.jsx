import PropTypes from "prop-types";
import { cn } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";

const CustomLoader = ({ className, containerClassName }) => {
  return (
    <div
      className={cn(
        "w-full h-full mt-10 flex justify-center items-center",
        containerClassName
      )}
    >
      <Loader2Icon className={cn("h-10 w-10 animate-spin", className)} />
    </div>
  );
};
CustomLoader.propTypes = {
  className: PropTypes.string,
  containerClassName: PropTypes.string,
};

export default CustomLoader;
