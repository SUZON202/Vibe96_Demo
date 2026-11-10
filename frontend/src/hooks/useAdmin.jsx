import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';

const useAdmin = () => {
    const { user, loading } = useContext(AuthContext);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAdminLoading, setIsAdminLoading] = useState(true);

    useEffect(() => {
        if(user?.email) {
            console.log("Email received from Firebase:", user.email);
        }

        if (user?.email) {
            // লোকাল স্টোরেজ থেকে টোকেনটি নেওয়া হচ্ছে 
            const token = localStorage.getItem('access-token');

            fetch(`http://localhost:5000/users/role/${user.email}`, {
                // টোকেনটি হেডার্সের মাধ্যমে ব্যাকএন্ডে পাঠানো হচ্ছে
                headers: {
                    authorization: `Bearer ${token}` 
                }
            })
                .then(res => res.json())
                .then(data => {
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