"use client";

import { usePlayerModal } from "@/hooks/use-player-modal";
import Image from "next/image";
import { FaPlay } from "react-icons/fa6";

interface VideoCardProps {
    image : string;
    name : string;
    url : string;
}

const VideoCard = ({
    image,
    name,
    url
} : VideoCardProps) => {

    const { onOpen, setData } = usePlayerModal();

    const handleVideoPlay = ( ) => {
        setData(
            name,
            url,
            image
        );
        onOpen();
    }

    return (
        <div>
            <div className="aspect-[5/2.7] w-64 sm:w-96 md:w-[32rem] lg:w-[40rem] relative overflow-hidden md:cursor-pointer mt-4 md:mt-6">
                <Image
                    src={image}
                    alt="Movie"
                    fill
                />
                <div
                    onClick={()=>handleVideoPlay()}
                    className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white absolute bottom-3 left-3 md:bottom-6 md:left-6"
                >
                    <FaPlay className="h-5 w-5" />
                </div>
            </div>
            <p className="mt-4 text-white text-sm md:text-base">
                {name}
            </p>
        </div>
    )
}

export default VideoCard;