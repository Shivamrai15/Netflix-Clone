import { create } from "zustand";

interface useRouterProps {
    propogate : number
    setPropogation : ( propogate : number )=>void
}

export const useRouter = create<useRouterProps>((set)=>({
    propogate : 0,
    setPropogation : (propogate)=>set({
        propogate
    })
}));