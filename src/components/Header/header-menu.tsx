import * as React from "react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "../ui/NavigationMenu/navigation-menu";

type MenuItem = {
  name: string | React.ReactNode;
  href: string;
  isActive?: boolean;
};

type HeaderMenuProps = {
  items: MenuItem[];
};

export const HeaderMenu: React.FC<HeaderMenuProps> = ({ items }) => (
  <NavigationMenu className="w-75 p-0.5">
    <NavigationMenuList>
      {items.map((item) => (
        <NavigationMenuItem className="h-8" key={item.href}>
          <NavigationMenuLink
            href={item.href}
            className={`text-[var(--color-primary-300)]${
              item.isActive ? " font-bold text-[var(--color-primary-400)]" : ""
            }`}
            aria-current={item.isActive ? "page" : undefined}
          >
            {item.name}
          </NavigationMenuLink>
        </NavigationMenuItem>
      ))}
    </NavigationMenuList>
  </NavigationMenu>
);

export default HeaderMenu;
