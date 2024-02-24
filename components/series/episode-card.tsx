"use client"
import { useRouter } from "next/navigation";
import { Episode } from "@prisma/client";
import Image from "next/image";
import { useRouter as Router } from "@/hooks/useRouter";

interface EpisodeCardProps {
    episode : Episode;
}

export const EpisodeCard = ({
    episode
} : EpisodeCardProps) => {

    const router = useRouter();
    const { setPropogation } = Router();

    return (
        <div className='w-full flex flex-col gap-2'>
            <div
                className="aspect-video relative w-full md:cursor-pointer"
                onClick={() => {
                    router.push(`/watch/${episode.id}?tvshow=true`);
                    setPropogation(30);
                }}
            >
                <Image
                    src={episode.thumbnail}
                    fill
                    alt={episode.name}
                    className="object-cover"
                />
            </div>
            <div
                className="flex items-start justify-between gap-x-5 cursor-default"
            >
                <p className="text-white font-medium text-sm">{episode.number}. {episode.name}</p>
                <p className="text-zinc-400 text-sm" >{episode.length}</p>
            </div>
            <p className="text-xs text-zinc-400 mt-2 cursor-default">
                {episode.description}
            </p>
        </div>
    )
}
