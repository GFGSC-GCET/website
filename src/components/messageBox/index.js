import React from "react";

import { FaTimes } from "react-icons/fa";
import { useState } from "react";
const MessageBox = () => {
  const [show, setShow] = useState(true);

  return (
    <>
      {show && (
        <section className="bg-gray-100 dark:bg-transparent lg:py-2 mb-5 lg:flex lg:justify-center">
          <div className="relative bg-gray-100 lg:bg-white dark:bg-gray-800 lg:mx-8 lg:flex lg:max-w-5xl lg:shadow-lg lg:rounded-lg">
            <div className="absolute top-5 right-5 text-xl text-gray-300 dark:text-gray-500 hover:text-red-500 hover:dark:text-red-500 cursor-pointer">
              <FaTimes
                onClick={() => {
                  setShow(!show);
                }}
              />
            </div>
            <div className="hidden lg:block lg:w-1/2 ">
              <div className="flex items-center justify-center h-full lg:rounded-lg overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/welcome.jpg"
                  className="bg-cover object-cover"
                  alt="message"
                />
              </div>
            </div>

            <div className="max-w-xl px-6 py-12 lg:max-w-5xl lg:w-1/2">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white md:text-3xl">
                Welcome to{" "}
                <span className="text-green-700 dark:text-green-600">
                  GFGSC-GCET
                </span>
              </h2>
              <p className="mt-4 text-gray-600 dark:text-gray-400">
                Welcome to our team. We are happy to have you in our team. You
                will grow yourknowledge, peer-to-peer learning and many more
                opportunities. Your journey with us is going to be full of
                learning and interesting accomplishments.
              </p>

              {/* <div className="mt-8">
                        <a href="#" className="px-5 py-2 font-semibold text-gray-100 transition-colors duration-300 transform bg-gray-900 rounded-md hover:bg-gray-700">Start Now</a>
                    </div> */}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default MessageBox;
