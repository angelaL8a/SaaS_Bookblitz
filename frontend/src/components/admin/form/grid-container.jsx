import { cn } from "@/lib/utils";
import PropTypes from "prop-types";

const GridContainer = ({ children, className }) => {
  return (
    <div className={cn("grid grid-cols-2 gap-5", className)}>{children}</div>
  );
};
GridContainer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default GridContainer;
