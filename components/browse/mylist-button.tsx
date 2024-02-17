"use client"
import { addToMyList, removeFromMyList } from '@/actions/favorite';
import { useMyList } from '@/hooks/use-my-list';
import { Movies, Season, Series } from '@prisma/client';
import { Check, Loader2, PlusIcon } from 'lucide-react';
import { useMemo, useState } from 'react';

interface FavMovieButtonProps {
    data : Movies | (Series & {
        seasons : Season[]
    });
    isSeries : boolean;
}

export const MyListButton = ({
    data,
    isSeries
} : FavMovieButtonProps) => {

    const [isLoading, setIsLoading] = useState(false);
    const { list, addContent, removeContent } = useMyList();


    const isFavorite = useMemo(()=>{
        
        const isExistsInList = list.find((value) => value.id === data.id)
        if ( isExistsInList ) {
            return true;
        }
        return false;

    }, [data, list]);

    const toggleFavorite =  async() => {
        try {

            setIsLoading(true);
            if (isFavorite) {
                removeContent(data.id);
                await removeFromMyList(data.id);
            }  else {
                addContent(data);
                await addToMyList(data.id, isSeries);
            } 

        } catch (error) {
            console.log("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }

    

    return (
        <button
            onClick={toggleFavorite}
            disabled = {isLoading}
            className='cursor-default md:cursor-pointer group/item w-8 h-8 ring-1 ring-zinc-300 bg-neutral-900 hover:bg-neutral-800 rounded-full flex items-center justify-center'
        >
            {
                isLoading? <Loader2 className='animate-spin text-zinc-300'/> : isFavorite ? <Check className='text-white'/> : <PlusIcon className='text-white'/>
            }
        </button>
    )
}
