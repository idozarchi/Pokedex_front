import * as React from "react";
import { cn } from "../../../lib/utils";

const customInputStyles =
  "font-[var(--font-family-mulish)] focus:border-[2px] focus:border-[var(--color-primary-400)] hover:border-[2px] hover:border-[var(--color-primary-400)] custom-input active:shadow-none";

type InputProps = React.ComponentProps<"input"> & {
  startIcon?: React.ReactNode;
  endComponent?: React.ReactNode;
};

function Input({
  className,
  type = "text",
  startIcon,
  endComponent,
  ...props
}: InputProps) {
  return (
    <div className="relative w-full flex items-center">
      {startIcon && (
        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          {startIcon}
        </span>
      )}
      <input
        type={type}
        data-slot="input"
        className={cn(
          startIcon ? "pl-8" : "pl-3",
          endComponent ? "pr-8" : "pr-3",
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          customInputStyles,
          className
        )}
        {...props}
      />
      {endComponent && (
        <span className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center">
          {endComponent}
        </span>
      )}
    </div>
  );
}

export { Input };
