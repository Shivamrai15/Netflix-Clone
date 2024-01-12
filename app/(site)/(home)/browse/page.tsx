import { movies } from "@/actions/movies";

import { randomMovie } from "@/actions/random-movie";
import { BillBoard } from "@/components/browse/billboard";
import { FavList } from "@/components/browse/fav-list";
import { MovieList } from "@/components/browse/movie-list";
import { Movies } from "@prisma/client";

const HomePage = async() => {

    const billboardMovie : Movies | null  = await randomMovie() ;
    const movies_list : Movies[] | [] = await movies();

    if (!billboardMovie){
        return null;
    }

    return (
        <div className="bg-neutral-900">
            <BillBoard movie = {billboardMovie} />
            <div className="mt-4 lg:mt-16 pb-40 space-y-14">
                <FavList/>
                <MovieList data={movies_list} title="Movies"/>
            </div>
        </div>
    );
}

export default HomePage;