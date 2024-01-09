"use client";

import * as z from "zod";
import { ProfileFormSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const ProfileForm = () => {

    const params = useSearchParams();
    const email = params.get("email");

    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const form = useForm<z.infer<typeof ProfileFormSchema>>({
        resolver : zodResolver(ProfileFormSchema),
        defaultValues : {
            name : ""
        }
    });

    const onSubmit = async(values : z.infer<typeof ProfileFormSchema>)=>{
        if(!email){
            router.push("/");
        }
        try {
            setIsLoading(true);
            await axios.patch("/api/update-profile", {
                values,
                email
            });
            router.push("/login");
        } catch (error) {
            if (axios.isAxiosError(error)){
                toast.error(error.response?.data);
            }
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Form {...form}>
            <FormDescription>
                Email - {email}
            </FormDescription>
            <form
               onSubmit={form.handleSubmit(onSubmit)} 
               className="w-full space-y-4"
            >
                <FormField
                    control={form.control}
                    name = "name"
                    render={({field})=>(
                        <FormItem>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="Your name"
                                    className="h-12 border-zinc-400 text-zinc-800 font-normal text-[15px] border-2"
                                    disabled = {isLoading}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <Button
                    type="submit"
                    className="w-full h-16 bg-red-600 hover:bg-red-500 text-xl font-semibold"
                    disabled = {isLoading}
                >
                    { isLoading ? (<Loader2 className="animate-spin"/>) : "Complete"}
                </Button>
            </form>
        </Form>
    )
}
