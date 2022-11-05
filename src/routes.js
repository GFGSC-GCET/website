import React, { useEffect, useState } from "react";
import { useUserContext } from "./firebase/authContext";
import { Loading } from "./components";
import { useRouter } from "next/router";

export const withPublic = (Component) => {
  return function WithPublic(props) {
    useEffect(()=>{
      useauth.checkAccount(useauth.user);
    },[])
    const useauth = useUserContext();
    return <Component useauth={useauth} {...props} />;
  };
}

export function withProtected(Component) {
  return function WithProtected(props) {
    useEffect(()=>{
      useauth.checkAccount(useauth.user);
    },[])
    const useauth = useUserContext();
    const router = useRouter();
    if (!useauth.user) {
      router.replace("/");
      return <Loading />;
    }

    return <Component useauth={useauth} {...props} />;
  };
}

export function AdminProtected(Component) {
  return function AdminProtected(props) {
    const useauth = useUserContext();
    const router = useRouter();

    if (!useauth.user?.webRole == 'admin') {
      router.replace("/");
      return <Loading />;
    }

    return <Component useauth={useauth} {...props} />;
  };
}
