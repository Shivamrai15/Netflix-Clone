import * as z from "zod";

export const LandingFormSchema = z.object({
    email : z.string().email({
        message : "⛒ Email is required"
    })
});

export const RegistrationFormSchema = z.object({
    email : z.string().email({
        message : "⛒ Email is required"
    }),
    password : z.string().min(6, {
        message : "⛒ Password is required of minimum 6 characters"
    })
});

export const ProfileFormSchema = z.object({
    name : z.string().min(3, {
        message : "⛒ Name is required"
    })
});

export const LoginFormSchema = z.object({
    email : z.string().email({
        message : "⛒ Email is required"
    }),
    password : z.string().min(6, {
        message : "⛒ Password is required"
    })
});
