import PropTypes from "prop-types";
import { MinusIcon } from "lucide-react";
import { Input } from "../ui/input";
import { PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const NumberInput = ({
  label,
  placeholder,
  value: amount,
  onChange: setAmount,
  name,
  className,
  containerClassName,
}) => {
  const handleChange = (event) => {
    let enteredValue = event.target.value;
    enteredValue = enteredValue.replace(/[^0-9.]/g, "");
    enteredValue = enteredValue.replace(/(\..*)\./g, "$1");

    setAmount(enteredValue);
  };

  const increaseAmount = () => {
    const number = parseFloat(amount) + 5;

    setAmount(number.toFixed(2).toString());
  };

  const decreaseAmount = () => {
    const number = parseFloat(amount) - 5;

    if (!(number < 0)) {
      setAmount(number.toFixed(2).toString());
    }
  };

  return (
    <div className={cn("ml-4", className)}>
      <label className="text-[#747474] text-[13px] font-medium font-poppins">
        {label}
      </label>

      <div
        className={cn(
          "px-3 py-2 font-poppins bg-white shadow-[0px_4px_3.3px_0px_rgba(0,0,0,0.03)] rounded-md text-[#6967A6] placeholder:text-[#BCBEC0] text-lg border-none relative w-[130px]",
          containerClassName
        )}
      >
        <div className="flex items-center absolute -left-3 top-0 bottom-0">
          <button
            type="button"
            onClick={decreaseAmount}
            className="bg-white rounded-full h-8 w-8 flex items-center justify-center"
          >
            <MinusIcon className="h-4 w-4 text-[#ABB5BE]" strokeWidth={4} />
          </button>
        </div>

        <Input
          placeholder={placeholder}
          type="text"
          className="border-none text-center shadow-none w-full placeholder:text-[#D1D1D1]"
          onChange={handleChange}
          value={amount}
          name={name}
        />

        <div className="flex items-center absolute -right-3 top-0 bottom-0">
          <button
            type="button"
            onClick={increaseAmount}
            className="bg-white rounded-full h-8 w-8 flex items-center justify-center"
          >
            <PlusIcon className="h-4 w-4 text-[#ABB5BE]" strokeWidth={4} />
          </button>
        </div>
      </div>
    </div>
  );
};
NumberInput.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  containerClassName: PropTypes.string,
};

export default NumberInput;
