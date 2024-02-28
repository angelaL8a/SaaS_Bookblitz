import { Input } from "@/components/ui/input";
import PropTypes from "prop-types";

const WhiteInput = ({
  label,
  placeholder,
  disabled,
  autocompleted,
  value,
  onChange,
  name,
}) => {
  return (
    <div>
      <label className="text-[#747474] text-[15px] font-medium font-poppins">
        {label}
      </label>

      <Input
        placeholder={placeholder}
        className="px-3 py-3 h-auto font-poppins bg-white shadow-[0px_4px_3.3px_0px_rgba(0,0,0,0.03)] rounded-md text-[#6967A6] placeholder:text-[#BCBEC0] text-lg border-none"
        disabled={disabled}
        value={value}
        onChange={onChange}
        name={name}
      />

      {autocompleted ? (
        <span className="text-[11px] pl-1 text-muted-foreground/50">
          This field will be autocompleted by default.
        </span>
      ) : null}
    </div>
  );
};
WhiteInput.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  autocompleted: PropTypes.bool,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default WhiteInput;
