import NextAuth from "next-auth";
import authConfig from "@/auth.config";

import {
    AuthRoutes,
    DEFAULT_LOGIN_REDIRECT,
    apiAuthPrefix
} from "@/routes";

const { auth } = NextAuth(authConfig);

export default auth((req)=>{
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isAuthRoute = AuthRoutes.includes(nextUrl.pathname);

    if(isApiAuthRoute){
        return null;
    }

    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
        }
        return null;
      }
    
    if (!isLoggedIn) {
        return Response.redirect(new URL("/login", nextUrl));
    }
    
    return null;

});

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
  }