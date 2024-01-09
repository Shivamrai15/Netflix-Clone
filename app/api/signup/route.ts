import { NextResponse , NextRequest } from "next/server";
import { db } from "@/lib/db";
import { RegistrationFormSchema } from "@/schemas";
import bcrypt from "bcryptjs";

export async function POST( params : NextRequest) {
    try {
        const body = await params.json();
        const isValidate = RegistrationFormSchema.safeParse(body);
        
        if(!isValidate.success){
            return new NextResponse("Invalid credentials", {status : 400});
        }

        const { email, password } = isValidate.data;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const existingUser = await db.user.findUnique({
            where : {
                email
            }
        });

        if(existingUser){
            return new NextResponse("Email is already in use", {status:401});
        }

        await db.user.create({
            data :{
                email,
                password : hashedPassword
            }
        });

        return NextResponse.json({
                                    message : "User has been created successfully",
                                    status : 201
                                });

    } catch (error) {
        console.log(error);
        return new NextResponse("Internal server error", {status:500});
    }
}