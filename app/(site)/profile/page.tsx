"use client";
import { useRouter } from "@/hooks/useRouter";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const ProfilePage = () => {

    const session = useSession();
    const { setPropogation } = useRouter();

    const handleRouting = ()=>{
        setPropogation(70);
    }

    return (
        <div className="h-full w-full bg-neutral-900 flex items-center justify-center">
            <div className="flex flex-col">
                <h1 className="text-3xl md:text-4xl text-white font-medium text-center">
                    Who's watching?
                </h1>
                <div className="flex items-center justify-center gap-8 mt-10">
                    <Link
                        href="/browse" 
                        onClick={handleRouting}>
                        <div className="group flex-row">
                            <div
                                className="w-36 h-36 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden transition relative"
                            >
                                <Image
                                    src="/default-red.png"
                                    fill
                                    alt="profile"
                                    className="object-contain"
                                />
                            </div>
                            <div className="mt-4 text-sm text-zinc-400 text-center">
                                {session.data?.user?.name || "User"}
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;