import React, { useEffect, useState } from "react";
import { auth, db } from "./index";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useUserContext } from "./authContext";
import {Loading} from "../components";


export default function AuthStateChanged({ children }) {
  const { setUser, user } = useUserContext();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(user);
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        user.photoURL = user.photoURL.replace('s96-c', 's400-c');
        setUser(user);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    });
  }, []);

  

  useEffect(() => {
    console.log(user);
  }, [user]);



  if (loading) {
    return <Loading/>;
  }
  return children;
}
