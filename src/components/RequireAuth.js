import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import jwt_decode from "jwt-decode";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    let jwt = auth?.accessToken? auth.accessToken: localStorage.getItem('accessToken') ;
    let decoded = jwt_decode(jwt);
    let role = decoded.role;
    console.log(`roles `, role);

    return (
        allowedRoles?.includes(role)
            ? <Outlet />
            : auth?.accessToken 
                ? <Navigate to="/unauthorized" state={{ from: location}} replace />
                : <Navigate to="/" state={{ from: location}} replace />
    )
}

export default RequireAuth;