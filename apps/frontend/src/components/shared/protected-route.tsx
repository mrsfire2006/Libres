// import { HOMEROUTES } from '@/features/home/paths';
// import { UserRoles } from '@/features/user/type';
// import { useGetUserProfileQuery } from '@/features/user/user.hook';
// import type { ReactNode } from 'react';
// import { Navigate } from 'react-router-dom';

// export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
//     const { data: user } = useGetUserProfileQuery();



//     const isAuthenticated = !!user?.value?.roles && user?.value?.roles.includes(UserRoles.Author);
//     if (!isAuthenticated) {

//         return <Navigate to={HOMEROUTES.INDEX} replace />;
//     }

//     return children;
// };