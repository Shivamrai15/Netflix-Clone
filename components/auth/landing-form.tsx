"use client";

import * as z from "zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { LandingFormSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronRight } from "lucide-react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from "@/components/ui/form"

export const LandingForm = () => {

    const router = useRouter()

    const form = useForm<z.infer<typeof LandingFormSchema>>({
        resolver : zodResolver(LandingFormSchema),
        defaultValues : {
            email : ""
        }
    });

    const onSubmit = (values : z.infer<typeof LandingFormSchema>)=>{
        const url  = `/sign-up/registration?email=${values.email}`;
        router.push(url);
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full flex flex-col md:flex-row justify-center items-center md:items-start mt-6 gap-x-2 gap-y-4"
            >
                <FormField
                    control={form.control}
                    name="email"
                    render={({field})=>(
                        <FormItem>
                            <FormControl>
                                <Input
                                    {...field}
                                    className="w-80 md:w-96 h-14 bg-neutral-900/70 text-white text-[16px]"
                                    placeholder="Email Address"
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <Button
                    type="submit"
                    className="h-14 w-48 text-lg font-semibold bg-red-600 hover:bg-red-700 flex justify-between items-center px-6"
                >
                    Get Started
                    <ChevronRight/>
                </Button>
                
            </form>
        </Form>
    )
}
