import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const Navbar = () => {
    return (
        <nav className='h-16 md:h-20 w-full flex justify-between items-center border-b pr-4 md:px-8'>
            <Link
                href="/"
                className='h-20 md:h-32 w-32 md:w-48 relative'
            >
                <Image
                    src="/Netflix-Logo.svg"
                    fill
                    className='object-contain'
                    alt='Logo'
                />
            </Link>
            <Link
                href="/login"
                className='text-lg font-semibold hover:underline'
            >
                Sign In
            </Link>
        </nav>
    )
}
