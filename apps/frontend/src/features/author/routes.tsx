import { lazy, Suspense } from "react";
import type { RouteObject } from "react-router-dom";
import LoadingCircle from "@/components/shared/loading-circle";
import { ProtectedRoute } from "@/routes/protectedRoute";
import { AUTHORROUTES } from "./paths";



const AuthorDashboard = lazy(() => import('./pages/author-dashboard'));


export const authorRoutes: RouteObject[] = [
    {
        element: <ProtectedRoute allowedRoles={["Author"]}/>,
        children: [
            {
                path: AUTHORROUTES.AUTHORDASHBOARD,
                element: (

                    <Suspense fallback={<LoadingCircle />}>
                        <AuthorDashboard />
                    </Suspense>
                ),
            },
        ],


    },

];