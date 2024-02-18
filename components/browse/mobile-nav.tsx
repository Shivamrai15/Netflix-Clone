"use client";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuTrigger,
    NavigationMenuList,
    NavigationMenuLink,
} from "@/components/ui/navigation-menu";

import { NavbarItems } from "./navbar-items";

export const MobileView = () => {
    return (
        <NavigationMenu >
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent text-white focus:bg-transparent focus:text-white" >
                        Browse
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="w-56 md:w-80 bg-neutral-900 p-4 space-y-2 flex flex-col ring-0 border-zinc-600">
                        <NavigationMenuLink>
                            <NavbarItems href="/browse" label="Home"/>
                        </NavigationMenuLink>
                        <NavigationMenuLink>
                            <NavbarItems href="/tvshows" label="TV Shows"/>
                        </NavigationMenuLink>
                        <NavigationMenuLink>
                            <NavbarItems href="/movies" label="Movies"/>
                        </NavigationMenuLink>
                        <NavigationMenuLink>
                            <NavbarItems href="/mylist" label="My List"/>
                        </NavigationMenuLink>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}
