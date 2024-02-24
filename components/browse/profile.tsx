"use client";

import { isEmpty } from "lodash";
import { useEffect } from "react";
import { useMyList } from "@/hooks/use-my-list";
import { Episode, Movies, Season, Series } from "@prisma/client";
import { signOut } from "next-auth/react";
import { useRouter as Router } from "@/hooks/useRouter";

import {
    DropdownMenu,
    DropdownMenuLabel,
    DropdownMenuItem,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { LogOutIcon, Star } from "lucide-react";
import { useRouter } from "next/navigation";

interface ProfileProps {
    data : ( Movies | (Series & {
        seasons : (Season & {
            episodes : Episode[]
        })[]
    }))[];
}

export const Profile = ({
    data
} : ProfileProps ) => {

    const {createList} = useMyList();
    const session = useSession();
    const router = useRouter();
    const { setPropogation } = Router();

    useEffect(()=>{
        if (!isEmpty(data)){
            createList(data);
        }
    }, [data]);

    return (
        <div className="text-white">
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Image
                        src="/default-red.png"
                        alt="Profile"
                        fill
                        className="rounded-sm"
                    />
                </DropdownMenuTrigger>
                <DropdownMenuContent align = "end" className="w-44 bg-neutral-900 border-zinc-600">
                    <DropdownMenuLabel className="flex items-center gap-x-3">
                        <Image
                            src="/default-red.png"
                            height={25}
                            width={25}
                            alt="Profile"
                            className="rounded-sm"
                        />
                        <p className="text-white font-medium line-clamp-1">
                            {session.data?.user?.name}
                        </p>
                    </DropdownMenuLabel>
                    <DropdownMenuItem
                        className="text-zinc-200 focus:bg-neutral-950 focus:text-white"
                        onClick={()=>{
                            router.push("/mylist");
                            setPropogation(30);
                        }}
                    >
                        <Star className="h-5 w-5 mr-5" />
                        My List
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="text-zinc-200 focus:bg-neutral-950 focus:text-white"
                        onClick={()=>signOut()}
                    >
                        <LogOutIcon className="h-5 w-5 mr-5" />
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
