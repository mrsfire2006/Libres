import { lazy, Suspense } from "react";
import type { RouteObject } from "react-router-dom";
import LoadingCircle from "@/components/shared/loading-circle";
import { AUTHORROUTES } from "./paths";



const UploadBookPage = lazy(() => import('./pages/Upload'));


export const authorRoutes: RouteObject[] = [
    {
        path: AUTHORROUTES.AUTHORDASHBOARD,
        element: (
            <Suspense fallback={<LoadingCircle />}>
                < UploadBookPage />
            </Suspense>
        ),

    },

];