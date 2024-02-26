import PropTypes from "prop-types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { cn } from "@/lib/utils";

const PaymentType = ({ className }) => {
  return (
    <div className="w-full">
      <label className="text-[#747474] text-[13px] font-medium font-poppins">
        Payment Type
      </label>

      <Select value="usd">
        <SelectTrigger
          className={cn(
            "w-full h-auto font-normal bg-white shadow-[0px_4px_3.3px_0px_rgba(0,0,0,0.03)] px-3 py-3 rounded-md text-[rgba(51,51,51,0.41)] border-none text-lg",
            className
          )}
        >
          <SelectValue placeholder="Currency" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="usd">USD</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
PaymentType.propTypes = {
  className: PropTypes.string,
};

export default PaymentType;
