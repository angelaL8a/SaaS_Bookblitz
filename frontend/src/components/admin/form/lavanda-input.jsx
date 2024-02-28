import PropTypes from "prop-types";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const LavandaInput = ({
  label,
  placeholder,
  variant = "top",
  value,
  onChange,
  name,
}) => {
  return (
    <div>
      <label className="text-[#747474] text-[13px] font-medium font-poppins">
        {label}
      </label>

      <Input
        placeholder={placeholder}
        className={cn(
          "px-3 py-3 h-auto font-poppins bg-[rgba(226,222,255,0.58)] text-[#6967A6] placeholder:text-[#BCBEC0] text-lg border border-[rgba(159,63,255,0.18)]",
          variant === "top" ? "rounded-t-lg" : null,
          variant === "bottom" ? "rounded-b-lg" : null
        )}
        value={value}
        onChange={onChange}
        name={name}
      />
    </div>
  );
};
LavandaInput.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(["top", "bottom"]),
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default LavandaInput;
