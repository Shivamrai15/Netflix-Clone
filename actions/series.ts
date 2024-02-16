"use server";

import { db } from "@/lib/db";
import { Genre } from "@prisma/client";

export const getSeriesByGenre = async ( genre : Genre ) => {
    try {
        
        const series = await db.series.findMany({
            where : {
                genre : {
                    has : genre
                }
            }
        });

        return series;

    } catch (error) {
        console.log(error)
        return null;
    }
}

export const getSeriesById = async ( id: string ) => {
    try {
        
        const series = await db.series.findUnique({
            where : {
                id
            },
            include : {
                seasons : {
                    include : {
                        episodes : {
                            orderBy : {
                                number : "asc"
                            }
                        }
                    },
                    orderBy : {
                        number : "asc"
                    }
                },
                videos : true
            }
        });

        return series;

    } catch (error) {
        return null;   
    }
}

export const getOnlySeries = async ( id: string ) => {
    try {
        const series = await db.series.findUnique({
            where : {
                id
            }
        });

        return series;
    } catch (error) {
        return null;
    }
}