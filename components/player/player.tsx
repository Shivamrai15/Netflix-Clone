"use client";

import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface PlayerProps {
    url : string;
}

export const Player = ({
    url
} : PlayerProps) => {

    const router = useRouter();
    const [ hover, setHover ] = useState(false);

    useEffect(()=>{
        setTimeout(()=>{
            setHover(false);
        }, 4300)

    }, [hover]);

    return (
        <div
            className="h-full w-full relative"
            onMouseMove={()=>setHover(true)}
        >
            <video
                autoPlay = {true}
                src={url}
                controls
                className="w-full h-full"
                disablePictureInPicture
                controlsList="nodownload noplaybackrate" >
            </video>
            <div className={cn(
                "h-20 w-full bg-opacity-0 absolute top-0 left-0 flex items-center px-6 transition-all",
                !hover && "hidden"
            )}>
                <ArrowLeft
                    className="text-white md:h-8 md:w-8 md:cursor-pointer"
                    onClick={()=>router.back()}
                />
            </div>
        </div>
    );
}

