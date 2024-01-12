"use client";
import { useFavorites } from '@/hooks/useFavorites';
import { MovieCard } from './movie-card';
import { Movies } from '@prisma/client';
import { isEmpty } from 'lodash';

interface FavListProps {
    page? : boolean;
}

export const FavList = ({
    page
} : FavListProps) => {

    const { data } = useFavorites();

    if (isEmpty(data) && page){
        return (
            <div className="px-4 md:px-12 mt-4 space-y-4">
                <h1 className="text-white md:text-xl lg:text-2xl font-semibold mb-4">
                    My List
                </h1>
                <p className='text-zinc-400'>Nothing to show here</p>
            </div>
        );
    }

    if (isEmpty(data)){
        return null;
    }

    return (
        <div>
            <div className="px-4 md:px-12 mt-4 space-y-8">
                <h1 className="text-white md:text-xl lg:text-2xl font-semibold mb-4">
                    My List
                </h1>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
                    {data.map(( movie : Movies)=>(
                        <div key={movie.id}>
                            <MovieCard key = {movie.id} data = {movie}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
