import { moviesByGenre } from "@/actions/movies";
import { Genre } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface SimilarMoviesProps {
    id : string;
    genre : Genre;
}

export const SimilarMovies = async({
    id,
    genre
} : SimilarMoviesProps) => {
    
    const movies = await moviesByGenre(genre);
    const filteredMovies = movies.filter((movie) => movie.id !== id);
    

    return (
        <div className='px-4 md:px-6 lg:px-16 pb-20 md:pb-28'>
            { filteredMovies.length > 0 && (
                <h2 className="text-white text-xl md:text-2xl lg:text-3xl mb-4">More Like This</h2>
            )} 
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                {
                    filteredMovies.map((movie)=>(
                        <Link 
                            key = {movie.id} 
                            className="aspect-video relative md:cursor-pointer"
                            href= {`/title/${movie.id}`}
                        >
                            <Image
                                src={movie.thumbnail}
                                fill
                                alt="Movie"
                            />
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}
