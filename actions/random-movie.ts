"use server";

import { db } from "@/lib/db";

export const randomMovie = async()=>{
    try {
        const movie_count = await db.movies.count();
        const randomIndex = Math.floor(Math.random()*movie_count);
        const randomMovie = await db.movies.findMany({
            take : 1,
            skip : randomIndex
        });

        return randomMovie[0];
    } catch (error) {
        return null;
    }
}