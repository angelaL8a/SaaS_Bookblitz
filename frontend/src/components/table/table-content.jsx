import PropTypes from "prop-types";
import { cn } from "@/lib/utils";
import { Fragment } from "react";

const TableContent = ({ columns, columnsData }) => {
  return (
    <div
      className={cn(
        "items-center w-full h-full px-2 py-4 border-b last-of-type:border-none gap-2"
      )}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))`,
      }}
    >
      {columns.map((column, index) => {
        const columnData = columnsData.find((col) => col.name === column);

        if (columnData) {
          return <Fragment key={index}>{columnData.element}</Fragment>;
        }
      })}
    </div>
  );
};
TableContent.propTypes = {
  columns: PropTypes.array.isRequired,
  columnsData: PropTypes.array.isRequired,
};

export default TableContent;
