import { lazy, Suspense } from "react";
import type { RouteObject } from "react-router-dom";
import { HOMEROUTES } from "./paths";
import LoadingCircle from "@/components/shared/loading-circle";



const HomePage = lazy(() => import("./pages/home"))


export const homeRoutes: RouteObject[] = [
    {
        path: HOMEROUTES.INDEX,
        element: (<Suspense fallback={<LoadingCircle />}>
            < HomePage />
        </Suspense>)
    }
]