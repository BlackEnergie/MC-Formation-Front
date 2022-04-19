import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useAuth from '../hooks/useAuth';
import jwtUtils from "../utils/jwtUtils";

const PersistLogin = () => {

    const { setAuth } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        
        let accessToken = localStorage.getItem('accessToken');

        if (jwtUtils(accessToken)) {
            setAuth({accessToken});
        }
        else {
            localStorage.clear();
            setAuth({});
            navigate('/');
        }

    }, [])

    return (
        <>
            <Outlet />
        </>
    )
}

export default PersistLogin