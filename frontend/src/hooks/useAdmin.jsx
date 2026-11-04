import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';

const useAdmin = () => {
    const { user, loading } = useContext(AuthContext);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAdminLoading, setIsAdminLoading] = useState(true);

    useEffect(() => {
        // Logging to check which email is received from Firebase
        if(user?.email) {
            console.log("Email received from Firebase:", user.email);
        }

        if (user?.email) {
            fetch(`http://localhost:5000/users/role/${user.email}`)
                .then(res => res.json())
                .then(data => {
                    // Logging to check what role is received from the database
                    console.log("Role received from Database:", data.role); 
                    
                    setIsAdmin(data.role === 'admin');
                    setIsAdminLoading(false);
                })
                .catch(err => {
                    console.error("Admin check error:", err);
                    setIsAdminLoading(false);
                });
        } else if (!loading) {
            setIsAdminLoading(false);
        }
    }, [user?.email, loading]);

    return [isAdmin, isAdminLoading];
};

export default useAdmin;