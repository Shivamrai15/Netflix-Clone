"use client";

import { FavList } from "@/components/browse/fav-list";

const MyListPage = () => {
    return (
        <div className="w-full h-full bg-neutral-900 pt-28">
            <FavList page = {true}/>
        </div>
    )
}

export default MyListPage;