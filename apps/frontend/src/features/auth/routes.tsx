import { lazy, Suspense } from "react";
import type { RouteObject } from "react-router-dom";
import { AUTHROUTES } from "./paths";
import LoadingCircle from "@/components/shared/loading-circle";



const LoginPage = lazy(() => import('./pages/Login'));
const RegisterPage = lazy(() => import('./pages/Register'));


export const authRoutes: RouteObject[] = [
    {
        path: AUTHROUTES.LOGIN,
        element: (
            <Suspense fallback={<LoadingCircle />}>
                < LoginPage />
            </Suspense>
        ),

    },
    {
        path: AUTHROUTES.REGISTER,
        element: (
            <Suspense fallback={<LoadingCircle />}>
                < RegisterPage />
            </Suspense>
        ),
    },
];