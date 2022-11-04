import React from "react";
import {
  Breadcrumbs,
  Button,
  Footer,
  Nav,
  ThemeChanger,
  MessageBox
} from "../src/components";
import { useUserContext } from "../src/firebase/authContext";
import { useRouter } from "next/router";

import { FaWhatsapp, FaDiscord, FaInstagram, FaHammer, FaTimes } from "react-icons/fa";
import { GiGraduateCap, GiBrain } from "react-icons/gi";
import { TbBooks } from "react-icons/tb";
import { FiCalendar } from "react-icons/fi";

import GitHubCalendar from "react-github-calendar";

import { withProtected } from "../src/routes";

const Tags = (props) => {
  const tags = props.tags
    .split(",")
    .map((tag) => tag.trim())
    .filter((tag) => tag !== "");
    return (
      <>
      <div class="mt-1 h-fit flex flex-wrap -m-1">

      {
        tags.map((tag, index) => {
          return (
          <span
            key={index}
            className="m-1 flex flex-wrap justify-between items-center text-xs sm:text-sm bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded px-4 py-2 font-bold leading-loose cursor-pointer dark:text-gray-300"
          >
            {tag}
          </span>
          );
        })
      }
      </div>
      </>
    );
};

const Join = () => {
  const router = useRouter();

  const { user, logout, loginWithGoogle } = useUserContext();

  return (
    <>
      <Nav />
      <Breadcrumbs />
      <ThemeChanger />
      <div className="container min-h-screen px-6 py-1 mx-auto">

        <MessageBox/>
        <div className="flex flex-col xl:flex-row">

          <div class="w-full max-w-sm m-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              class="object-cover object-center w-full h-56"
              src={user.photoURL}
              alt="avatar"
            />

            <div class="flex items-center px-6 py-3 bg-gray-900 dark:bg-gray-700">
              <h1 class="text-lg font-bold text-white">{user.role}</h1>
            </div>

            <div class="px-6 py-4">
              <h1 class="text-xl font-semibold text-gray-800 dark:text-white">
                {user.displayName}
              </h1>

              <p class="py-2 text-gray-700 dark:text-gray-400">{user.bio}</p>

              <div class="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                <GiGraduateCap className="text-xl" />
                <h1 class="px-2 text-sm capitalize">{user.year} year</h1>
              </div>

              <div class="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                <TbBooks className="text-xl" />
                <h1 class="px-2 text-sm">{user.batch}</h1>
              </div>

              <div class="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                <FaHammer className="text-xl" />
                <h1 class="px-2 text-sm">Skills</h1>
              </div>
              <Tags tags={user.skills} />

              <div class="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                <GiBrain className="text-xl" />
                <h1 class="px-2 text-sm">Learning</h1>
              </div>
              <Tags tags={user.learning} />
            </div>
          </div>

          <div className='flex flex-col'>
            <div class="grid grid-cols-1 gap-5 mx-5 mt-5 xl:mt-0 xl:gap-5 lg:grid-cols-2 h-fit">
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
                      Provident ab nulla quod dignissimos vel non corrupti
                      doloribus voluptatum eveniet
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
                      Provident ab nulla quod dignissimos vel non corrupti
                      doloribus voluptatum eveniet
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
                      Provident ab nulla quod dignissimos vel non corrupti
                      doloribus voluptatum eveniet
                    </p>
                  </div>
                  <Button className="bg-green-700 hover:bg-green-600 mt-4 md:mx-4 md:mt-0">
                    Follow
                  </Button>
                </div>
              </div>
              
              <div class="p-6 border rounded-xl border-r-gray-200 dark:border-gray-700">
                <div class="md:flex md:items-start md:-mx-4 ">
                  <span class="inline-block p-2 text-white bg-purple-400 rounded-xl md:mx-4 dark:text-white dark:bg-purple-500">
                    <FiCalendar className="text-2xl" />
                  </span>

                  <div class=" mt-4 md:mx-4 md:mt-0">
                    <h1 class="text-2xl font-medium text-gray-700 capitalize dark:text-white">
                      Our Events
                    </h1>
                    <p class="mt-3 text-gray-500 dark:text-gray-300">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Provident ab nulla quod dignissimos vel non corrupti
                      doloribus voluptatum eveniet
                    </p>
                  </div>
                  <Button className="bg-green-700 hover:bg-green-600 mt-4 md:mx-4 md:mt-0">
                    View
                  </Button>
                </div>
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
