import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    // Show loading while checking Firebase authentication
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-[#0a0f1e]">
                <span className="loading loading-spinner loading-lg text-orange-500">Loading...</span>
            </div>
        );
    }

    // Allow access if the user is logged in
    if (user) {
        return children;
    }

    // Redirect to login page if not logged in
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default ProtectedRoute;