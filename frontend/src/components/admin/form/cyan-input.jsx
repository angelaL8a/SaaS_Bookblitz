import PropTypes from "prop-types";
import { Input } from "@/components/ui/input";

const CyanInput = ({ label, placeholder, name, value, onChange }) => {
  return (
    <div className="rounded-md px-2 py-1.5 [background:linear-gradient(180deg,rgba(56,255,255,0.08)_0%,rgba(0,240,255,0.08)_100%)] border border-[rgba(0,0,0,0.02)] shadow-[0px_4px_4.6px_0px_rgba(0,0,0,0.04)]">
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
CyanInput.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CyanInput;
