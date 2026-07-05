import { lazy, Suspense } from "react";
import type { RouteObject } from "react-router-dom";
import LoadingCircle from "@/components/shared/loading-circle";
import { STOREROUTES } from "./paths";



const StorePage = lazy(() => import("./pages/Store"))
const BookDetailsPage = lazy(() => import("./pages/book-details"));

export const storeRoutes: RouteObject[] = [
    {
        path: STOREROUTES.STORE,
        element: (
            <Suspense fallback={<LoadingCircle />}>
                < StorePage />
            </Suspense>)
    },
    {
         path: STOREROUTES.BOOKDETAILS.path,  
        element: (
            <Suspense fallback={<LoadingCircle />}>
                <BookDetailsPage />
            </Suspense>
        )
    }
]