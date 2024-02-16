import { getMovieByID } from "@/actions/movies";
import { MovieBillboard } from "@/components/browse/movie-billboard";
import { MoviesDetails } from "@/components/movies/movie-details";
import { MovieVideos } from "@/components/movies/movie-videos";
import { SimilarMovies } from "@/components/movies/similar-movies";
import { Metadata, ResolvingMetadata } from "next";


interface TitlePageProps  {
    params : { id : string }
}


export async function generateMetadata(
    { params }: TitlePageProps,
    parent: ResolvingMetadata
): Promise<Metadata> {

    const movie = await getMovieByID(params.id);
    const previousImages = (await parent).openGraph?.images || []
   
    return {
        title: `Watch ${movie?.name} | Netflix Official Site`,
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
        description : movie?.description,
        openGraph: {
            images: [movie?.thumbnail || "", ...previousImages],
            type : "video.movie",
        },
        twitter : {
            card: 'summary_large_image',
            title: `Watch ${movie?.name} | Netflix Official Site`,
            description : movie?.description,
            images: [movie?.thumbnail || ""], 
        },
        category : "movies"
    }
}

const TitlePage = async({ 
    params 
} : TitlePageProps) => {

    const id = params.id;
    const movie = await getMovieByID(id);

    if (!movie){
        return null;
    }

    return (
        <div className="w-full bg-neutral-900 space-y-16 md:space-y-24">
            <MovieBillboard movie = {movie} />
            <MovieVideos data = {movie} />
            <MoviesDetails data = {movie} />
            <SimilarMovies id={movie.id} genre = {movie.genre[0]} />
        </div>
    )
}

export default TitlePage