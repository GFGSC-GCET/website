import React from "react";
import { Footer, Nav, ThemeChanger, Breadcrumbs } from "../src/components";

//icons
import { MdEvent } from "react-icons/md";
import { FaCode } from "react-icons/fa";


import { withPublic } from '../src/routes'

const About = () => {

  const aboutData = [
    {
      
    }
  ]
  return (
    <>
      <Nav />
      <Breadcrumbs />
      <ThemeChanger />
      <section class="bg-white dark:bg-gray-900">
        <div class="container px-6 py-10 mx-auto">
          <h1 class="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white">
            know more <br /> about{" "}
            <span
              class="text-green-500"
              title="Geeks for Geeks Student Club of Galgotas College of Engineering & Technology"
            >
              GFGSC-GCET
            </span>
          </h1>

          <iframe
            title="intro video"
            class="min-w-full mt-12 h-64 md:h-[450px] rounded-xl overflow-hidden"
            src="https://www.youtube.com/embed/yrEIbh-VKwo"
            frameborder="0"
            allow="autoplay; fullscreen"
            allowfullscreen=""
          ></iframe>

          <div class="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 md:grid-cols-2">
            <div class="p-6 border rounded-xl border-r-gray-200 dark:border-gray-700">
              <div class="md:flex md:items-start md:-mx-4">
                <span class="inline-block p-2 text-green-500 bg-green-100 rounded-xl md:mx-4 dark:text-white dark:bg-green-500">
                  <div className="flex items-center justify-center w-6 h-6">
                    <MdEvent className="text-2xl" />
                  </div>
                </span>

                <div class="mt-4 md:mx-4 md:mt-0">
                  <h1 class="text-2xl font-medium text-gray-700 capitalize dark:text-white">
                    We Organize Cool Events
                  </h1>

                  <p class="mt-3 text-gray-500 dark:text-gray-300">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Provident ab nulla quod dignissimos vel non corrupti
                    doloribus voluptatum eveniet
                  </p>
                </div>
              </div>
            </div>

            <div class="p-6 border rounded-xl border-r-gray-200 dark:border-gray-700">
              <div class="md:flex md:items-start md:-mx-4">
                <span class="inline-block p-2 text-green-500 bg-green-100 rounded-xl md:mx-4 dark:text-white dark:bg-green-500">
                  <div className="flex items-center justify-center w-6 h-6">
                    <FaCode className="text-2xl" />
                  </div>
                </span>

                <div class="mt-4 md:mx-4 md:mt-0">
                  <h1 class="text-2xl font-medium text-gray-700 capitalize dark:text-white">
                    we promote coding culture
                  </h1>

                  <p class="mt-3 text-gray-500 dark:text-gray-300">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Provident ab nulla quod dignissimos vel non corrupti
                    doloribus voluptatum eveniet
                  </p>
                </div>
              </div>
            </div>

            <div class="p-6 border rounded-xl border-r-gray-200 dark:border-gray-700">
              <div class="md:flex md:items-start md:-mx-4">
                <span class="inline-block p-2 text-green-500 bg-green-100 rounded-xl md:mx-4 dark:text-white dark:bg-green-500">
                  <div className="flex items-center justify-center w-6 h-6">
                    1
                  </div>
                </span>

                <div class="mt-4 md:mx-4 md:mt-0">
                  <h1 class="text-2xl font-medium text-gray-700 capitalize dark:text-white">
                    Another Point
                  </h1>

                  <p class="mt-3 text-gray-500 dark:text-gray-300">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Provident ab nulla quod dignissimos vel non corrupti
                    doloribus voluptatum eveniet
                  </p>
                </div>
              </div>
            </div>

            <div class="p-6 border rounded-xl border-r-gray-200 dark:border-gray-700">
              <div class="md:flex md:items-start md:-mx-4">
                <span class="inline-block p-2 text-green-500 bg-green-100 rounded-xl md:mx-4 dark:text-white dark:bg-green-500">
                  <div className="flex items-center justify-center w-6 h-6">
                    2
                  </div>
                </span>

                <div class="mt-4 md:mx-4 md:mt-0">
                  <h1 class="text-2xl font-medium text-gray-700 capitalize dark:text-white">
                    And one more Point
                  </h1>

                  <p class="mt-3 text-gray-500 dark:text-gray-300">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Provident ab nulla quod dignissimos vel non corrupti
                    doloribus voluptatum eveniet
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default withPublic(About);
