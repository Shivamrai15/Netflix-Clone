import Image from "next/image";
import { NavbarItems } from "./navbar-items";
import { MobileView } from "./mobile-nav";
import { Search } from "lucide-react";
import { getMyList } from "@/actions/favorite";
import { getSeriesWithSeasonsById } from "@/actions/series";
import { getMovieByID } from "@/actions/movies";
import { Profile } from "./profile";
import { Movies, Season, Series } from "@prisma/client";

export const Navbar = async() => {

    const myList = await getMyList() || [];

    const data = await Promise.all(
        myList.map( async(item) => {
            if (item.isSeries) {
                const response = await getSeriesWithSeasonsById(item.contentId)
                if (response) {
                    return response;
                } else {
                    return null;
                };
            }
            const response = await getMovieByID(item.contentId);
            if (response) {
                return response;
            } else {
                return null;
            };
        })
    );

    const filteredData : ( Movies | (Series & {
        seasons : Season[]
    }))[] = [];

    data.map((value) => {
        if (value) {
            filteredData.push(value);
        }
    })

    return (
        <nav className="w-full fixed z-40 top-0">
            <div
                className="px-4 md:px-16 py-2 md:py-4 flex items-center transition duration-500 bg-neutral-950"                
            >
                <Image
                    src="/logo.png"
                    height={100}
                    width={100}
                    alt="Logo"
                    className="w-16 md:w-28"
                />
                <div className="flex-row ml-8 gap-5 hidden lg:flex">
                    <NavbarItems href="/browse" label="Home"/>
                    <NavbarItems href="/tvshows" label="TV Shows"/>
                    <NavbarItems href="/movies" label="Movies"/>
                    <NavbarItems href="/new-and-popular" label="New & Popular"/>
                    <NavbarItems href="/mylist" label="My List"/>
                </div>
                <div className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-default relative">
                    <MobileView/>
                </div>
                <div className="flex flex-row ml-auto gap-5 items-center">
                    <div className="text-gray-200 hover:text-gray-300 md:cursor-pointer transition">
                        <Search/>
                    </div>
                    <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-md overflow-hidden relative flex items-center justify-center">
                        <Profile data = {filteredData} />
                    </div>
                </div>
            </div>
        </nav>
    );
}
