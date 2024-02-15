import { Genre } from "@prisma/client";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const toTitle = ( text : string )=>{
  const value = text.charAt(0) + text.toLowerCase().slice(1);
  return value
}

export const genreFormatter = ( genre : Genre[] ) => {
  let text = "";
  for ( let i=0 ; i< genre.length ; i++) {
    if ( i === genre.length-1 ){
      text = text + "& " + toTitle(genre[i].toString());
    } else {
      text = text + toTitle(genre[i]) + " ";
    }
  }
  return text;
}