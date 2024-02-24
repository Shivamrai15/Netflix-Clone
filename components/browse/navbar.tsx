import Image from "next/image";
import { NavbarItems } from "./navbar-items";
import { MobileView } from "./mobile-nav";
import { getMyList } from "@/actions/favorite";
import { getSeriesById } from "@/actions/series";
import { getMovieByID } from "@/actions/movies";
import { Profile } from "./profile";
import { Episode, Movies, Season, Series } from "@prisma/client";
import { Search } from "./search";

export const Navbar = async() => {

    const myList = await getMyList() || [];

    const data = await Promise.all(
        myList.map( async(item) => {
            if (item.isSeries) {
                const response = await getSeriesById(item.contentId)
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
        seasons : (Season & {
            episodes : Episode[]
        })[]
    }))[] = [];

    data.map((value) => {
        if (value) {
            filteredData.push(value);
        }
    })

    return (
        <nav className="w-full fixed z-40 top-0">
            <div
                className="px-4 md:px-16 py-2 md:py-4 flex items-center transition duration-500 bg-neutral-950/85"                
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
                    <NavbarItems href="/mylist" label="My List"/>
                </div>
                <div className="lg:hidden flex flex-row items-center gap-2 cursor-default relative">
                    <MobileView/>
                </div>
                <div className="flex flex-row ml-auto gap-5 items-center">
                    <Search />
                    <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-md overflow-hidden relative flex items-center justify-center">
                        <Profile data = {filteredData} />
                    </div>
                </div>
            </div>
        </nav>
    );
}
