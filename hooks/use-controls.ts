import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";


interface UseControlProps {
    volume : number;
    mute : boolean;
    setVolume : ( volume:number )=>void;
    setMute : ( mute:boolean )=>void;
}

export const useControls = create(persist<UseControlProps>((set)=>({
        volume : 1,
        mute : false,
        setVolume: ( volume:number )=>set({ volume }), 
        setMute: ( mute:boolean )=>set({ mute }), 
    }),
    {
        name : "netflix-player",
        storage : createJSONStorage(()=>localStorage)
    }
))