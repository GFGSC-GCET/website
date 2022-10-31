import React, { useEffect, useState } from "react";
import { useUserContext } from "./firebase/authContext";
import { Loading } from "./components";
import { useRouter } from "next/router";

export function withPublic(Component) {
  return function WithPublic(props) {
    const useauth = useUserContext();
    useauth.checkAccount(useauth.user);
    return <Component useauth={useauth} {...props} />;
  };
}

export function withProtected(Component) {
  return function WithProtected(props) {
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

    if (!useauth.user?.admin) {
      router.replace("/");
      return <Loading />;
    }

    return <Component useauth={useauth} {...props} />;
  };
}
