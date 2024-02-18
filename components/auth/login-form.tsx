"use client";

import * as z from "zod";
import { LoginFormSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from "@/components/ui/form"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useState } from "react";
import { login } from "@/actions/login";


export const LoginForm = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const form = useForm<z.infer<typeof LoginFormSchema>>({
        resolver : zodResolver(LoginFormSchema),
        defaultValues : {
            email : "",
            password : ""
        }
    });

    const onSubmit = async (values : z.infer<typeof LoginFormSchema>) => {
        try {
            setIsLoading(true);
            const response = await login(values);
            if (response?.error){
                toast.error(response.error);
            }
        } catch (error) {
            console.log(error);
        } finally{
            setIsLoading(false);
        }
    }

    return (
        <div className="flex justify-center items-center w-full">
            <div className="w-full md:w-[28rem] bg-black bg-opacity-70 p-6 md:p-12 rounded-lg">
                <div>
                    <h1 className="text-xl md:text-3xl w-full text-white font-semibold">Sign In</h1>
                </div>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8 mt-8"
                    >
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({field})=>(
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Email"
                                                className="h-14 bg-neutral-900 text-white text-[15px] border-zinc-400"
                                                type="email"
                                                disabled ={isLoading}
                                                autoComplete="off"
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
                                                className="h-14 bg-neutral-900 text-white text-[15px] border-zinc-400"
                                                type="password"
                                                disabled ={isLoading}
                                                autoComplete="off"
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full h-14 bg-red-600 hover:bg-red-700 text-xl font-semibold"
                            disabled ={isLoading}
                        >
                            { isLoading ? (<Loader2 className="animate-spin" />) : "Sign In"}
                        </Button>
                    </form>
                </Form>
                <div className="mt-16 mb-8">
                    <span className="text-zinc-400">New to Netflix?</span>
                    <Link
                        href="/"
                        className="text-white ml-2 hover:underline"
                    >
                        Sign up now
                    </Link>
                </div>
            </div>
        </div>
    );
}
