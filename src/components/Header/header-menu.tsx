import * as React from "react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "../ui/NavigationMenu/navigation-menu";

export const HeaderMenu: React.FC = () => (
  <NavigationMenu>
    <NavigationMenuList>
      <NavigationMenuItem>
        <NavigationMenuLink
          href="/pokemons"
          className="text-[var(--color-primary-300)] font-bold"
          aria-current="page"
        >
          All Pokemons
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink
          href="/my-pokemons"
          className="text-[var(--color-primary-300)]"
        >
          My Pokemons
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
);

export default HeaderMenu;
