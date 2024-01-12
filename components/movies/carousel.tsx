"use client";

import { Movies } from "@prisma/client";

interface CrousalProps {
    data : Movies[]
}

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext
} from "@/components/ui/carousel";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const CarouselSlider = ({
    data
} : CrousalProps) => {

    const router = useRouter();

    return (
        <Carousel
            className="h-full w-ful"
            opts={{
                align: "start",
            }}
        >
            <CarouselContent className="space-x-3">
                {data.map((movie)=>(
                    <CarouselItem
                        onClick={()=>router.push(`/title/${movie.id}`)}
                        key={movie.id}
                        className="basis-1/2 md:basis-1/4 xl:basis-1/5 h-40 sm:h-44 md:h-52 lg:h-60 xl:h-64 w-48 md:w-72 relative md:cursor-pointer"
                    >
                        <Image src={movie.billboard} fill className="object-contain" alt="Thumbnail"/>
                    </CarouselItem>
                ))}
                
            </CarouselContent>
            <CarouselNext className="hidden bg-transparent border-0 text-red-500 md:cursor-pointer lg:block"/>
        </Carousel>
    )
}
