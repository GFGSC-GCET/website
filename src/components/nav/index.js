import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Button from "../miscs/button";

import { useUserContext } from "../../firebase/authContext";

import UserDropdown from "./userDropdown";
import settings from "../../../pages/settings";

const Nav = (props) => {
  const { user, loginWithGoogle, logout, loggingIn } = useUserContext();

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/team", label: "Team" },
    { href: "/events", label: "Events" },
  ];

  const router = useRouter();
  const url = router.pathname;

  const [hideNavbar, setHideNavbar] = useState(false);

  useEffect(() => {
    setHideNavbar(false);
  }, [url]);

  useEffect(() => {
    let prevScrollpos = window.pageYOffset;
    setTimeout(function () {
      window.onscroll = () => {
        let currentScrollPos = window.pageYOffset;

        if (prevScrollpos > currentScrollPos) {
          setIsOpen(false);
          setHideNavbar(false);
        } else {
          setHideNavbar(true);
        }
        prevScrollpos = currentScrollPos;
      };
    }, 500);
    setHideNavbar(false);
  }, []);

  return (
    <>
      <nav
        className={`bg-gray-100 shadow dark:bg-gray-800  w-full transition duration-300 sticky z-[1000]
${hideNavbar ? " translate-y-[-100px] " : "top-0 translate-y-0  "}`}
      >
        <div className="container px-6 py-4 mx-auto md:flex md:justify-between md:items-center">
          <div className="flex items-center justify-between">
            <div>
              <Link legacyBehavior href="/">
                <a className="text-2xl font-bold text-green-700 transition-colors duration-300 transform dark:text-green-600 lg:text-3xl hover:text-green-600 dark:hover:text-gray-300">
                  GFGSC-GCET
                </a>
              </Link>
            </div>

            {/* <!-- Mobile menu button --> */}
            <div className="flex md:hidden">
              <button
                onClick={() => {
                  toggle();
                }}
                type="button"
                className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                aria-label="toggle menu"
              >
                {!isOpen && (
                  <>
                    {user == null ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-9 h-9"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 8h16M4 16h16"
                        />
                      </svg>
                    ) : (
                      <img
                        className="flex-shrink-0 object-cover mx-1 rounded-full w-9 h-9 outline outline-offset-2 outline-green-600"
                        src={user.photoURL}
                        alt="jane avatar"
                      />
                    )}
                  </>
                )}

                {isOpen && (
                  <svg
                    x-show="isOpen"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-9 h-9"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* <!-- Mobile Menu open: "block", Menu closed: "hidden" --> */}
          <div
            className={`absolute inset-x-0 z-20 w-full px-6 py-4 bg-gray-100 dark:bg-gray-800 md:bg-transparent md:dark:bg-transparent md:mt-0 md:p-0 md:top-0 md:relative md:bg-transparent md:w-auto md:opacity-100 md:translate-x-0 md:flex md:items-center mt-4 ${
              isOpen ? "opacity-100 " : "opacity-0 hidden"
            }`}
          >
            <div className="flex flex-col md:flex-row md:mx-6 justify-center items-center">
              {links.map((link, index) => {
                return (
                  <Link legacyBehavior href={link.href} key={index}>
                    <a
                      className={`my-2  transition-colors transform 
                      ${
                        url == link.href
                          ? "text-green-700 dark:text-green-600"
                          : "text-gray-700 dark:text-gray-200"
                      }  
                      hover:text-green-700 dark:hover:text-green-600 text-lg font-medium md:mx-4 md:my-0`}
                      onClick={() => {
                        router.push(link.href);
                      }}
                    >
                      {link.label}
                    </a>
                  </Link>
                );
              })}
              {user != null && (
                <Link legacyBehavior href="/settings">
                  <a
                    className={`my-2 md:hidden transition-colors transform hover:text-green-700
                    ${
                      url == settings
                        ? "text-green-700 dark:text-green-600"
                        : "text-gray-700 dark:text-gray-200"
                    }  
                    dark:hover:text-green-600 text-lg font-medium md:mx-4 md:my-0`}
                  >
                    Settings
                  </a>
                </Link>
              )}
            </div>

            <div className="flex justify-center items-center">
              {
                user == null ? (
                  <a
                    className="relative text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-300"
                    href="#"
                  >
                    <Button
                      className="flex flex-row items-center justify-between  bg-green-700 hover:bg-green-600"
                      click={() => {
                        loginWithGoogle();
                      }}
                    >
                      Sign in
                      {loggingIn && (
                        <svg
                          className="animate-spin -mr-1 ml-3 h-5 w-5 text-white"
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
                    </Button>
                  </a>
                ) : (
                  <UserDropdown isNavClose={hideNavbar} />
                )
                // <a
                //   className="relative text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-300"
                //   href="#"
                // >
                //   <Button
                //     click={() => {logout();}}
                //   >
                //     Log Out
                //   </Button>
                // </a>
              }
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
