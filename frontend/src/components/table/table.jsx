import { cn } from "@/lib/utils";
import PropTypes from "prop-types";

const Table = ({ columns, children, headerClassName, containerClassName }) => {
  return (
    <div className={cn("relative flex flex-col mt-16", containerClassName)}>
      <div className="bg-gradient-to-b [background:linear-gradient(180deg,#F7FFFF_0%,rgba(246,254,254,0.96)_0.01%,rgba(255,255,255,0.56)_43.9%,rgba(250,250,250,0.66)_100%)] border border-[#EBEBEB] drop-shadow-[0px_10px_31.9px_rgba(219,219,219,0.00)] rounded-lg relative">
        <div
          className={cn(
            "[background:linear-gradient(180deg,#EDEAFF_0%,rgba(223,218,255,0.91)_100%)] border border-[rgba(226,226,226,0.55)] h-[55px] [filter:drop-shadow(0px_4px_7.3px_rgba(0,0,0,0.08))] rounded-full absolute -top-8 left-5 right-5",
            headerClassName
          )}
        >
          <div
            className="items-center w-full h-full"
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))`,
            }}
          >
            {columns.map((col, index) => (
              <div
                key={index}
                className="flex items-center justify-center w-full h-full col-span-1"
              >
                <span className="uppercase truncate text-[#6E6893] font-medium">
                  {col}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="px-8 mt-6 max-h-[530px] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};
Table.propTypes = {
  columns: PropTypes.array.isRequired,
  children: PropTypes.node.isRequired,
  headerClassName: PropTypes.string,
  containerClassName: PropTypes.string,
};

export default Table;
