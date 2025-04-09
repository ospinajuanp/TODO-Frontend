import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './context/authContext';

const ProtectedRoute = () => {
    const { isAuthenticated, user,loading } = useAuth();

    if (loading) {
        return <p>Loading...</p>;
    }
    if (!isAuthenticated && !loading) {
        return <Navigate to="/login" replace/>;
    }
    return (
        <Outlet/>
    );
};

export default ProtectedRoute;