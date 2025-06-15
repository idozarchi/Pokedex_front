import * as React from "react";
import { Headline } from "./headline";
import { Searchbar } from "../ui/Searchbar/searchbar";
import { Filter } from "../ui/Filter/filter";

type PageToolbarProps = {
  title: React.ReactNode;
  searchValue: string;
  onSearchChange: (value: string) => void;
  options: Array<{ label: string; value: string }>;
  filterValue: string | null;
  onFilterChange: (value: string | null) => void;
  filterLabel?: string;
  className?: string;
};

export const PageToolbar = ({
  title,
  searchValue,
  onSearchChange,
  options,
  filterValue,
  onFilterChange,
  filterLabel = "Filter", // <-- Default value
  className = "",
}: PageToolbarProps) => (
  <div className={`w-full mb-8 ${className}`}>
    <Headline className="mb-4">{title}</Headline>
    <div className="flex items-center justify-between bg-transparent rounded-md">
      <Searchbar
        placeholder="Search..."
        value={searchValue}
        onChange={onSearchChange}
        size="md"
      />
      <Filter
        options={options}
        value={filterValue}
        onChange={onFilterChange}
        label={filterLabel}
      />
    </div>
  </div>
);

export default PageToolbar;
