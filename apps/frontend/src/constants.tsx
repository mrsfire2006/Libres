const BACKEND_URL = import.meta.env.VITE_API_URL || "https://localhost:7153";

export const ROUTES = {
    UPLOAD: '/author/upload',
    AUTHOR: '/author',

}
export const APIROUTES = {
    UPLOAD: "books/upload"

}

export const QUERIESKEY = {
    USER_PROFILE_KEY: "user-profile",
    ALL_CATEGORIES: "categories"
}

export const ENV = {
    APIURL: BACKEND_URL
}


