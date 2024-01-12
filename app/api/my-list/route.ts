import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const session = await auth();
        if(!session) {
            return new NextResponse("Unauthorized", {status : 401});
        }

        const user = await db.user.findUnique({
            where : {
                id : session.user?.id
            }
        });

        if(!user) {
            return new NextResponse("Unauthorized", {status : 401});
        }
        const fav_movies = await db.movies.findMany({
            where : {
                id : {
                    in : user.myList
                }
            }
        });

        return NextResponse.json(fav_movies, {status : 200});

    } catch (error) {
        return new NextResponse("Internal Server Error", {status : 500})
    }
}