import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db";
import { ProfileFormSchema } from "@/schemas";

export async function PATCH( params: NextRequest ) {
    try {
        const {values, email} = await params.json();
        const isValidate = ProfileFormSchema.safeParse(values);

        if(!isValidate.success){
            return new NextResponse("Invalid credentials", {status:401});
        }
        
        const { name } = isValidate.data;

        const user = await db.user.findUnique({
            where : {
                email
            }
        });

        if(!user){
            return new NextResponse("Account does not exist", {status:404});
        }

        if (user.isVerified){
            return new NextResponse("Unauthorized access", {status:401});
        }

        await db.user.update({
            where : {
                id : user.id
            },
            data : {
                name,
                isVerified : true
            }
        });

        return NextResponse.json({
            success : "Profile has been created successfully",
            status : 200
        });

    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}