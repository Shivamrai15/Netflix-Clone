"use client";
import { Movies } from "@prisma/client";
import { isEmpty } from "lodash";
import { MovieCard } from "./movie-card";

interface MovieListProps {
    data : Movies[] | [];
    title : string
}

export const MovieList = ({
    data,
    title
} : MovieListProps) => {
    
    if (isEmpty(data)){
        return null;
    }

    
    
    return (
        <div className="px-4 md:px-12 mt-4 space-y-8">
            <h1 className="text-white md:text-xl lg:text-2xl font-semibold mb-4">
                {title}
            </h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
                {data.map(( movie : Movies)=>(
                    <div key={movie.id}>
                        <MovieCard key = {movie.id} data = {movie}/>
                    </div>
                ))}
            </div>
        </div>
    )
}
