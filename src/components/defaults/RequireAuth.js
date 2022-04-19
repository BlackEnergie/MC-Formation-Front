import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import decodeToken from "../jwtUtils/jwtUtils";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();
    const jwt = localStorage.getItem('accessToken') || null;
    console.log(`auth `, auth);
    console.log(`jwt `, jwt);
    console.log(`allowedRoles `, allowedRoles);

    const roleExist = () => {

        if (Object.keys(auth).length !== 0){
            console.log(`auth roles `, auth?.roles);
            console.log(`checkAuthExist `, auth?.roles?.includes(allowedRoles) ? true : false);    
            return (auth?.roles?.includes(allowedRoles) ? true : false);
        } 
        else if (jwt !== null) {
            const [isValid, decoded] = decodeToken(jwt);
            console.log(`isJwtValid `, isValid);
            console.log(`jwt decoded `, decoded);    
            if (isValid) {
                let role = decoded.role;
                console.log(`decoded jwt role `, role);
                return true
            }
            else {
                console.log(`localstorage return `, false);
                return false
            }
        }
        else {
            console.log(`auth and localstorage jwt return `, false);
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