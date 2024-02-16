import { Episode } from "@prisma/client";
import { EpisodeCard } from "./episode-card";

interface EpisodesProps {
    release : string;
    about : string;
    episodes : Episode[]
}

export const Episodes = ({
    release,
    about,
    episodes
} : EpisodesProps) => {
    return (
        <div className="w-full flex flex-col space-y-3">
            <p className="text-white" >Release year: {release}</p>
            <p className="w-1/2 text-zinc-400">{about}</p>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-5">
                {
                    episodes.map((episode) => (
                        <EpisodeCard 
                            key={episode.id}
                            episode={episode}
                        />
                    ))
                }
            </div>
        </div>
    )
}
