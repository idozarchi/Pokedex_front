import * as React from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react";

import { cn } from "../../../lib/utils";
import { Button, buttonVariants } from "../Button/button";
// adjust path if needed

type PaginationInfoProps = {
  page: number;
  pageSize: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  className?: string;
};

export function PaginationInfo({
  page,
  pageSize,
  total,
  onPrev,
  onNext,
  className = "",
}: PaginationInfoProps) {
  const start = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  return (
    <div className={cn("flex items-center w-full", className)}>
      <span className="text-sm text-muted-foreground mr-2">
        {start}-{end} of {total} items
      </span>
      <div className="flex items-center gap-0">
        <PaginationPrevious
          aria-label="Go to previous page"
          onClick={page === 1 ? undefined : onPrev}
          aria-disabled={page === 1}
          tabIndex={page === 1 ? -1 : 0}
          className={cn(
            // Remove hover/focus, keep only active (pressed) effect
            "bg-transparent active:bg-muted shadow-none text-inherit transition-colors",
            page === 1 && "pointer-events-none opacity-50"
          )}
        />
        <PaginationNext
          aria-label="Go to next page"
          onClick={end === total ? undefined : onNext}
          aria-disabled={end === total}
          tabIndex={end === total ? -1 : 0}
          className={cn(
            "bg-transparent active:bg-muted shadow-none text-inherit transition-colors",
            end === total && "pointer-events-none opacity-50"
          )}
        />
      </div>
    </div>
  );
}

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  );
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<React.ComponentProps<typeof Button>, "size"> &
  React.ComponentProps<"a">;

function PaginationLink({
  className,
  isActive,
  size = "sm",
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        buttonVariants({
          variant: isActive ? "primary" : "secondary",
          size,
        }),
        className
      )}
      {...props}
    />
  );
}

function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="md"
      className={cn("gap-1 px-2.5 sm:pl-2.5", className)}
      {...props}
    >
      <ChevronLeftIcon />
    </PaginationLink>
  );
}

function PaginationNext({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="md"
      className={cn("gap-1 px-2.5 sm:pr-2.5", className)}
      {...props}
    >
      <ChevronRightIcon />
    </PaginationLink>
  );
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontalIcon className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
