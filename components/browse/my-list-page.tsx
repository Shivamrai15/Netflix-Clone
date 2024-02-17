"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useMyList } from '@/hooks/use-my-list';
import { MyListButton } from './mylist-button';
import { FaPlay } from 'react-icons/fa';

export const MyListPage = () => {

    const router = useRouter();
    const { list } = useMyList();

    return (
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden pb-10'>
            {list.map((content) => {
                        if ('seasons' in content) {
                            return (
                                <div
                                    key={content.id}
                                    className="overflow-hidden"
                                >
                                    <div className="aspect-video relative overflow-hidden">
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
                            );
                        } else {
                            return (
                                <div
                                    key={content.id}
                                    className="overflow-hidden"
                                >
                                    <div className="aspect-video relative overflow-hidden">
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
                            );
                        }
                    })}
        </div>
    )
}
