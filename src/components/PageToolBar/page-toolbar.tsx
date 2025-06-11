import * as React from "react";
import { Headline } from "./headline";
import { Searchbar } from "../ui/Searchbar/searchbar";
import { Filter } from "../ui/Filter/filter";
import { PAGE_TOOLBAR } from "../../constants/strings";

type PageToolbarProps = {
  title: React.ReactNode;
  searchValue: string;
  onSearchChange: (value: string) => void;
  filterOptions: Array<{ label: string; value: string }>;
  filterValue: string | null;
  onFilterChange: (value: string | null) => void;
  filterLabel?: string;
  className?: string;
};

export const PageToolbar = ({
  title,
  searchValue,
  onSearchChange,
  filterOptions,
  filterValue,
  onFilterChange,
  filterLabel = PAGE_TOOLBAR.FILTER_LABEL,
  className = "",
}: PageToolbarProps) => (
  <div className={`w-full mb-8 ${className}`}>
    <Headline className="mb-4">
      {typeof title === "string" ? <span>{title}</span> : title}
    </Headline>
    <div className="flex items-center justify-between rounded-md">
      <Searchbar
        placeholder={PAGE_TOOLBAR.SEARCH_PLACEHOLDER}
        value={searchValue}
        onChange={onSearchChange}
        size="md"
      />
      <Filter
        options={filterOptions}
        value={filterValue}
        onChange={onFilterChange}
        label={filterLabel}
      />
    </div>
  </div>
);

export default PageToolbar;
