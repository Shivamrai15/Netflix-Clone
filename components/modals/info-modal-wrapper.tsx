"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
    Dialog,
    DialogContent,
    DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FaPlay } from "react-icons/fa6";
import { MyListButton } from "@/components/browse/mylist-button";
import { Episode, Movies, Season, Series } from "@prisma/client";
import { X } from "lucide-react";

interface InfoModalWrapper {
    isOpen : boolean;
    onClose : ()=>void;
    data :  Movies | (Series & {
        seasons : (Season & {
            episodes : Episode[]
        })[]
    });
    children : React.ReactNode; 
}

export const InfoModalWrapper  = ({
    isOpen,
    onClose,
    data,
    children
} : InfoModalWrapper ) => {

    const handleOpenChange = ( open: boolean ) => {
        if ( !open ) {
            onClose();
        }
    }
    
    const router = useRouter();

    const playContent = () => {
        if ('seasons' in data) {
            router.push(`/watch/${data.seasons[0].episodes[0].id}?tvshow=true`);
        } else {
            router.push(`/watch/${data.id}?movie=true`);
        }
        onClose();
    }

    return (
        <Dialog  open = {isOpen} onOpenChange={handleOpenChange}>
            <DialogContent className="bg-neutral-900 text-white border-0 max-w-3xl">
                <DialogHeader className="w-full flex flex-col items-center justify-start relative">
                    <div className="relative h-[20vw] md:h-40 w-full">
                        <Image
                            src={data.logo}
                            alt="Image"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <X  className="h-5 w-5 text-white md:cursor-pointer absolute top-0 right-0" onClick={()=>onClose()}  />
                </DialogHeader>
                <div className="h-full w-full mt-4">
                    <div className="w-full flex items-center gap-x-4">
                        <Button
                            className="bg-white hover:bg-zinc-100 text-black font-bold rounded-sm px-6"
                            size={"sm"}
                            onClick={playContent}
                        >
                            <FaPlay className="mr-2 h-6 w-6"/>
                            Play
                        </Button>
                        <MyListButton data={data} isSeries = { 'seasons' in data } />
                    </div>
                    {children}
                </div>
            </DialogContent>
        </Dialog>
    );
}