import * as React from "react";
import TextareaAutosize from "react-textarea-autosize";
import { cn } from "@/lib/utils";

// eslint-disable-next-line react/prop-types
const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <TextareaAutosize
      className={cn(
        "flex min-h-[80px] w-full rounded-md border bg-input-background px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50 duration-150 outline-none",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
