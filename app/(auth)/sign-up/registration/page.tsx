"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";

const SignUpPage = () => {

    const router = useRouter();
    const params = useSearchParams();
    const email = params.get("email");

    const onClick = ()=>{
        if(!email){
            router.push("/");
        }
        else{
            const url = `/sign-up/regform?email=${email}`
            router.push(url);
        }
    }

    return (
        <div className="h-full flex justify-center items-center">
            <div className="flex flex-col items-center mt-8 md:mt-20">
                <div className="h-36 w-64 relative flex items-end">
                    <Image
                        src="/Devices.png"
                        fill
                        alt="Devices"
                        className="object-contain"
                    />
                </div>
                <div className="max-w-md flex flex-col justify-center items-center px-4 gap-y-5">
                    <h2 className="text-xs font-semibold text-zinc-800">STEP 1 OF 3</h2>
                    <p className="text-3xl text-center font-bold text-zinc-700">Finish setting up your account</p>
                    <p className="text-lg text-zinc-800 text-center px-12">Netflix is personalised for you. Create a password to watch on any device at any time.</p>
                    <Button
                        onClick={onClick}
                        className="bg-red-600 h-16 w-80 rounded-sm hover:bg-red-500 text-xl font-semibold"
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage