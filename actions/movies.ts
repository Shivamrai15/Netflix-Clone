"use server";

import { db } from "@/lib/db";

export const movies = async()=>{
    try {
        const movies = await db.movies.findMany();
        return movies;
    } catch (error) {
        return [];
    }
}