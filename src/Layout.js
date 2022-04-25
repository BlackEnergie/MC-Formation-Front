import { Outlet } from "react-router-dom";
import Header from "./components/const/Header/Header";
import Footer from "./components/const/Footer/Footer";
import { useState } from 'react';

const Layout = () => {

    const [login, setLogin] = useState(localStorage.getItem('accessToken') || false);

    return (
        <>
            <Header login={login} setLogin={setLogin}/>
            <div id="main" className="container-fluid flex-fill mt-3">
                <Outlet context={[login, setLogin]}/>
            </div>
            {
                !login 
                ?<Footer />:<div className="pb-5"></div>
            }
        </>
    )
}

export default Layout
