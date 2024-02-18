import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { isEmpty } from "lodash";
import { getSearchedResponse } from "@/actions/search";

interface SearchPageProps {
    searchParams : {
        query : string
    }
}


export const metadata : Metadata = {
    title : "Search Movies or TV Shows | Netflix Official Site"
}

const SearchPage = async({
    searchParams
} : SearchPageProps) => {

    const params = searchParams.query;
    const response = await getSearchedResponse(params);

    if (isEmpty(response)){
        return (
            <div className="h-full w-full pt-44 flex items-center justify-center text-zinc-400">
                {
                    params && (
                        <div className="text-center p-5">
                            <h2 className="text-xl font-medium text-white">No results found</h2>
                            <p className="text-sm">Please make sure your words are spelled correctly or use fewer or different keyword.</p>
                        </div>
                    )
                }
            </div>
        )
    }



    return (
        <div className="pt-28 px-4 md:px-6 lg:px-16">
            <h1 className="text-xl md:text-2xl lg:text-3xl text-white">Top Results</h1>
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                {
                    response.map((data) => {
                        if ('seasons' in data) {
                            return (
                                <Link
                                    key={data.id}
                                    href={`/series/${data.id}`}
                                    className="aspect-video relative rounded-md overflow-hidden"
                                >
                                    <Image
                                        src={data.thumbnail}
                                        fill
                                        alt={data.name}
                                        className="object-contain"
                                    />
                                    <div className="absolute left-2 bottom-1">
                                        <div className="h-10 w-32 relative">
                                            <Image
                                                src={data.logo}
                                                fill
                                                alt={data.name}
                                                className="object-contain"
                                            />
                                        </div>
                                    </div>
                                </Link>
                            )
                        } else {
                            return (
                                <Link
                                    key={data.id}
                                    href={`/title/${data.id}`}
                                    className="aspect-video relative rounded-md overflow-hidden"
                                >
                                    <Image
                                        src={data.thumbnail}
                                        fill
                                        alt={data.name}
                                    />
                                    <div className="absolute left-2 bottom-1">
                                        <div className="h-10 w-32 relative">
                                            <Image
                                                src={data.logo}
                                                fill
                                                alt={data.name}
                                                className="object-contain"
                                            />
                                        </div>
                                    </div>
                                </Link>
                            )
                        }
                    })
                }
            </div>
        </div>
    )
}

export default SearchPage;