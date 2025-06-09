import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../Dropdown/dropdown-menu"; // Adjust the import path as needed
import { Button } from "../Button/button"; // If you have a Button component
import { ChevronDown, ChevronUp } from "lucide-react"; // Or your icon library
import { useState } from "react";

type RowsPerPageDropdownProps = {
  value: number;
  onChange: (val: number) => void;
  options: number[];
  label?: string;
};

export function RowsPerPageDropdown({
  value,
  onChange,
  options,
  label = "Rows per page:",
}: RowsPerPageDropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground">{label}</span>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="secondary"
            size="sm"
            className="bg-transparent border-0 shadow-none text-xs"
          >
            {value}
            {open ? (
              <ChevronUp className="ml-1 h-4 w-4" />
            ) : (
              <ChevronDown className="ml-1 h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {options.map((opt) => (
            <DropdownMenuItem
              key={opt}
              onSelect={() => onChange(opt)}
              className="text-xs"
            >
              {opt}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
