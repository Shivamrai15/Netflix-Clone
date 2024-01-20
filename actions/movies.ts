"use server";

import { db } from "@/lib/db";
import { Genre } from "@prisma/client";

export const movies = async()=>{
    try {
        const movies = await db.movies.findMany();
        return movies;
    } catch (error) {
        return [];
    }
}

export const moviesByGenre = async(genre : Genre)=>{
    try {
        const movies = await db.movies.findMany({
            where : {
                genre : {
                    has : genre,
                },
            },
            orderBy : {
                release : "desc"
            },
            take : 12
        });

        return movies;
    } catch (error) {
        return []
    }
}

export const getMovieByID = async(id : string)=>{
    try {
        const movie = await db.movies.findUnique({
            where : {
                id
            }
        });
        return movie;
    } catch (error) {
        return null;
    }
}