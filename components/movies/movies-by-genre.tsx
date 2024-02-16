import { moviesByGenre } from "@/actions/movies"
import { toTitle } from "@/lib/utils"
import { Genre } from "@prisma/client"
import { isEmpty } from "lodash"
import { CarouselSlider } from "./carousel"

interface MoviesByGenreProps {
    genre : Genre
}


export const MoviesByGenre = async({
    genre
} : MoviesByGenreProps ) => {

    const movies = await moviesByGenre(genre);

    if(isEmpty(movies)){
        return null;
    }

    return (
        <div className="w-full px-4 md:px-6 lg:px-16">
            <h1 className="text-lg md:text-[22px] text-white">{toTitle(genre)} Movies</h1>
            <div className="w-full mt-3">
                <CarouselSlider data={movies}/>
            </div>
        </div>
    )
}
