"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Season, Series } from "@prisma/client";
import { FaPlay } from "react-icons/fa";
import { MovieCardGerne } from "./movie-card-genre";
import { MyListButton } from "./mylist-button";

interface SeriesCardProps {
    data : Series  & {
        seasons : Season[]
    };
}

export const SeriesCard = ({
    data
} : SeriesCardProps) => {

    const router = useRouter();

    return (
        <div className="group bg-neutral-900 col-span-1 relative h-[24vw] md:h-[18vw] lg:h-[12vw] xl:h-[11vw]">
            <Image
                src={data.thumbnail}
                alt="Thumbnail"
                fill
                className="object-cover cursor-pointer transition shadow-xl rounded-md group-hover:opacity-90 sm:group-hover:opacity-0 delay-150"
            />
            <div className="absolute left-3 bottom-3 transition group-hover:opacity-90 sm:group-hover:opacity-0 delay-150">
                <Image
                    src={data.logo}
                    alt="logo"
                    height={150}
                    width={150}
                />
            </div>
            <div className="opacity-0 absolute top-0 transition-all duration-200 z-10 invisible sm:visible delay-150 w-full scale-0 group-hover:scale-110 group-hover:-translate-y-[6vw] group-hover:opacity-100">
                <div className="relative">
                    <img
                        src={data.thumbnail}
                        alt="Thumbnail"
                        className="cursor-pointer object-cover transition duration-0 shadow-xl rounded-t-md w-full h-[24vw] md:h-[18vw]  lg:h-[12vw] xl:h[11vw]"
                    />
                    <div className="absolute bottom-3 left-3">
                        <Image
                            src={data.logo}
                            alt="thumbnail"
                            height={150}
                            width={150}
                        />
                    </div>
                </div>
                <div className="z-10 bg-[#0f0f0f] p-2 lg:p-4 absolute w-full transition shadow-md rounded-b-md">
                    <div className="flex flex-row items-center gap-3">
                        <div
                            onClick={()=>router.push(`/series/${data.id}`)}
                            className="md:cursor-pointer w-6 h-6 md:w-8 md:h-8 bg-white rounded-full flex items-center justify-center transition hover:bg-neutral-300"
                        >
                            <FaPlay/>
                        </div>
                        <MyListButton data={data} isSeries = {true} />
                    </div>
                    <div className="flex flex-row mt-3 gap-2 items-center">
                        <p className="text-white text-sm">{data.seasons.length} { data.seasons.length > 1 ? "Seasons" : "Season" }</p>
                    </div>
                    <div className="flex flex-row mt-3 gap-2 items-center text-sm">
                        <MovieCardGerne genre={data.genre}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
