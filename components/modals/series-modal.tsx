"use client";

import { genreFormatter } from "@/lib/utils";
import { Episode, Season, Series } from "@prisma/client";

interface SeriesModalProps {
    data : Series & {
        seasons : (Season & {
            episodes : Episode[]
        } )[]
    }
}   

export const SeriesModal = ({
    data
} : SeriesModalProps) => {

    return (
        <div className="w-full">
            
        </div>
    )
}
