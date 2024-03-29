"use client";

import { InfoModal } from "@/components/modals/info-modal";
import { PlayerModal } from "@/components/player/player-modal";
import { useEffect, useState } from "react";

export const ModalProvider = () => {

    const [mounted, setMounted] = useState(false);

    useEffect(()=>{
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <>
            <PlayerModal/>
            <InfoModal/>
        </>
    )
}
