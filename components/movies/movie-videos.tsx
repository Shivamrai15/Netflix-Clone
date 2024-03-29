"use client";

import Image from "next/image";
import { FaPlay } from "react-icons/fa";
import { Movies } from "@prisma/client";
import { Separator } from "@/components/ui/separator";
import { usePlayerModal } from "@/hooks/use-player-modal";
import { title } from "process";

interface MovieVideosProps {
    data : Movies
}

export const MovieVideos = ({
    data
} : MovieVideosProps) => {

    const {onOpen, setData} = usePlayerModal();

    const handleVideoPlayer = () => {
        setData(
            `Trailer: ${data.name}`,
            data.clip,
            data.clipImage
        );
        onOpen();
    }

    return (
        <div className="mt-20 px-4 md:px-6 lg:px-16">
            <div className="flex items-center gap-x-4 flex-wrap">
                <h2 className="text-white text-xl md:text-2xl lg:text-3xl">
                    Videos
                </h2>
                <div className="flex items-end gap-x-4">
                    <Separator className="h-8 block text-zinc-400" orientation="vertical" />
                    <h2 className="text-zinc-400 text-lg md:text-xl">
                        {data.name}
                    </h2>
                </div>
            </div>
            <div className="aspect-[5/2.7] w-64 sm:w-96 md:w-[32rem] lg:w-[40rem] relative overflow-hidden md:cursor-pointer mt-4 md:mt-6">
                <Image
                    src={data.clipImage}
                    alt="Movie"
                    fill
                />
                <div
                    onClick={handleVideoPlayer}
                    className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white absolute bottom-3 left-3 md:bottom-6 md:left-6"
                >
                    <FaPlay className="h-5 w-5" />
                </div>
            </div>
            <p className="mt-4 text-white text-sm md:text-base">
                Trailer: {data.name}
            </p>
        </div>
    )
}
