import { genreFormatter } from "@/lib/utils";
import { Genre } from "@prisma/client";

interface SeriesDetailsProps {
    genre : Genre[];
    casts : string[]
}

export const SeriesDetails = ({
    genre,
    casts
} : SeriesDetailsProps) => {
    return (
        <div className="px-4 md:px-6 lg:px-16">
            <h2 className="text-white text-xl md:text-2xl lg:text-3xl">More Details</h2>
            <div className="w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4 gap-4 md:gap-8 lg:gap-12">
                <div className="w-full text-sm md:text-base text-white" >
                    <h4 className="text-zinc-500">Watch offline</h4>
                    <p>Download and watch everywhere you go.</p>
                </div>
                <div className="w-full text-sm md:text-base text-white">
                    <h4 className="text-zinc-500">Genres</h4>
                    <p>
                        { genreFormatter(genre) }
                    </p>
                </div>
            </div>
            <h4 className="text-sm md:text-base text-zinc-500 mt-4">Cast</h4>
            <div className="w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 md:gap-x-8 lg:gap-x-12 text-white">
                {
                    casts.map((name, idx) => (
                        <div key = {idx}>
                            {name}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
