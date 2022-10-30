import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Button from "../miscs/button";

const Nav = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/team", label: "Team" },
  ];

  const router = useRouter();
  const url = router.pathname;

  const [hideNavbar, setHideNavbar] = useState(false);

  useEffect(() => {
    let prevScrollpos = window.pageYOffset;
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
              <Link href="/">
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      stroke-linecap="round"
                      strokeLinejoin="round"
                      d="M4 8h16M4 16h16"
                    />
                  </svg>
                )}

                {isOpen && (
                  <svg
                    x-show="isOpen"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      stroke-linecap="round"
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
            className={`absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-gray-100 dark:bg-gray-800 md:bg-transparent md:dark:bg-transparent md:mt-0 md:p-0 md:top-0 md:relative md:bg-transparent md:w-auto md:opacity-100 md:translate-x-0 md:flex md:items-center mt-4 ${
              isOpen ? "opacity-100 " : "opacity-0 hidden"
            }`}
          >
            <div className="flex flex-col md:flex-row md:mx-6">
              {links.map((link, index) => {
                return (
                  <Link href={link.href} key={index}>
                    <a
                      className={`my-2  transition-colors transform 
                      ${
                        link.href == url
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
            </div>

            <div className="flex justify-center md:block">
              <a
                className="relative text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-300"
                href="#"
              >
                <Button
                  click={() => {
                    alert("Wait for Now");
                  }}
                >
                  Login
                </Button>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
