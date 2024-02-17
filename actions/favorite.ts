"use server";
import { auth } from "@/auth";
import { db } from "@/lib/db";


export const addToMyList = async( id : string, isSeries: boolean )=>{
    try {

        const session = await auth();
        if (!session){
            return null;
        }

        const userId = session.user?.id;

        if (!userId) {
            return null;
        }

        const myList = await db.myList.create({
            data : {
                contentId : id,
                isSeries,
                userId
            }
        });

        return myList;

    } catch (error) {
        return null;
    }
}

export const removeFromMyList = async ( id: string ) => {
    try {
        
        const session = await auth();
        if (!session || !session.user || !session.user.id){
            return null;
        }

        const myList = await db.myList.delete({
            where : {
                userId_contentId : {
                    userId : session.user.id,
                    contentId : id
                }
            }
        });

        return myList;

    } catch (error) {
        return null;
    }
}

export const getMyList = async() => {
    try {
        
        const session = await auth();
        if (!session || !session.user || !session.user.id){
            return null;
        }

        const list = await db.myList.findMany({
            where : {
                userId : session.user.id
            },
            orderBy : {
                createdAt : "desc"
            }
        })

        return list;

    } catch (error) {
        return []
    }
} 