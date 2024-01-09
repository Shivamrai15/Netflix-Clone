"use server";

import * as z from "zod";
import { LoginFormSchema } from "@/schemas";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const login = async(values : z.infer<typeof LoginFormSchema>)=>{
    const validateData = LoginFormSchema.safeParse(values);
    if (!validateData.success){
        return { error : "Invalid credentials" }
    }
    const { email, password } = validateData.data;
    try {

        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        });

    } catch (error) {
        
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials!" }
                default:
                    return { error: "Something went wrong!" }
            }
        }
    
        throw error;
    }
}