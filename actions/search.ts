"use server";

import { db } from "@/lib/db";
import { string } from "zod";

export const getSearchedResponse = async( query: string ) =>{
    try {
        
        if (!query) {
            return []
        } 

        const movie_response = await db.movies.findMany({
            where : {
                OR : [
                    { 
                        name : { contains : query, mode : "insensitive" }
                    }, 
                    {
                        description : { contains : query , mode : "insensitive" }
                    },
                ]
            }
        });

        const series_response  = await db.series.findMany({
            where : {
                OR : [
                    { 
                        name : { contains : query, mode : "insensitive" }
                    }, 
                    {
                        description : { contains : query , mode : "insensitive" }
                    },
                ]
            },
            include : {
                seasons : true
            }
        })

        return [...series_response, ...movie_response];

    } catch (error) {
        return []
    }
}