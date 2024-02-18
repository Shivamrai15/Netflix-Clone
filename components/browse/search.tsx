"use client";

import { SearchIcon, X } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export const Search = () => {

    const router = useRouter();
    const [ showSearchInput, setShowSearchInput ] = useState(false);
    const [ query, setQuery ] = useState("");

    const handleOnChange = (e : ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        router.push(`/search?query=${e.target.value}`)
    }

    return (
        <div className="text-gray-200 hover:text-gray-300 md:cursor-pointer transition">
            {
                showSearchInput ? (
                    <div className="sm:w-80 flex items-center h-8 bg-neutral-900 rounded-none border border-zinc-500 px-1 sm:px-2">
                        <SearchIcon />
                        <Input 
                            value={query}
                            onChange={(e) => handleOnChange(e)}
                            className="w-full h-7 bg-neutral-900 border-none outline-none focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none"
                        />
                        <X onClick={()=>{
                            setShowSearchInput(false);
                            setQuery("");
                        }} />
                    </div>
                ) : (
                    <SearchIcon onClick={()=>setShowSearchInput(true)}  />
                )
            }
        </div>
    )
}
