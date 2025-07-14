import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "../../..//lib/utils";

type TabsProps = React.ComponentProps<typeof TabsPrimitive.Root> & {
  direction?: "row" | "col";
  spacing?: "spacing-1" | "spacing-2" | "spacing-3" | "spacing-4" | "spacing-6" | "spacing-8" | "spacing-12" | "spacing-16" | string;
};

function Tabs({
  className,
  direction = "row",
  spacing = "spacing-2",
  ...props
}: TabsProps) {
  // Use the CSS variable for spacing if a known key is provided
  const spacingClass =
    spacing.startsWith("spacing-")
      ? `gap-[var(--${spacing})]`
      : spacing;

  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn(
        "flex",
        direction === "row" ? "flex-col" : "flex-row",
        spacingClass,
        className
      )}
      {...props}
    />
  );
}

type TabsListProps = React.ComponentProps<typeof TabsPrimitive.List> & {
  direction?: "row" | "col";
  spacing?: "spacing-1" | "spacing-2" | "spacing-3" | "spacing-4" | "spacing-6" | "spacing-8" | "spacing-12" | "spacing-16" | string;
  divider?: boolean;
};

function TabsList({
  className,
  direction = "row",
  spacing = "spacing-2",
  divider = false,
  ...props
}: TabsListProps) {
  const spacingClass =
    spacing.startsWith("spacing-")
      ? `gap-[var(--${spacing})]`
      : spacing;

  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "inline-flex items-center justify-center w-fit h-9 p-[3px]",
        direction === "row" ? "flex-row" : "flex-col",
        spacingClass,
        divider ? "border-b border-input" : "",
        className
      )}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  const ref = React.useRef<HTMLButtonElement>(null);

  // We'll use a state to track if this tab is active
  const [isActive, setIsActive] = React.useState(false);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;
    // Listen for attribute changes (Radix sets data-state="active")
    const observer = new MutationObserver(() => {
      setIsActive(node.getAttribute("data-state") === "active");
    });
    observer.observe(node, {
      attributes: true,
      attributeFilter: ["data-state"],
    });
    // Set initial state
    setIsActive(node.getAttribute("data-state") === "active");
    return () => observer.disconnect();
  }, []);

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      data-slot="tabs-trigger"
      className={cn(
        "relative bg-transparent text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-sm px-2 py-1 text-sm font-medium whitespace-nowrap transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:size-4",
        "hover:bg-[var(--color-primary-50)]",
        className
      )}
      {...props}
    >
      {props.children}
      {isActive && (
        <span
          className="absolute left-2 right-2 bottom-0 h-[3px] rounded bg-[var(--color-primary-400)]"
          aria-hidden="true"
        />
      )}
    </TabsPrimitive.Trigger>
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
