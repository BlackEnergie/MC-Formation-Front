import React from 'react';
import {
    Navigate,
    Outlet,
} from 'react-router-dom';

const ProtectedRoute = ({isAllowed, isLoggedIn, redirectPath = '/unauthorized', children}) => {

    if (!isLoggedIn) {
        return <Navigate to={'/connexion'} replace />;
    }
    else if (!isAllowed) {
        return <Navigate to={redirectPath} replace />;
    }

    return children ? children : <Outlet />;
};

export default ProtectedRoute;
