import useAuth from "./useAuth";

const useLogout = () => {
    const {setAuth} = useAuth();

    const logout = () => {
        setAuth({});
        try {
            localStorage.clear();
        } catch (err) {
            console.error(err);
        }
    }

    return logout;
}

export default useLogout
