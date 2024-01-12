"use server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { without } from "lodash";


export const addToFavoriteMovies = async( id : string )=>{
    try {

        const session = await auth();
        if (!session){
            return null;
        }

        const userId = session.user?.id;
        const movie = await db.movies.findUnique({
            where :{
                id
            }
        });

        if (!movie){
            return null;
        }

        const user = await db.user.update({
            where : {
                id : userId
            },
            data : {
                myList : {
                    push : movie.id
                }
            }
        });

        return user;

    } catch (error) {
        return null;
    }
}

export const removeFromFavoriteMovies = async (id : string) => {
    try {
        const session = await auth();
        if (!session){
            return null;
        }

        const userId = session.user?.id;
        const movie = await db.movies.findUnique({
            where :{
                id
            }
        });

        if (!movie){
            return null;
        }

        const user = await db.user.findUnique({
            where :{
                id: userId
            }
        });

        if(!user){
            return null;
        }

        const fav_movies = without(user.myList, movie.id);

        const updateduser = await db.user.update({
            where : {
                id : user.id
            },
            data : {
                myList : fav_movies
            }
        });

        return updateduser;

    } catch (error) {
        return null;
    }
}