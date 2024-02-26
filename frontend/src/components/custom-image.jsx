import PropTypes from "prop-types";
import { cn } from "@/lib/utils";

const CustomImage = ({ className, src, alt, children }) => {
  return (
    <div className={cn("h-full w-full relative overflow-hidden", className)}>
      {src ? (
        <img
          src={typeof src === "string" ? src : src}
          alt={alt}
          className="object-cover w-full h-full"
        />
      ) : null}

      {children}
    </div>
  );
};
CustomImage.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string,
  children: PropTypes.node,
  bgColor: PropTypes.string,
};

export default CustomImage;
