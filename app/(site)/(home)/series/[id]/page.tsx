import { getOnlySeries, getSeriesById } from "@/actions/series";
import { Seasons } from "@/components/series/seasons";
import { SeriesBillboard } from "@/components/series/series-billboard";
import { SeriesDetails } from "@/components/series/series-details";
import { SeriesVideos } from "@/components/series/series-videos";
import { SimilarSeries } from "@/components/series/similar-series";
import { Metadata, ResolvingMetadata } from "next";

interface SeriesPageProps  {
    params : { id : string }
}

export async function generateMetadata(
    { params }: SeriesPageProps,
    parent: ResolvingMetadata
): Promise<Metadata> {

    const series = await getOnlySeries(params.id);
    const previousImages = (await parent).openGraph?.images || []
   
    return {
        title: `Watch ${series?.name} | Netflix Official Site`,
        keywords : [
            "watch movies",
            "movies online",
            "watch TV",
            "TV online",
            "TV shows online",
            "watch TV shows",
            "stream movies",
            "stream tv",
            "instant streaming",
            "watch online",
            "movies",
            "watch movies India",
            "watch TV online",
            "no download",
            "full length movies"
        ],
        description : series?.description,
        openGraph: {
            images: [series?.thumbnail || "", ...previousImages],
            type : "video.movie",
        },
        twitter : {
            card: 'summary_large_image',
            title: `Watch ${series?.name} | Netflix Official Site`,
            description : series?.description,
            images: [series?.thumbnail || ""], 
        },
        category : "series"
    }
}

const SeriesPage = async({
    params
} : SeriesPageProps ) => {

    const series = await getSeriesById(params.id);

    if (!series) {
        return null;
    }

    return (
        <div className="w-full bg-neutral-900 space-y-16 md:space-y-24 lg:space-y-28">
            <SeriesBillboard series={series} />
            <SeriesVideos title={series.name} videos={series.videos} />
            <Seasons title={series.name} seasons={series.seasons} />
            <SeriesDetails casts={series.cast} genre={series.genre} />
            <SimilarSeries id={series.id} genre={series.genre[0]} />
        </div>
    )
}

export default SeriesPage;