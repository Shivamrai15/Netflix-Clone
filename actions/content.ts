"use server";

import { db } from "@/lib/db";

export const getContent = async( query: "movie" | "tvshow", id: string ) => {
    try {
        
        if (query === "movie") {
            const movie = await db.movies.findUnique({
                where : {
                    id
                }
            });
            return movie;
        }

        const episode = await db.episode.findUnique({
            where : {
                id
            }
        });

        return episode;

    } catch (error) {
        return null;
    }
}