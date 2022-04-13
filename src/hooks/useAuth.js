import { useContext, useDebugValue } from "react";
import AuthContext from "../context/AuthProvider";

const useAuth = () => {
    const { auth } = useContext(AuthContext);
    useDebugValue(auth, auth => auth?.nomUtilisateur ? "Logged in" : "Logged out");
    return useContext(AuthContext);
}

export default useAuth;