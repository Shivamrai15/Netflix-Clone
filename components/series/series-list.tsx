
import Image from "next/image";
import Link from "next/link";
import { toTitle } from "@/lib/utils";
import { Genre } from "@prisma/client";
import { getSeriesByGenre } from "@/actions/series";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext
} from "@/components/ui/carousel";

interface SeriesListProps {
    genre : Genre;
}


export const SeriesList = async({
    genre
} : SeriesListProps) => {

    const series = await getSeriesByGenre(genre);

    if (!series){
        return null;
    }

    return (
        <div className="w-full px-4 md:px-6 lg:px-16">
            <h1 className="text-lg md:text-[20px] text-white">{toTitle(genre)} Tv Shows</h1>
            <div className="w-full mt-3">
                <Carousel
                    className="h-full w-full"
                    opts={{
                        align: "start",
                    }}
                >
                    <CarouselContent className="space-x-2" >
                        {
                            series.map((item) => (
                                <CarouselItem
                                    key={item.id}
                                    className="basis-auto md:cursor-pointer"
                                >
                                    <Link
                                        className="overflow-hidden"
                                        href={`/series/${item.id}`}
                                    >
                                        <div className="aspect-video relative h-36 sm:h-40 md:h-52 lg:h-44 overflow-hidden">
                                            <Image
                                                src={item.thumbnail}
                                                fill
                                                alt={item.name}
                                            />
                                        </div>
                                        <h4 className="text-sm md:text-base text-center text-white mt-2" >{item.name}</h4>
                                    </Link>
                                </CarouselItem>
                            ))
                        }
                    </CarouselContent>
                    <CarouselNext className="hidden bg-transparent border-0 text-red-500 md:cursor-pointer lg:block"/>
                </Carousel>
            </div>
        </div>
    )
}
