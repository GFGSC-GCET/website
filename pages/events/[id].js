import React from "react";
import { withPublic } from "../../src/routes";
import { useState, useEffect } from "react";

import { useRouter } from "next/router";

import {
  Nav,
  Breadcrumbs,
  Footer,
  ThemeChanger,
  Button,
} from "../../src/components";

import { getEvent } from "../../src/firebase/eventData";

import format from "date-fns/format";

const Event = () => {
  const router = useRouter();
  const { id } = router.query;

  const [event, setEvent] = useState({});

  useEffect(() => {
    const get = async (id) => {
      const event = await getEvent(id);
      setEvent(event);
      console.log(event);
    };
    get(id);
  }, []);

  return (
    <div>
      <Nav />
      <Breadcrumbs />
      <ThemeChanger />
      <div className="min-h-screen container-md px-6 py-10 mx-auto">
        <div className="grid grid-cols-6 gap-4">
          <div className="col-span-full md:col-span-1">
            <div className="md:m-2 p-2 dark:bg-gray-800 bg-gray-200 rounded-lg">
              <h1 className="text-2xl font-bold text-center">Event Details</h1>
              <h2 className="text-xl font-semibold text-green-600 mx-auto text-center">
                {event.when && format(new Date(event.when), "eeee, dd MMM")}
              </h2>
              <span className="m-1 flex flex-wrap justify-center items-center text-sm bg-gray-300 dark:bg-gray-700 rounded-lg px-3  py-0.5  leading-loose dark:text-gray-300 mx-auto">
                {event.category}
              </span>
              <Button
                className="bg-green-600 w-full hover:bg-green-700"
                click={() => {
                  alert("currently in development");
                }}
              >
                Register Now
              </Button>
            </div>
          </div>
          <div className="col-span-full md:col-span-4">
            <div className="border-l-[2px] border-green-500 pl-1">
              <h1 className="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl my-4 dark:text-white">
                {event?.title}
              </h1>
            </div>
            <div className="w-full flex items-center justify-center p-2 dark:bg-gray-800 bg-gray-200 rounded-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="object-cover object-center w-fit lg:w-auto max-h-96 rounded-lg lg:h-[30rem]"
                src={event?.image}
                alt="Event Image"
              />
            </div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              {event?.description}
            </p>
          </div>
        </div>

        <div className="col-span-full md:col-span-1"></div>
      </div>
      <Footer />
    </div>
  );
};

export default Event;
