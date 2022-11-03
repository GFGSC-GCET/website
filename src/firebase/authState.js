import React, { useEffect, useState } from "react";
import { auth, db } from "./index";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useUserContext } from "./authContext";
import { Loading } from "../components";

export default function AuthStateChanged({ children }) {
  const { setUser, user, member } = useUserContext();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const memberRes = await member.get(user);
        setUser(memberRes);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    });
  }, []);

  if (loading) {
    return <Loading />;
  }
  return children;
}
