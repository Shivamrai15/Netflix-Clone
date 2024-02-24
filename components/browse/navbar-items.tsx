"use client";
import { useRouter } from "@/hooks/useRouter";
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

    const { setPropogation } = useRouter();

    const handleNavigation = ()=>{
        if (pathname !== href){
            setPropogation(30);
        }
    }

    return (
        <Link 
            onClick={handleNavigation}
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
