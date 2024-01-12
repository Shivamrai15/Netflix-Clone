"use client";
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface NavbarItemsProps {
    label : string
    href : string
}

export const NavbarItems = ({
    label,
    href
} : NavbarItemsProps) => {

    const pathname = usePathname();

    return (
        <Link 
            href={href}
            className={cn(
                "text-zinc-300 hover:text-white transition cursor-default md:cursor-pointer text-sm font-normal",
                pathname === href && "text-white"
            )}
        >
            {label}
        </Link>
    )
}
