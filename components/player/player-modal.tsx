"use client";

import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog";
import { usePlayerModal } from "@/hooks/use-player-modal";
import { X } from "lucide-react";
import { Player } from "./player";

export const PlayerModal = () => {

    const { isOpen, onClose, data } = usePlayerModal();

    const onOpenChange = (  open: boolean ) => {
        if(open) {
            onClose();
        }
    }

    return (
        <Dialog open = {isOpen} onOpenChange = {onOpenChange} >
            <DialogContent className = "p-0 rounded-0 bg-transparent border-0 flex flex-col space-y-2 max-w-xl w-full">
                <div className="flex items-center justify-between gap-x-2">
                    <h2 className="border-l-[3px] border-red-600 text-white px-6 text-lg md:text-xl font-medium line-clamp-1">
                        {data.title}
                    </h2>
                    <X 
                        className="h-6 w-6 md:h-8 md:w-8 text-white md:cursor-pointer"
                        onClick={()=>onClose()}
                    />
                </div>
                <div className="aspect-video overflow-hidden w-full">
                    <Player
                        poster={data.poster}
                        url={data.url}
                    />
                </div>
            </DialogContent>
        </Dialog>
    )
}
