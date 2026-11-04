import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import useAdmin from '../hooks/useAdmin';

const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

    // Show a loading spinner while user or admin data is loading
    if (loading || isAdminLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-[#0a0f1e]">
                <span className="loading loading-spinner loading-lg text-orange-500">Loading...</span>
            </div>
        );
    }

    // Allow access if the user is logged in and is an admin
    if (user && isAdmin) {
        return children;
    }

    // Redirect regular users to the home page
    return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;