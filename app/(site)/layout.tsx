"use client";
import { useEffect, useState } from "react";
import LoadingBar from "react-top-loading-bar";
import { usePathname } from "next/navigation";
import { useRouter } from "@/hooks/useRouter";

interface LayoutPageProps {
    children : React.ReactNode
}

const LayoutPage = ({
    children
} : LayoutPageProps ) => {

    const { propogate, setPropogation } = useRouter()
    const pathname = usePathname();

    useEffect(()=>{
        setPropogation(100);
    }, [pathname]);

    return (
        <>
            <LoadingBar
                color="red"
                progress={propogate}
                waitingTime={400}
                onLoaderFinished={() => {
                setPropogation(0);
                }}
            />
            <div className="h-full bg-neutral-900">{children}</div>
        </>
    )
}

export default LayoutPage