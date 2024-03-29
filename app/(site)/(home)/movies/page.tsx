import { MoviesByGenre } from "@/components/movies/movies-by-genre";
import { cn } from "@/lib/utils";
import { Genre } from "@prisma/client";
import { Metadata } from "next";
import { Poppins } from "next/font/google";

const font = Poppins({
    weight : ["900"],
    subsets : ["latin"]
})

export const metadata : Metadata = {
    title : "Movies | Netflix Official Site",
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
    description : "Movies move us like nothing else can, whether they’re scary, funny, dramatic, romantic or anywhere in-between. So many titles, so much to experience."
}

const page = async() => {
    return (
        <div className="w-full bg-neutral-900 pt-20 md:pt-28 lg:pt-36 space-y-6 md:space-y-10 lg:space-y-12">
            <div className="flex flex-col max-w-2xl lg:max-w-3xl px-4 md:px-6 lg:px-16 space-y-3">
                <h1 className={cn(
                    "text-4xl lg:text-6xl font-extrabold text-white",
                    font.className
                )}>Movies</h1>
                <p className="text-sm md:text-lg text-white">
                    Movies move us like nothing else can, whether they’re scary, funny, dramatic, romantic or anywhere in-between. So many titles, so much to experience.
                </p>
            </div>
            <MoviesByGenre genre={Genre.ACTION}/>
            <MoviesByGenre genre={Genre.HORROR}/>
            <MoviesByGenre genre={Genre.ANIMATION}/>
            <MoviesByGenre genre={Genre.COMEDY}/>
            <MoviesByGenre genre={Genre.ADVENTURE}/>
            <MoviesByGenre genre={Genre.SCIFI}/>

        </div>
    )
}

export default page