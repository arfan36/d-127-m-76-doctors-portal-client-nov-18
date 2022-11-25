import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import app from '../firebase/firebase.config';

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // create user with email and password
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // sign in with email and password
    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    // update profile
    const updateUser = (userInfo) => {
        return updateProfile(auth.currentUser, userInfo);
    };

    // sign Out
    const logOut = () => {
        return signOut(auth);
    };

    // observer
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log('user observing', currentUser);
            setUser(currentUser);
            if (currentUser === null || currentUser.emailVerified) {
            }
            setLoading(false);
        });
        return () => {
            unsubscribe();
        };
    }, []);


    const authInfo = {
        createUser,
        signIn,
        updateUser,
        logOut,
        user
    };
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;