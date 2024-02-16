"use client";

import { Episode, Season } from "@prisma/client";
import { Separator } from "@/components/ui/separator";
import { Episodes } from "./episodes";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { useState } from "react";

interface SeasonsProps {
    title : string;
    seasons : (Season & {
        episodes : Episode[]
    } )[];
}

export const Seasons = ({
    title,
    seasons
} : SeasonsProps) => {

    const [selectedSeason, setSelectedSeason ] = useState(1)

    return (
        <div className="px-4 md:px-6 lg:px-16">
            <div className="flex items-center gap-x-4 flex-wrap">
                <h2 className="text-white text-xl md:text-2xl lg:text-3xl">
                    Episodes
                </h2>
                <div className="flex items-end gap-x-4">
                    <Separator className="h-8 block text-zinc-400" orientation="vertical" />
                    <h2 className="text-zinc-400 text-lg md:text-xl">
                        {title}
                    </h2>
                </div>
            </div>
            {
                seasons.length === 1 && (
                    <div className="w-full flex flex-col gap-y-5 md:gap-y-10 mt-2">
                        <h4 className="text-white text-[15px]">Episode 1</h4>
                        <Episodes
                            release={seasons[0].release.getFullYear().toString()}
                            about={seasons[0].description}
                            episodes={seasons[0].episodes}
                        />
                    </div>
                )
            }
            {
                seasons.length > 1 && (
                    <div className="w-full flex flex-col gap-y-5 md:gap-y-10 mt-2">
                        <div>
                            <Select defaultValue="1" onValueChange={(value) => setSelectedSeason(Number.parseInt(value))}>
                                <SelectTrigger className="w-32 bg-transparent text-white border-none outline-none ring-0 ring-offset-0 px-0 focus:ring-0 focus:ring-offset-0 text-base md:text-lg">
                                    <SelectValue placeholder="Select Season" />
                                </SelectTrigger>
                                <SelectContent className="bg-neutral-900 border-zinc-500">
                                    <SelectGroup className=" text-white ">
                                        {
                                            seasons.map((season)=>(
                                                <SelectItem
                                                    key={season.id}
                                                    value={`${season.number}`}
                                                    className="focus:bg-neutral-950/50 focus:text-white"
                                                >
                                                    Season {season.number}
                                                </SelectItem>
                                            ))
                                        }
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <Episodes
                            release={seasons[selectedSeason-1].release.getFullYear().toString()}
                            about={seasons[selectedSeason-1].description}
                            episodes={seasons[selectedSeason-1].episodes}
                        />
                    </div>
                )
            }
            
        </div>
    )
}
