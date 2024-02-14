import PropTypes from "prop-types";
import { cn } from "@/lib/utils";

const CustomImage = ({ className, src, alt, ...rest }) => {
  return (
    <div className={cn("h-full w-full relative overflow-hidden", className)}>
      <img
        src={typeof src === "string" ? src : src}
        alt={alt}
        className="object-cover w-full h-full"
        {...rest}
      />
    </div>
  );
};
CustomImage.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string,
};

export default CustomImage;
