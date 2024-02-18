"use client";

import { useMoreInfoModal } from "@/hooks/use-more-info-modal";
import { Episode, Movies, Season, Series } from "@prisma/client";
import { ChevronDown } from "lucide-react";

interface MoreInfoButtonProps {
    data : Movies | (Series & {
        seasons : (
            Season & {
                episodes : Episode[]
            }
        )[]
    } )
}

export const MoreInfoButton = ({
    data
} : MoreInfoButtonProps ) => {

    const { setInfo, onOpen } = useMoreInfoModal();

    const handleMoreInfo = () => {
        setInfo(data);
        onOpen();
    }

    return (
        <button
            className='cursor-default md:cursor-pointer group/item w-8 h-8 ring-1 ring-zinc-300 bg-neutral-900 hover:bg-neutral-800 rounded-full flex items-center justify-center'
            onClick={handleMoreInfo}
        >
            <ChevronDown className="text-white"/>
        </button>
    )
}
