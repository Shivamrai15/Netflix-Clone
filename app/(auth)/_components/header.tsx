import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export const Header = () => {
    return (
        <header className="h-20 md:h-24 w-full flex justify-between items-center">
            <Image
                src="/Netflix-Logo.svg"
                alt="Logo"
                height={200}
                width={200}
                className="h-28 w-28 md:h-44 md:w-44"
            />
            <Button
                className="bg-red-600 hover:bg-red-700"
                size="sm"
                asChild
            >
                <Link
                    href="/login"
                >
                    Sign In
                </Link>
            </Button>
        </header>
    )
}
