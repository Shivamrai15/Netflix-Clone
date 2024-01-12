import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

export const useFavorites = ()=>{
    const 
    {   data,
        error,
        mutate,
        isLoading
    } = useSWR("/api/my-list", fetcher, {
        revalidateIfStale : false,
        revalidateOnFocus : false,
        revalidateOnReconnect : false
    });

    return {
        data,
        error,
        isLoading,
        mutate
    }

}