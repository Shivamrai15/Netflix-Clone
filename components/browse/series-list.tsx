import { Episode, Season, Series } from "@prisma/client"
import { SeriesCard } from "./series-card";

interface SeriesListProps {
    data : (Series & {
        seasons : (Season & {
            episodes : Episode[]
        })[],
    })[];
    title : string;
}

export const SeriesList = ({
    data,
    title
} : SeriesListProps ) => {

    return (
        <div className="px-4 md:px-12 mt-4 space-y-8">
            <h1 className="text-white md:text-xl lg:text-2xl font-semibold mb-4">
                {title}
            </h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
                {data.map(( series )=>(
                    <div key={series.id}>
                        <SeriesCard data={series} />
                    </div>
                ))}
            </div>
        </div>
    )
}
