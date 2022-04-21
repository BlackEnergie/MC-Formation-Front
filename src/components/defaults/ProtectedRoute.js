import {
    Navigate,
    Outlet,
} from 'react-router-dom';

const ProtectedRoute = ({isAllowed, isLogedIn, redirectPath = '/unauthorized', children}) => {
    console.log(`is allowed `, isAllowed);

    if (!isLogedIn) {
        return <Navigate to={'/connexion'} replace />;
    }
    else if (!isAllowed) {
        return <Navigate to={redirectPath} replace />;
    }

    return children ? children : <Outlet />;
};

export default ProtectedRoute;