import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";

import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth, db, database } from ".";

import { get, ref, set } from "firebase/database";
import {doc, getDoc, setDoc } from "firebase/firestore";

export const UserContext = createContext({});

export const useUserContext = () => useContext(UserContext);

export const UserContextProvider = (props) => {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  const checkAccount = async (user) => {

    if (user != null) {

      const userRef = ref(database, `users/${user.uid}`);
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
          try {
          const userObj = await snapshot.val();
          userObj.regComplete ? router.push("/") : router.push("/join/complete");
          setUser(userObj);
          return;
          } catch (e) {
            console.log(e);
          }
        } else {
          const userObj = {
            displayName: user.displayName,
            uid: user.uid,
            email: user.email,
            collegeEmail:'',
            whatsappNumber:'',
            year:'',
            batch:'',
            bio:'',
            learning:'',
            skills:'',
            github:'',
            linkedin:'',
            website:'',
            instagram:'',
            photoURL: user.photoURL,
            createdAt: new Date().toISOString(),
            regComplete: false,
            priority: 10,
            admin: false,
          };
          setUser(userObj);
          await set(userRef, userObj);
          console.log("running")
          router.push("/join");
          return;
        }

      // const docRef = doc(db, "users", user.uid);
      // const docSnap = await getDoc(docRef);
      // if (docSnap.exists()) {
      //   docSnap.data().regComplete ? router.push("/") : router.push("/join/complete");
      //   setUser(docSnap.data());
      // } else {
      //   const userObj = {
      //     displayName: user.displayName,
      //     uid: user.uid,
      //     email: user.email,
      //     photoURL: user.photoURL,
      //     createdAt: new Date().toISOString(),
      //     regComplete: false,
      //     priority: 10,
      //     admin: false,
      //   };
      //   setDoc(doc(db, "users", user.uid), userObj);
      //   setUser(userObj);
      //   router.push("/join");
      // }
    }
    return
  };

  const member = {
    get: async (user) => {
      if (user != null) {
        const userRef =  ref(database, `users/${user.uid}`);
        const snapshot = await get(userRef);
        const userObj = await snapshot.val();
        return userObj;
        // const docRef = doc(db, "users", user.uid);
        // const docSnap = await getDoc(docRef);
        // return docSnap.data();
      }
      else{
        return user
      }
    },

    set: async (user) => {
      if (user != null) {
        const userRef = ref(database, `users/${user.uid}`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          const response = await set(userRef, user);
          return response;
        }
        return null

        // const docRef = doc(db, "users", user.uid);
        // const docSnap = await getDoc(docRef);
        // if (docSnap.exists()) {
        //   const response = await setDoc(docRef, user);
        //   return response;
        // }
        // return null;
      }
      else{
        return user
      }
    },
  };

  const AuthService = {
    loginWithGoogle: async () => {
      const provider = new GoogleAuthProvider();
      try {
        setLoggingIn(true);
        const userCred = await signInWithPopup(auth, provider);
        setLoggingIn(false);
        userCred.user.photoURL = userCred.user.photoURL.replace(
          "s96-c",
          "s400-c"
        );
        return {
          user: userCred.user,
        };
      } catch (e) {
        setLoggingIn(false);
        const msg = e.message.match(/\(([^)]+)\)/)[1];
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
    checkAccount(user);

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
    loggingIn,
    checkAccount,
    member,
  };

  return <UserContext.Provider value={contextValue} {...props} />;
};
