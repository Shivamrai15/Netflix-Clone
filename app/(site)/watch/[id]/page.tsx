import { getContent } from "@/actions/content";
import { Player } from "@/components/player/player";
import { redirect } from "next/navigation";

interface WatchPageProps {
    params : { id : string },
    searchParams : { tvshow : string, movie : string }
}

const WatchPage = async({
    params,
    searchParams
} : WatchPageProps) => {

    const id = params.id;
    const query = searchParams.tvshow ? "tvshow" : "movie";

    const content = await getContent(query, id);

    if (!content) {
        redirect("/")
    }

    return (
        <div className="w-full h-full bg-black" >
            <Player url={content.url} poster={content.thumbnail} title={content.name} />
        </div>
    )
}

export default WatchPage;