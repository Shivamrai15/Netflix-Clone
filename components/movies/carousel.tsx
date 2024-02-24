"use client";

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
import { Movies } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useRouter as Router } from "@/hooks/useRouter";

export const CarouselSlider = ({
    data
} : CrousalProps) => {

    const router = useRouter();
    const { setPropogation } = Router();

    return (
        <Carousel
                    className="h-full w-ful"
                    opts={{
                        align: "start",
                    }}
                >
                    <CarouselContent className="space-x-2" >
                        {
                            data.map((item) => (
                                <CarouselItem
                                    key={item.id}
                                    className="basis-auto md:cursor-pointer"
                                    onClick={() => {
                                        router.push(`/title/${item.id}`);
                                        setPropogation(30);
                                    }}
                                >
                                    <div
                                        className="overflow-hidden"
                                    >
                                        <div className="aspect-video relative h-36 sm:h-40 md:h-52 lg:h-44 overflow-hidden">
                                            <Image
                                                src={item.thumbnail}
                                                fill
                                                alt={item.name}
                                            />
                                        </div>
                                        <h4 className="text-sm md:text-base text-center text-white mt-2" >{item.name}</h4>
                                    </div>
                                </CarouselItem>
                            ))
                        }
                    </CarouselContent>
                    <CarouselNext className="hidden bg-transparent border-0 text-red-500 md:cursor-pointer lg:block"/>
                </Carousel>
    )
}
