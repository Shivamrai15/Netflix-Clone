import { SeriesList } from "@/components/series/series-list";
import { cn } from "@/lib/utils";
import { Genre } from "@prisma/client";
import { Metadata } from "next";
import { Poppins } from "next/font/google";

const font = Poppins({
    weight : ["900"],
    subsets : ["latin"]
})

export const metadata : Metadata = {
    title : "TV Shows | Netflix Official Site",
    keywords : [
        "watch movies",
        "movies online",
        "watch TV",
        "TV online",
        "TV shows online",
        "watch TV shows",
        "stream movies",
        "stream tv",
        "instant streaming",
        "watch online",
        "movies",
        "watch movies India",
        "watch TV online",
        "no download",
        "full length movies"
    ],
    description : "These days, the small screen has some very big things to offer. From sitcoms to dramas to travel and talk shows, these are all the best programs on TV."
}

const TvShowsPage = async() => {
    return (
        <div className="w-full bg-neutral-900 py-20 md:py-28 lg:py-36 space-y-6 md:space-y-10 lg:space-y-12">
            <div className="flex flex-col max-w-2xl lg:max-w-3xl px-4 md:px-6 lg:px-16 space-y-3">
                <h1 className={cn(
                    "text-4xl lg:text-6xl font-extrabold text-white",
                    font.className
                )}>TV Shows</h1>
                <p className="text-sm md:text-lg text-white">
                    These days, the small screen has some very big things to offer. From sitcoms to dramas to travel and talk shows, these are all the best programs on TV.
                </p>
            </div>
            <SeriesList genre={Genre.CRIME} />
            <SeriesList genre={Genre.FANTASY} />
            <SeriesList genre={Genre.ACTION} />
            <SeriesList genre={Genre.ADVENTURE} />
            <SeriesList genre={Genre.DRAMA} />
        </div>
    )
}

export default TvShowsPage;