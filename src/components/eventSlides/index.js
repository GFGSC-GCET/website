import React from "react";
import Button from "../miscs/button";
import { useState } from 'react'

const Slides = () => {

  const [current, setCurrent] = useState(0);

  
  const Events = [
    {
      name: "Guide to Hacktober",
      date: "22 Oct",
      about:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore quibusdam ducimus libero ad tempora dolo Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore quibusdam ducimus libero ad tempora dolo Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore quibusdam ducimus libero ad tempora dolo",
      tldr: "Want to know about Hacktoberfest? Join us for a free session",
    },
    {
      name: "Guide to WebDev",
      date: "25 Oct",
      about:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore quibusdam ducimus libero ad tempora dolo Lorem ipsum dolo elit. Tempore quibusdam ducimus libero ad tempora dolo Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore quibusdam ducimus libero ad tempora dolo",
      tldr: "Wanna make some cool websites and webapps then join",
    },
    {
      name: "Creating LinkedIn profile",
      date: "29 Oct",
      about:
        "Lorem ipsum dolor sit amet,  quibusdam ducimus libero ad tempora dolo Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore quibusdam ducimus libero ad tempora dolo Lorem ipsum dolor sit amet, consectetue quibusdam ducimus libero ad tempora dolo",
      tldr: "Join the free session to know some LinkedIn Tricks",
    },
  ];

  const increment = () => {
    setCurrent(current == Events.length-1 ? 0 : current + 1);
  };

  const decrement = () => {
    setCurrent(current == 0 ? Events.length-1 : current - 1);
  };



  return (
    <section className="bg-white dark:bg-gray-900 mx-auto">
      <div className="container px-6 py-10 mx-auto">
        <div className="lg:-mx-6 lg:flex lg:items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="object-cover object-center lg:w-1/2 lg:mx-6 w-full h-96 rounded-lg lg:h-[36rem]"
            src={`http://unsplash.it/1080/1080?random=${current}`}
            alt=""
          />

          <div className="mt-8 lg:w-1/2 lg:px-6 lg:mt-0">
            <p className="text-5xl font-semibold text-green-600 ">{Events[current].date}</p>

            <h1 className="text-2xl font-semibold text-gray-800 dark:text-white xl:text-4xl lg:w-96">
              {Events[current].name}
            </h1>

            <p className="max-w-lg mt-6 text-gray-500 dark:text-gray-400 ">
              {Events[current].about}
            </p>

            <h3 className="mt-6 text-lg font-medium text-green-600">TL;DR</h3>
            <p className="text-gray-600 dark:text-gray-300 italic">
              {Events[current].tldr}
            </p>

            <Button className="mt-5">Register Now</Button>

            <div className="flex items-center justify-between mt-12 lg:justify-start">
              <button className="p-2 text-gray-800 transition-colors duration-300 border rounded-full rtl:-scale-x-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 hover:bg-gray-100"
              onClick={decrement}>
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
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button className="p-2 text-gray-800 transition-colors duration-300 border rounded-full rtl:-scale-x-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 lg:mx-6 hover:bg-gray-100"
              onClick={increment}>
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Slides;
