"use client";
import { useMoreInfoModal } from "@/hooks/use-more-info-modal";
import { InfoModalWrapper } from "./info-modal-wrapper";
import { genreFormatter } from "@/lib/utils";



export const InfoModal = () => {

    const { info, isOpen, onClose } = useMoreInfoModal();

    if (info === undefined){
        return null;
    }

    return (
        <InfoModalWrapper
            isOpen = { isOpen }
            onClose = { onClose }
            data={info}
        >
            <div className="mt-8 md:mt-10">
            <div className="w-full grid md:grid-cols-3 gap-6">
                <div className="flex flex-col space-y-4 col-span-2 w-full">
                    <div className="text-sm font-semibold text-zinc-400 flex items-center gap-4">
                        <p>{ info.release.getFullYear() }</p>
                        <p>
                            {
                                ('seasons' in info ) ?  `${info.seasons.length} Parts` : `${info.length}`
                            }
                        </p>
                        <p className="text-xs font-medium border px-2 border-zinc-400 rounded-sm"> HD </p>
                        <p className="text-xs font-medium border px-2 border-zinc-400 rounded-sm"> {info.rating} </p>
                    </div>
                    <div className="text-sm">
                        { info.description }
                    </div>
                </div>
                <div className="flex flex-col space-y-4 w-full">
                    <div>
                        <span className="text-sm font-medium text-zinc-400">Casts:</span>
                        <p className="text-sm">{ info.cast.slice(0, 3).join(", ") } and more</p>
                    </div>
                    <div>
                        <span className="text-sm font-medium text-zinc-400">Genres:</span>
                        <p className="text-sm">{ genreFormatter(info.genre) }</p>
                    </div>
                </div>
            </div>
            </div>
        </InfoModalWrapper>
    )
}
