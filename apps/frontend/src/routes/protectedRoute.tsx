import LoadingCircle from "@/components/shared/loading-circle";
import { HOMEROUTES } from "@/features/home/paths";
import { useUser } from "@/features/user/user.hook";
import { Navigate, Outlet, useLocation } from "react-router-dom";

interface Props {
    allowedRoles?: string[];
}

export function ProtectedRoute({ allowedRoles }: Props) {
    const location = useLocation();
    const { data: result, isLoading, isFetching } = useUser().getUserProfileQuery;
    if (isLoading || (isFetching && !result?.value)) {
        return <LoadingCircle />;
    }

    if (!result?.value) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (allowedRoles && allowedRoles.length > 0) {
        const userRole = result.value.roles || "";

        if (!allowedRoles.includes(userRole)) {
            return <Navigate to={HOMEROUTES.INDEX} replace />;
        }
    }
    return <Outlet />;
}