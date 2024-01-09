"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

import { RegistrationFormSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { useState } from "react";


export const RegistrationForm = ()=>{

    const params = useSearchParams();
    const email = params.get("email")?.toString();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const form  = useForm<z.infer<typeof RegistrationFormSchema>>({
        resolver : zodResolver(RegistrationFormSchema),
        defaultValues : {
            email : email || "",
            password : ""
        }
    });

    const onSubmit = async(values : z.infer<typeof RegistrationFormSchema>)=>{
        try {
            setIsLoading(true);
            await axios.post("/api/signup", values);
            router.push(`/sign-up/profile?email=${values.email}`);
        } catch (error){
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data);
            }
            console.log(error);
        }
        finally{
            setIsLoading(false);
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-3"  
            >
                <FormField
                    control={form.control}
                    name="email"
                    render={({field})=>(
                        <FormItem>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="Email"
                                    className="h-12 border-zinc-400 text-zinc-800 font-normal text-[15px]"
                                    type="email"
                                    disabled = {isLoading}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({field})=>(
                        <FormItem>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="Password"
                                    className="h-12 border-zinc-400 text-zinc-800 font-normal text-[15px]"
                                    type="password"
                                    disabled = {isLoading}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <Button
                    type="submit"
                    disabled = {isLoading}
                    className="w-full h-16 bg-red-600 hover:bg-red-500 text-xl font-semibold"
                >
                    {isLoading ? (<Loader2 className="animate-spin"/>) : "Next"}
                </Button>
            </form>
        </Form>
    );
}