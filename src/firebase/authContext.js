import { createContext, useContext, useState, useEffect } from "react";

import {
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut
} from "firebase/auth";

import { auth, db } from "../firebase";

import { doc, setDoc, getDoc } from "firebase/firestore";

export const UserContext = createContext({});


export const useUserContext = () => {
  return useContext(UserContext);
};


export const UserContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false)


  const AuthService = {
    loginWithGoogle: async () => {
      const provider = new GoogleAuthProvider();
      try {
        setLoggingIn(true)
        const userCred = await signInWithPopup(auth, provider);
        setLoggingIn(false)
        userCred.user.photoURL = userCred.user.photoURL.replace('s96-c', 's400-c');
        return {
          user: userCred.user,
        };
      } catch (e) {
        setLoggingIn(false)
        const msg = e.message.match(/\(([^)]+)\)/)[1]
        return {
          error: msg,
        };
      }
    },
    logout: async () => {
      await signOut(auth);
    },
  };

  const loginWithGoogle = async () => {
    const { error, user } = await AuthService.loginWithGoogle();
    setError(error ?? "");
    setUser(user ?? null);
  };

  const logout = async () => {
    await AuthService.logout();
    setUser(null);
  };



  const contextValue = {
    loginWithGoogle,
    logout,
    user,
    error,
    setUser,
    loggingIn
  };

  return <UserContext.Provider value={contextValue} {...props} />;
};
