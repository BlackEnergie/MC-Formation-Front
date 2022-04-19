import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { useState } from 'react';

const Layout = () => {

    const [login, setLogin] = useState(localStorage.getItem('accessToken') || false);

    return (
        <>
            <Header login={login} setLogin={setLogin}/>
            <Outlet context={[login, setLogin]}/>
            <Footer />
        </>
    )
}

export default Layout