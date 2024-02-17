import { create } from "zustand";
import { Movies, Season, Series } from "@prisma/client";

interface UseMyListModal {
    list : ( Movies | (Series & {
        seasons : Season[]
    }) )[],
    createList : ( data : ( Movies | (Series & {
        seasons : Season[]
    }) )[] ) => void;
    addContent : ( data : Movies | ( Series & {
        seasons : Season[]
    }) ) => void;
    removeContent : ( id : string) => void;
}

export const useMyList = create<UseMyListModal>((set, get) => ({
    list : [],

    createList : ( data : ( Movies | (Series & {
        seasons : Season[]
    }) )[] ) => set({ list : data }),

    addContent : ( data : Movies | ( Series & {
        seasons : Season[]
    }) ) => {

        const existingList = get().list;
        const existingContent = existingList.find((value) => value.id === data.id);

        if (!existingContent) {
            const updatedList = [ data, ...existingList ];
            set({ list : updatedList });
        } 

    },
    removeContent : ( id: string ) => {

        const existingList = get().list;
        const filteredList = existingList.filter((data) => data.id!==id)
        set({ list: filteredList });

    }
}))