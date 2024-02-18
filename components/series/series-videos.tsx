"use client";

import { Video } from "@prisma/client";
import { Separator } from "@/components/ui/separator";

import {
    Carousel,
    CarouselContent,
    CarouselItem
} from "@/components/ui/carousel";
import VideoCard from "./video-card";

interface SeriesVideosProps {
    title : string;
    videos : Video[];
}

export const SeriesVideos = ({
    title,
    videos
} : SeriesVideosProps) => {
    
    if (videos.length === 0) {
        return null;
    }
    
    return (
        <div className="md:pt-20 px-4 md:px-6 lg:px-16">
            <div className="flex items-center gap-x-4 flex-wrap">
                <h2 className="text-white text-xl md:text-2xl lg:text-3xl">
                    Videos
                </h2>
                <div className="flex items-end gap-x-4">
                    <Separator className="h-8 block text-zinc-400" orientation="vertical" />
                    <h2 className="text-zinc-400 text-lg md:text-xl">
                        {title}
                    </h2>
                </div>
            </div>
            <Carousel
                className="h-full w-full"
                opts={{
                    align: "start",
                }}
            >
                <CarouselContent className="space-x-2" >
                    {
                        videos.map((video)=>(
                            <CarouselItem
                                key={video.id}
                                className="basis-auto md:cursor-pointer"
                            >
                                <VideoCard name={video.name} image={video.image} url={video.url} />
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
            </Carousel>
        </div>
    )
}
