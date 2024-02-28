import PropTypes from "prop-types";
import { cn } from "@/lib/utils";

const PageContainer = ({ className, children }) => {
  return (
    <div className={cn("max-w-[1600px] mx-auto mt-12 px-4", className)}>
      {children}
    </div>
  );
};
PageContainer.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default PageContainer;
