import * as React from "react";
import { Headline } from "./headline";
import { Searchbar } from "../ui/Searchbar/searchbar";
import { Filter } from "../ui/Filter/filter";

type PageToolbarProps = {
  title: React.ReactNode;
  searchValue: string;
  onSearchChange: (value: string) => void;
  filterOptions: Array<{ label: string; value: string }>;
  filterValue: string | null;
  onFilterChange: (value: string | null) => void;
  filterLabel?: string; // <-- Added prop
  className?: string;
};

export const PageToolbar = ({
  title,
  searchValue,
  onSearchChange,
  filterOptions,
  filterValue,
  onFilterChange,
  filterLabel = "Filter", // <-- Default value
  className = "",
}: PageToolbarProps) => (
  <div className={`w-full mb-8 ${className}`}>
    <Headline className="mb-4">{title}</Headline>
    <div className="flex items-center justify-between bg-white rounded-md">
      <Searchbar
        placeholder="Search..."
        value={searchValue}
        onChange={onSearchChange}
        size="md"
      />
      <Filter
        options={filterOptions}
        value={filterValue}
        onChange={onFilterChange}
        label={filterLabel} // <-- Use the prop here
      />
    </div>
  </div>
);

export default PageToolbar;
