import React from "react";
import {
  Breadcrumbs,
  Button,
  Footer,
  Nav,
  ThemeChanger,
} from "../../src/components";
import { useUserContext } from "../../src/firebase/authContext";
import { useRouter } from "next/router";

import { FaWhatsapp, FaDiscord, FaInstagram } from "react-icons/fa";

import { withProtected } from "../../src/routes";

const Join = () => {
  const router = useRouter();

  const { user, logout, loginWithGoogle } = useUserContext();

  return (
    <>
      <Nav />
      <Breadcrumbs />
      <ThemeChanger />
      <div className="container min-h-screen px-6 py-10 mx-auto">
        <h1 className="text-3xl font-semibold text-center text-gray-800 capitalize lg:text-4xl dark:text-white">
          Welcome to{" "}
          <span
            className="text-green-600"
            title="Geeks for Geeks Student Club of Galgotas College of Engineering & Technology"
          >
            GFGSC-GCET
          </span>{" "}
          Team
        </h1>
        <p className="max-w-2xl mx-auto my-6 text-center text-gray-500 dark:text-gray-300">
          Now you can Join our Community Groups
          <br />
          and Register for our Events
        </p>
        <div className="flex flex-col md:flex-row">

        <div class="w-full max-w-sm m-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            class="object-cover object-center w-full h-56"
            src={user.photoURL}
            alt="avatar"
          />

          <div class="flex items-center px-6 py-3 bg-gray-900 dark:bg-gray-700">
            <h1 class="mx-3 text-lg font-bold text-white">{user.role}</h1>
          </div>

          <div class="px-6 py-4">
            <h1 class="text-xl font-semibold text-gray-800 dark:text-white">
              {user.displayName}
            </h1>

            <p class="py-2 text-gray-700 dark:text-gray-400">{user.bio}</p>

            <div class="flex items-center mt-4 text-gray-700 dark:text-gray-200">
              

              <h1 class="px-2 text-sm capitalize">{user.year} year</h1>
            </div>

            <div class="flex items-center mt-4 text-gray-700 dark:text-gray-200">
            
              <h1 class="px-2 text-sm">{user.branch}</h1>
            </div>

            
          </div>
        </div>

        <div class="grid grid-cols-1 gap-8 mx-4 mt-5 md:mt-0 xl:gap-12 md:grid-cols-2 h-fit">
          <div class="p-6 border rounded-xl border-r-gray-200 dark:border-gray-700">
            <div class="md:flex md:items-start md:-mx-4 ">
              <span class="inline-block p-2 text-green-500 bg-green-100 rounded-xl md:mx-4 dark:text-white dark:bg-green-500">
                <FaWhatsapp className="text-2xl" />
              </span>

              <div class=" mt-4 md:mx-4 md:mt-0">
                <h1 class="text-2xl font-medium text-gray-700 capitalize dark:text-white">
                  Whatsap Group
                </h1>
                <p class="mt-3 text-gray-500 dark:text-gray-300">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Provident ab nulla quod dignissimos vel non corrupti doloribus
                  voluptatum eveniet
                </p>
              </div>
              <Button className="bg-green-700 hover:bg-green-600 mt-4 md:mx-4 md:mt-0">
                Join
              </Button>
            </div>
          </div>

          <div class="p-6 border rounded-xl border-r-gray-200 dark:border-gray-700">
            <div class="md:flex md:items-start md:-mx-4 ">
              <span class="inline-block p-2 text-white bg-indigo-400 rounded-xl md:mx-4 dark:text-white dark:indigo-400">
                <FaDiscord className="text-2xl" />
              </span>

              <div class=" mt-4 md:mx-4 md:mt-0">
                <h1 class="text-2xl font-medium text-gray-700 capitalize dark:text-white">
                  Discord Server
                </h1>
                <p class="mt-3 text-gray-500 dark:text-gray-300">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Provident ab nulla quod dignissimos vel non corrupti doloribus
                  voluptatum eveniet
                </p>
              </div>
              <Button className="bg-green-700 hover:bg-green-600 mt-4 md:mx-4 md:mt-0">
                Join
              </Button>
            </div>
          </div>

          <div class="p-6 border rounded-xl border-r-gray-200 dark:border-gray-700">
            <div class="md:flex md:items-start md:-mx-4 ">
              <span class="inline-block p-2 text-white bg-pink-400 rounded-xl md:mx-4 dark:text-white dark:bg-pink-500">
                <FaInstagram className="text-2xl" />
              </span>

              <div class=" mt-4 md:mx-4 md:mt-0">
                <h1 class="text-2xl font-medium text-gray-700 capitalize dark:text-white">
                  Instagram Page
                </h1>
                <p class="mt-3 text-gray-500 dark:text-gray-300">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Provident ab nulla quod dignissimos vel non corrupti doloribus
                  voluptatum eveniet
                </p>
              </div>
              <Button className="bg-green-700 hover:bg-green-600 mt-4 md:mx-4 md:mt-0">
                Follow
              </Button>
            </div>
          </div>
        </div>

        </div>

      </div>
      <Footer />
    </>
  );
};

export default withProtected(Join);
