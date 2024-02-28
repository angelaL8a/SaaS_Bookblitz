import PropTypes from "prop-types";
import { Input } from "@/components/ui/input";

const PurpleInput = ({ label, placeholder, name, value, onChange }) => {
  return (
    <div className="rounded-md bg-gradient-to-b from-[rgba(239,229,255,0.50)] from-0% to-[rgba(229,214,255,0.50)] to-100% px-2 py-1.5 shadow-[0px_2px_5px_0px_rgba(0,0,0,0.10)]">
      <label className="text-xs text-[#6D6D6D] block font-poppins">
        {label}
      </label>

      <Input
        placeholder={placeholder}
        className="border-none p-0 shadow-none h-auto text-[#6967A6] placeholder:text-[rgba(174,191,192,0.44)] text-lg"
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
PurpleInput.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default PurpleInput;
