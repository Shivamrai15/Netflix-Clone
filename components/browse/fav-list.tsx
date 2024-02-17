"use client";

import { useMyList } from '@/hooks/use-my-list';
import { isEmpty } from 'lodash';
import { SeriesCard } from './series-card';
import { MovieCard } from './movie-card';
import { FavCarouselList } from './fav-carousel-list';
import { MyListPage } from './my-list-page';

interface FavListProps {
    page? : boolean;
}

export const FavList = ({
    page
} : FavListProps) => {

    const { list } = useMyList();

    if (isEmpty(list) && page){
        return (
            <div className="px-4 md:px-12 mt-4 space-y-4">
                <h1 className="text-white md:text-xl lg:text-2xl font-semibold mb-4">
                    My List
                </h1>
                <p className='text-zinc-400'>Nothing to show here</p>
            </div>
        );
    }

    if (isEmpty(list)){
        return null;
    }

    return (
        <div>
            <div className="px-4 md:px-12 mt-10 space-y-8 bg-neutral-900">
                <h1 className="text-white md:text-xl lg:text-2xl font-semibold mb-4">
                    My List
                </h1>
                <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
                    {list.map((content) => {
                        if ('seasons' in content) {
                            return (
                                <div key={content.id}>
                                    <SeriesCard data={content} />
                                </div>
                            );
                        } else {
                            return (
                                <div key={content.id}>
                                    <MovieCard data={content} />
                                </div>
                            );
                        }
                    })}
                </div>
                {
                    !page ? (
                        <FavCarouselList />
                    ) : (
                        <MyListPage />
                    )
                }
            </div>
        </div>

    )
}
