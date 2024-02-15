import { Movies } from "@prisma/client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import { PlayButton } from "./play-button";

interface MovieBillboardProps {
    movie : Movies
}

export const MovieBillboard = ({
    movie 
} : MovieBillboardProps ) => {
    return (
        <div className="md:h-screen">
            <div 
                style={{
                    background : `url(${movie.thumbnail})`,
                    backgroundSize : "cover",
                    backgroundRepeat : "no-repeat",
                }}
                className="h-[56.25vw] lg:h-full w-full relative ">
                <div className="relative h-full w-full bg-gradient-to-b from-transparent to-neutral-900">
                    <div className="hidden md:block absolute bottom-10 xl:bottom-24 left-16 xl:left-24">
                        <div className="relative w-52 h-36 lg:w-72 lg:h-44 xl:w-80 xl:h-48">
                            <Image
                                src={movie.logo}
                                fill
                                alt="name"
                                className="object-contain bg-blend-color-dodge"
                            />
                        </div>
                        <h2 className="text-white text-xl md:text-2xl lg:text-3xl font-semibold md:font-extrabold h-full drop-shadow-xl">
                            {movie.name}
                        </h2>
                        <div className="flex items-center gap-x-2 text-zinc-400 font-light mt-5">
                            <p>{new Date(movie.release).getFullYear()}</p>
                            <span className="block h-4 w-0.5 bg-zinc-400 rounded-md"/>
                            <p className="border p-1 text-sm">
                                {movie.rating}
                            </p>
                            <span className="block h-4 w-0.5 bg-zinc-400 rounded-md"/>
                            <p>{movie.length}</p>
                            <span className="block h-4 w-0.5 bg-zinc-400 rounded-md"/>
                            <p>{movie.genre[0]}</p>
                        </div>
                        <p className="text-white text-[15px] mt-5 md:w-[70%] lg:w-[50%]">
                            {movie.description}
                        </p>
                        <div className="flex flex-row items-center mt-4 gap-3">
                            <PlayButton movieId = {movie.id} />
                            <Button className="bg-white/25 hover:bg-white/20">
                                <Info className="mr-2"/>
                                More Info
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col px-4 mt-8 md:hidden">
                <div className="h-[18vw] w-[40vw] relative">
                    <Image
                        src={movie.logo}
                        alt="Thumbnail"
                        fill
                        className="object-contain"
                    />
                </div>
                <div className=" flex flex-col space-y-4 mt-6">
                    <h2 className="text-2xl sm:mt-5 text-white font-semibold">
                        {movie.name}
                    </h2>
                    <div className="flex items-center gap-x-2 text-zinc-400 font-light mt-3">
                            <p>{new Date(movie.release).getFullYear()}</p>
                            <span className="block h-4 w-0.5 bg-zinc-400 rounded-md"/>
                            <p>{movie.length}</p>
                            <span className="block h-4 w-0.5 bg-zinc-400 rounded-md"/>
                            <p>{movie.genre[0]}</p>
                    </div>
                    <p className="text-white mt-3">
                        {movie.description}
                    </p>
                    <div className="flex flex-row items-center mt-4 gap-3">
                            <Button className="bg-white/25 hover:bg-white/20" size="sm">
                                <Info className="mr-2"/>
                                More Info
                            </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
