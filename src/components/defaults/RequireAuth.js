import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../auth/hooks/useAuth";
import decodeToken from "../../auth/decodeToken";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();
    const jwt = localStorage.getItem('accessToken') || null;

    const roleExist = () => {

        if (Object.keys(auth).length !== 0){
            return (!!auth?.roles?.includes(allowedRoles));
        } 
        else if (jwt !== null) {
            const [isValid, decoded] = decodeToken(jwt);
            return !!isValid;
        }
        else {
            return false
        }
    }

    return (
        roleExist()
            ? <Outlet />
            : auth?.accessToken || jwt
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/connexion" state={{ from: location }} replace />
    );
}

export default RequireAuth;
