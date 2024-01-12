"use client";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuTrigger,
    NavigationMenuList,
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
                    <NavigationMenuContent className="w-56 md:w-80 bg-neutral-900 p-4 space-y-3 flex flex-col">
                        <NavbarItems href="/browse" label="Home"/>
                        <NavbarItems href="/tvshows" label="TV Shows"/>
                        <NavbarItems href="/movies" label="Movies"/>
                        <NavbarItems href="/new-and-popular" label="New & Popular"/>
                        <NavbarItems href="/mylist" label="My List"/>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}
