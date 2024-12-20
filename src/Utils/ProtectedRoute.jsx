import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const location = useLocation();

    // If not authenticated, redirect to login page
    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    // If authenticated, render children (the protected component)
    return children;
};

export default ProtectedRoute;
