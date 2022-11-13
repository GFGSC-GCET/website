import React from "react";
import {
  Breadcrumbs,
  Button,
  Footer,
  Nav,
  ThemeChanger,
} from "../../src/components";
import { useEffect } from "react";
import { useUserContext } from "../../src/firebase/authContext";
import { useRouter } from "next/router";

import { BiError } from "react-icons/bi";

const GoogleLogin = () => {
  const { loginWithGoogle, loggingIn, error } = useUserContext();

  return (
    <>
      <div className="w-full max-w-xs m-5">
        <button
          href="#"
          className="flex items-center justify-center w-full text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
          onClick={() => {
            loginWithGoogle();
          }}
        >
          <div className="px-4 py-2">
            <svg className="w-6 h-6" viewBox="0 0 40 40">
              <path
                d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                fill="#FFC107"
              />
              <path
                d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                fill="#FF3D00"
              />
              <path
                d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                fill="#4CAF50"
              />
              <path
                d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                fill="#1976D2"
              />
            </svg>
          </div>

          <span className="w-5/6 px-4 py-3 font-bold text-center">
            Sign in with Google
          </span>

          {loggingIn && (
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
        </button>
      </div>

      {error != "" && (
        <div className="flex w-full max-w-xs overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 m-5">
          <div className="flex items-center justify-center w-12 bg-red-500">
            <div className="w-6 h-6 text-2xl text-white">
              <BiError />
            </div>
          </div>

          <div className="px-4 py-2 -mx-3">
            <div className="mx-3">
              <span className="font-semibold text-red-500 dark:text-red-400">
                Error
              </span>
              <p className="text-sm text-gray-600 dark:text-gray-200">
                {error}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const Join = () => {
  const router = useRouter();

  const { member } = useUserContext();

  const getMember = async () => {
    const memberRes = await member.get(user);
    memberRes?.regComplete ? router.push("/") : null;
  };

  useEffect(() => {
    getMember();
  }, []);

  const { user, logout, loginWithGoogle } = useUserContext();

  return (
    <>
      <Nav />
      <Breadcrumbs />
      <ThemeChanger />
      <div className="container min-h-screen px-6 py-10 mx-auto">
        <h1 className="text-3xl font-semibold text-center text-gray-800 capitalize lg:text-4xl dark:text-white">
          Join{" "}
          <span
            className="text-green-600"
            title="Geeks for Geeks Student Club of Galgotas College of Engineering & Technology"
          >
            GFGSC-GCET
          </span>{" "}
          Team
        </h1>
        <p className="max-w-2xl mx-auto my-6 text-center text-gray-500 dark:text-gray-300">
          Join GFGSC-GCET team as a member to explore <br />new opportunities, technical events, webinars and mentorship.<br /><br/>
          Use your Google Account to continue registration
          <br />
          which is free of cost
        </p>
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col justify-center items-center w-full max-w-xl m-auto m-5 p-2 border-2 dark:border-gray-800  border-gray-100 rounded-lg">
            {user == null ? (
              <GoogleLogin />
            ) : (
              <>
                <div className="w-full max-w-xs overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 m-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="object-cover w-full h-56"
                    src={user.photoURL}
                    alt="avatar"
                  />

                  <div className="py-5 text-center">
                    <a
                      href="#"
                      className="block text-2xl font-bold text-gray-800 dark:text-white"
                      tabindex="0"
                      role="link"
                    >
                      {user.displayName}
                    </a>
                    <span className="text-sm text-gray-700 dark:text-gray-200">
                      {user.email}
                    </span>
                  </div>
                </div>
                <p className="text-sm font-light text-center text-gray-400 m-3">
                  {" "}
                  This is not me.{" "}
                  <button
                    href="#"
                    className="font-medium text-gray-700 dark:text-gray-200 hover:underline"
                    onClick={() => {
                      logout();
                      loginWithGoogle();
                    }}
                  >
                    Change Account
                  </button>
                </p>
                <Button
                  className={"bg-red-600 hover:bg-red-500 text-xs my-2"}
                  click={() => {
                    logout();
                  }}
                >
                  Logout
                </Button>
              </>
            )}
          </div>
          {user != null && (
            <>
              <Button
                className="bg-green-700 hover:bg-green-600"
                click={() => {
                  router.push("/join/complete");
                }}
              >
                {" "}
                Register Me{" "}
              </Button>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Join;
