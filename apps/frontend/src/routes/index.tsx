import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";

import { authRoutes } from "@/features/auth/routes";
import { HOMEROUTES } from "@/features/home/paths";
import RootLayout from "./rootLayout";
import Home from "@/features/home/pages/home";
import { storeRoutes } from "@/features/store/routes";
import { authorRoutes } from "@/features/author/routes";

import { userRoutes } from "@/features/user/routes";


export const router = createBrowserRouter([
    {
        path: HOMEROUTES.INDEX,
        element: <RootLayout />,
        children: [
            { index: true, element: <Home /> },
            ...authRoutes,
            ...storeRoutes,
            ...authorRoutes,
            ...userRoutes
        ],
    },
    // {
    //     path: AUTHORROUTES.AUTHORDASHBOARD,
    //     element: (
    //         <ProtectedRoute allowedRoles={["Author"]}>
    //             <RootLayout />
    //         </ProtectedRoute>
    //     ),
    //     children: [
    //         { index: true, element: <UploadBookPage /> },
    //         ...authorRoutes
    //     ],
    // },
    // {
    //     path: USERROUTES.USERLIBRARY,
    //     element: (
    //         <ProtectedRoute allowedRoles={["Reader"]}>
    //             <RootLayout />
    //         </ProtectedRoute>
    //     ),
    //     children: [
    //         { index: true, element: <LibraryPage /> },
    //         ...userRoutes
    //     ],
    // },
    // {
    //     path: USERROUTES.USERPROFILE,
    //     element: (
    //         <ProtectedRoute>
    //             <RootLayout />
    //         </ProtectedRoute>
    //     ),
    //     children: [
    //         { index: true, element: <ProfilePage /> },
    //     ],
    // },


    {
        path: "*",
        element: <Navigate to="/" replace />,
    },
]);


export default function AppRouter() {
    return <RouterProvider router={router} />;
}