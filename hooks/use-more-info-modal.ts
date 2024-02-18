import { create } from "zustand";
import { Episode, Movies, Season, Series } from "@prisma/client";

interface UseMoreInfoModal {
    isOpen : boolean;
    info : Movies | (Series & {
        seasons : (
            Season & {
                episodes : Episode[]
            }
        )[]
    } ) | undefined;
    onOpen : () => void;
    onClose : () => void;
    setInfo : ( data : Movies | (Series & {
        seasons : (
            Season & {
                episodes : Episode[]
            }
        )[]
    } ) ) => void; 
}

export const useMoreInfoModal = create<UseMoreInfoModal>((set)=>({
    isOpen : false,
    info : undefined,
    onOpen : () => set({ isOpen: true }),
    onClose : () => set({ isOpen: false }),
    setInfo : ( data : Movies | (Series & {
        seasons : (
            Season & {
                episodes : Episode[]
            }
        )[]
    } ) ) => set({ info : data })
}));
