import { getSeriesByGenre } from "@/actions/series";
import { Genre } from "@prisma/client"
import Image from "next/image";
import Link from "next/link";

interface SimilarSeriesProps {
    id : string;
    genre : Genre;
}

export const SimilarSeries = async ({
    id,
    genre
} : SimilarSeriesProps ) => {
  
    const series = await getSeriesByGenre(genre);
    if (!series) {
        return (
            <div className="pb-20 md:pb-28"/>
        )
    }
    const filteredSeries = series.filter((s) => s.id !== id);

    return (
        <div className='px-4 md:px-6 lg:px-16 pb-20 md:pb-28'>
            { filteredSeries.length > 0 && (
                <h2 className="text-white text-xl md:text-2xl lg:text-3xl mb-4">More Like This</h2>
            )} 
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                {
                    filteredSeries.map((series)=>(
                        <Link 
                            key = {series.id} 
                            className="aspect-video relative md:cursor-pointer"
                            href= {`/series/${series.id}`}
                        >
                            <Image
                                src={series.thumbnail}
                                fill
                                alt={series.name}
                            />
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}
