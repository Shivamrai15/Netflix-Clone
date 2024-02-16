import { create } from "zustand";

interface UsePlayerModalProps {
    isOpen : boolean;
    onOpen : ()=>void;
    onClose : ()=>void;
    data : {
        title : string,
        url : string,
        poster : string
    };
    setData : ( title: string, url: string, poster: string )=>void;
}

export const usePlayerModal = create<UsePlayerModalProps>((set)=>({
    isOpen : false,
    data : {
        title : "",
        url : "",
        poster : ""
    },
    onOpen : () => set({ isOpen: true }),
    onClose : () => set({ isOpen: false }),
    setData : ( title: string, url: string, poster: string ) => set({
        data : {
            title,
            url,
            poster
        }
    })
}));