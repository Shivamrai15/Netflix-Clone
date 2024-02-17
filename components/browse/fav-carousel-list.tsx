"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useMyList } from '@/hooks/use-my-list';
import { MyListButton } from './mylist-button';
import { FaPlay } from 'react-icons/fa';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from '@/components/ui/carousel';


export const FavCarouselList = () => {

    const router = useRouter();
    const { list } = useMyList();

    return (
        <div className='w-full h-20 md:hidden'>
            <Carousel
                className="h-full w-full"
                opts={{
                    align: "start",
                }}
            >
                <CarouselContent className="space-x-2" >
                    {list.map((content) => {
                        if ('seasons' in content) {
                            return (
                                <CarouselItem
                                    key={content.id}
                                    className="basis-auto"
                                >
                                    <div
                                        className="overflow-hidden"
                                    >
                                        <div className="aspect-video relative h-36 sm:h-40 md:h-52 lg:h-44 overflow-hidden">
                                            <Image
                                                src={content.thumbnail}
                                                fill
                                                alt={content.name}
                                            />
                                            <div className='flex items-center gap-x-3 absolute left-2 bottom-2'>
                                                <div
                                                    onClick={()=>router.push(`/series/${content.id}`)}
                                                    className="md:cursor-pointer w-8 h-8 bg-white rounded-full flex items-center justify-center transition hover:bg-neutral-300"
                                                >
                                                    <FaPlay/>
                                                </div>
                                                <MyListButton data={content} isSeries = {true} />
                                            </div>
                                        </div>
                                        <h4 className="text-sm md:text-base text-center text-white mt-2" >{content.name}</h4>
                                    </div>
                                </CarouselItem>
                            );
                        } else {
                            return (
                                <CarouselItem
                                    key={content.id}
                                    className="basis-auto"
                                >
                                    <div
                                        className="overflow-hidden"
                                    >
                                        <div className="aspect-video relative h-36 sm:h-40 md:h-52 lg:h-44 overflow-hidden">
                                            <Image
                                                src={content.thumbnail}
                                                fill
                                                alt={content.name}
                                            />
                                            <div className='flex items-center gap-x-3 absolute left-2 bottom-2'>
                                                <div
                                                    onClick={()=>router.push(`/watch/${content.id}?movie=true`)}
                                                    className="md:cursor-pointer w-8 h-8 bg-white rounded-full flex items-center justify-center transition hover:bg-neutral-300"
                                                >
                                                    <FaPlay/>
                                                </div>
                                                <MyListButton data={content} isSeries = {false} />
                                            </div>
                                        </div>
                                        <h4 className="text-sm md:text-base text-center text-white mt-2" >{content.name}</h4>
                                    </div>
                                </CarouselItem>
                            );
                        }
                    })}
                </CarouselContent>
            </Carousel>
        </div>
    )
}
