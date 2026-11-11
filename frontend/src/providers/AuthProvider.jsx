import React, { createContext, useState, useEffect } from 'react';
import {
    createUserWithEmailAndPassword,
    onIdTokenChanged,
    signInWithEmailAndPassword,
    signOut,
    updateProfile
} from "firebase/auth";
import { auth } from '../firebase/firebase.config';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Create User
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password).catch((error) => {
            setLoading(false);
            throw error;
        });
    };

    // Sign In User
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password).catch((error) => {
            setLoading(false);
            throw error;
        });
    };

    // Update Profile (Name)
    const updateUserProfile = (name) => {
        return updateProfile(auth.currentUser, {
            displayName: name
        });
    };

    // Logout User
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    // Firebase ID token is stored for API calls and refreshed automatically (about hourly)
    useEffect(() => {
        const unsubscribe = onIdTokenChanged(auth, async (currentUser) => {
            if (currentUser) {
                try {
                    const token = await currentUser.getIdToken();
                    localStorage.setItem('access-token', token);
                } catch (error) {
                    console.error('Token error:', error);
                }
                setUser(currentUser);
            } else {
                localStorage.removeItem('access-token');
                setUser(null);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        updateUserProfile,
        logOut
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;