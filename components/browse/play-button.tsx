"use client";
import { FaPlay } from "react-icons/fa";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";


interface PlayButtonProps {
    movieId : string;
}

export const PlayButton = ({
    movieId
} : PlayButtonProps) => {

    const router = useRouter();

    const onClick = ()=>{
        router.push(`/watch/${movieId}?movie=true`);
    }

    return (
        <Button className="bg-white/25 hover:bg-white/20" size="sm" onClick={onClick}>
            <FaPlay className="mr-2"/>
            Play Now
        </Button>
    )
}
