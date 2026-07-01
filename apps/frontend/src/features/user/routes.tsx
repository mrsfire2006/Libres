import { lazy, Suspense } from "react";
import type { RouteObject } from "react-router-dom";
import LoadingCircle from "@/components/shared/loading-circle";
import { USERROUTES } from "./paths";
import { ProtectedRoute } from "@/routes/protectedRoute";



const ProfilePage = lazy(() => import('./pages/profile'));


export const userRoutes: RouteObject[] = [
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: USERROUTES.USERPROFILE,
                element: (
                    <Suspense fallback={<LoadingCircle />}>
                        <ProfilePage />
                    </Suspense>
                ),
            },
        ],
    },

];