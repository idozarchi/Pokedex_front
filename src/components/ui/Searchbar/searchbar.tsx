import * as React from "react";
import { Input } from "../Input/input";
import { Search } from "lucide-react";

type SearchbarProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
};

const sizeClassMap = {
  sm: "h-8 text-base w-[220px]",
  md: "h-10 text-lg w-[340px]",
  lg: "h-12 text-xl w-[480px]",
};

export const Searchbar = ({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
  size = "md",
}: SearchbarProps) => (
  <div
    className={`relative flex items-center ${sizeClassMap[size]} ${className}`}
  >
    <Input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      startIcon={<Search size={16} />}
      placeholder={placeholder}
      className={`pr-8 w-full ${sizeClassMap[size]}`}
    />
    {value && (
      <button
        type="button"
        onClick={() => onChange("")}
        tabIndex={0}
        aria-label="Clear search"
        className="absolute right-2 inset-y-0 my-auto p-0 m-0 bg-transparent border-0 cursor-pointer flex items-center"
        style={{ lineHeight: 0, height: "fit-content" }}
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
      </button>
    )}
  </div>
);

export default Searchbar;
