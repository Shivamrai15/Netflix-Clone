"use client"
import { addToFavoriteMovies, removeFromFavoriteMovies } from '@/actions/favorite';
import { useFavorites } from '@/hooks/useFavorites';
import { Movies } from '@prisma/client';
import { Check, Loader2, PlusIcon } from 'lucide-react';
import React, { useCallback, useMemo, useState } from 'react';

interface FavMovieButtonProps {
    id : string;
}

export const FavMovieButton = ({
    id 
} : FavMovieButtonProps) => {

    const { data, mutate } = useFavorites();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const isFavorite = useMemo(()=>{
        const list : Movies[] = data || [];
        for (const value of list){
            if(value.id === id) return true
        }
        return false;
    }, [data, id]);

    const toggleFavorite = useCallback(async()=>{
        setIsLoading(true);
        if (isFavorite){
            await removeFromFavoriteMovies(id);
        }else{
            await addToFavoriteMovies(id);
        };
        mutate();
        setIsLoading(false);
    }, [id, isFavorite, mutate]);

    

    return (
        <button
            onClick={toggleFavorite}
            disabled = {isLoading}
            className='cursor-default md:cursor-pointer group/item w-6 h-6 md:w-8 md:h-8 ring-1 ring-zinc-300 bg-neutral-900 hover:bg-neutral-800 rounded-full flex items-center justify-center'
        >
            {
                isLoading? <Loader2 className='animate-spin text-zinc-300'/> : isFavorite ? <Check className='text-white'/> : <PlusIcon className='text-white'/>
            }
        </button>
    )
}
