import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../Dropdown/dropdown-menu";
import { Button } from "../Button/button";
import {
  ChevronDown,
  ChevronUp,
  Calendar as DateRangeIcon,
} from "lucide-react";

type FilterOption = {
  label: string;
  value: string;
};

type FilterProps = {
  options: FilterOption[];
  value: string | null;
  onChange: (value: string | null) => void;
  label?: string; // This will be used for the dropdown label and placeholder
};

export function Filter({
  options,
  value,
  onChange,
  label = "Filter",
}: FilterProps) {
  const [open, setOpen] = React.useState(false);

  const selected = options.find((opt) => opt.value === value);
  const isSelected = !!selected;
  const buttonClass = isSelected
    ? "bg-[var(--color-primary-100)] text-[var(--color-primary-300)]"
    : "";

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button className={buttonClass + " relative"}>
          <span className="flex items-center pointer-events-none">
            <DateRangeIcon size={16} className="mr-2" />
            {selected ? selected.label : label}
            {isSelected && (
              <span
                className="ml-2 cursor-pointer pointer-events-auto"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onChange(null);
                }}
                title="Clear filter"
                tabIndex={0}
                role="button"
                aria-label="Clear filter"
              >
                <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                  <path
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 4l8 8M12 4l-8 8"
                  />
                </svg>
              </span>
            )}
            {open ? (
              <ChevronUp size={16} className="ml-2" />
            ) : (
              <ChevronDown size={16} className="ml-2" />
            )}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{label}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {options.map((opt) => (
          <DropdownMenuItem
            key={opt.value}
            onSelect={() => onChange(opt.value)}
            className={value === opt.value ? "font-bold" : ""}
          >
            {opt.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
