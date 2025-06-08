import { useState } from "react";
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
  Filter as FilterIcon,
  Calendar as DateRangeIcon,
} from "lucide-react";
import { ClearIcon } from "../../../assets/ClearIcon";

type FilterOption = {
  label: string;
  value: string;
};

type FilterProps = {
  options: FilterOption[];
  value: string | null;
  onChange: (value: string | null) => void;
  label?: string;
};

export const Filter: React.FC<FilterProps> = ({
  options,
  value,
  onChange,
  label = "Filter",
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const selected = options.find((opt) => opt.value === value);

  const isSelected = !!selected;
  const buttonClass = isSelected
    ? "bg-[var(--color-primary-50)] text-[var(--color-primary-300)]"
    : "";

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button className={buttonClass + " relative"}>
          <span className="flex items-center pointer-events-none">
            <DateRangeIcon size={16} className="mr-2" />{" "}
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
                <ClearIcon />
              </span>
            )}
            {isOpen ? (
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
};
