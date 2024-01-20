import { Movies } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import Image from "next/image";

interface BillBoardProps {
    movie : Movies;
}

export const BillBoard = ({
    movie
} : BillBoardProps) => {
    return (
        <>
            <div className="relative h-[42vw]">
                <video
                    className="w-full h-[42vw] object-cover brightness-[50%]"
                    autoPlay
                    muted
                    loop
                    poster={movie.billboard}
                    src={movie.trailer}>
                </video>
                <div className="hidden md:absolute md:block md:bottom-6 lg:bottom-10 ml-4 md:ml-16">
                    <div className="relative w-52 h-36 lg:w-72 lg:h-44 xl:w-80 xl:h-48">
                        <Image
                            src={movie.thumbnail}
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
                        <p>{movie.duration}</p>
                        <span className="block h-4 w-0.5 bg-zinc-400 rounded-md"/>
                        <p>{movie.genre[0]}</p>
                    </div>
                    <p className="text-white text-[15px] mt-5 md:w-[70%] lg:w-[50%]">
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
            <div className="flex flex-col mt-4 md:hidden px-4">
                <div className="w-[50vw] h-32 relative flex justify-start">
                    <Image
                        src={movie.thumbnail}
                        fill
                        alt="name"
                        className="object-contain bg-blend-color-dodge"
                    />
                </div>
                <h2 className="text-2xl sm:mt-5 text-white font-semibold">
                    {movie.name}
                </h2>
                <div className="flex items-center gap-x-2 text-zinc-400 font-light mt-3">
                        <p>{new Date(movie.release).getFullYear()}</p>
                        <span className="block h-4 w-0.5 bg-zinc-400 rounded-md"/>
                        <p>{movie.duration}</p>
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
        </>
    )
}
