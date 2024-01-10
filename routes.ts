// An array of routes that are used for authentication
// These routes does not require authentication

export const AuthRoutes = [
    "/",
    "/login",
    "/sign-up/registration",
    "/sign-up/regform",
    "/sign-up/profile",
]

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/profile";