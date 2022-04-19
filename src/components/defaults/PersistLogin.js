import {Outlet, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import useAuth from '../../auth/hooks/useAuth';
import decodeToken from "../../auth/decodeToken";

const PersistLogin = () => {

    const {setAuth} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {

        let accessToken = localStorage.getItem('accessToken');

        if (decodeToken(accessToken)) {
            setAuth({accessToken});
        } else {
            localStorage.clear();
            setAuth({});
            navigate('/');
        }

    }, [])

    return (
        <>
            <Outlet/>
        </>
    )
}

export default PersistLogin
