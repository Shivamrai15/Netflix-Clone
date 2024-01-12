import { Genre } from "@prisma/client";

interface MovieCardGerneProps {
    genre : Genre[]
}

export const MovieCardGerne = ({
    genre
} : MovieCardGerneProps) => {
  return (
    <div className="w-full flex items-center justify-start gap-x-1 text-zinc-300 text-sm">
        {genre.map((genr, idx)=>(
            <div key={idx} className="flex flex-row items-center gap-x-1">
                {genr}
                { idx !== (genre.length-1) && (
                    <div className="h-1 w-1 block bg-zinc-300 rounded-full" />
                )}
            </div>  
        ))}
    </div>
  )
}
