import PropTypes from "prop-types";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

const OneColInput = ({
  icon,
  label,
  placeholder,
  type = "text",
  className,
  labelClassName,
  onChange,
  value,
}) => {
  return (
    <div className="flex items-center gap-3 lg:gap-6 register_input_info px-4 py-2 lg:px-5 lg:py-3 w-full">
      <div>{icon}</div>

      <div className="w-full">
        <label
          htmlFor={label}
          className={cn(
            "font-poppins text-[#6967A6] text-[12px]",
            labelClassName
          )}
        >
          {label}
        </label>

        <Input
          placeholder={placeholder}
          className={cn(
            "border-none shadow-none w-full h-auto p-0 text-[#6967A6] text-lg placeholder:text-[rgba(105,103,166,0.46)] selection:bg-[#d1d7eb]",
            className
          )}
          id={label}
          type={type}
          onChange={onChange}
          value={value}
        />
      </div>
    </div>
  );
};
OneColInput.propTypes = {
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string,
  className: PropTypes.string,
  labelClassName: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
};

export default OneColInput;
