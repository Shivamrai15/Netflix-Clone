import { movies } from "@/actions/movies";

import { randomMovie } from "@/actions/random-movie";
import { getSeries } from "@/actions/series";
import { BillBoard } from "@/components/browse/billboard";
import { FavList } from "@/components/browse/fav-list";
import { MovieList } from "@/components/browse/movie-list";
import { SeriesList } from "@/components/browse/series-list";
import { Movies } from "@prisma/client";

const HomePage = async() => {

    const billboardMovie : Movies | null  = await randomMovie() ;
    const movies_list : Movies[] | [] = await movies();
    const series = await getSeries() || [];

    if (!billboardMovie){
        return null;
    }

    return (
        <div className="bg-neutral-900 ">
            <BillBoard movie = {billboardMovie} />
            <div className="lg:mt-16">
                <FavList/>
            </div>
            <div className="hidden md:flex md:flex-col pb-40 space-y-14">
                <MovieList data={movies_list} title="Movies"/>
                <SeriesList data={series} title="Tv Shows" />
            </div>
            <div className="flex flex-col pb-40 space-y-14 md:hidden">

            </div>
        </div>
    );
}

export default HomePage;