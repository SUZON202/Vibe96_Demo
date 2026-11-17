import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

    if (loading || isAdminLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-[#0a0f1e]">
                <span className="loading loading-spinner loading-lg text-orange-500">Loading...</span>
            </div>
        );
    }

    // ডেমো অ্যাডমিন ইমেইল ঠিক করে দেওয়া হলো (admin@swadgrill.com)
    if (user && (user.email === 'admin@swadgrill.com' || isAdmin)) {
        return children;
    }

    // যদি লগইন করা না থাকে তবে সঠিক ডেমো লগইন পেজে পাঠাবে
    return <Navigate to="/demo/login" state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;