import React from "react";
import Button from "../miscs/button";
import { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";

import { getEventList } from "../../firebase/eventData";
import format from "date-fns/format";

const Slides = () => {
  const [current, setCurrent] = useState(0);
  const [Events, setUpcomingEventList] = useState([]);
  useEffect(() => {
    const getEvents = async () => {
      const events = await getEventList();
      //if event.when is in the future, add to upcomingEventList
      //if event.when is in the past, add to pastEventList
      const upcomingEvents = [];
      const pastEvents = [];
      for (const [key, value] of Object.entries(events)) {
        const date = new Date(value.when);
        if (date > Date.now()) {
          upcomingEvents.push(value);
        } else {
          pastEvents.push(value);
        }
      }
      if (upcomingEvents.length == 0){
        setUpcomingEventList(pastEvents);
      }else{
        setUpcomingEventList(upcomingEvents);
      }
      // console.log(events, upcomingEvents, pastEvents);
    };
    getEvents();
  }, []);

  // const Events = [
  //   {
  //     name: "Guide to Hacktober",
  //     date: "22 Oct",
  //     about:
  //       "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore quibusdam ducimus libero ad tempora dolo Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore quibusdam ducimus libero ad tempora dolo Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore quibusdam ducimus libero ad tempora dolo",
  //     tldr: "Want to know about Hacktoberfest? Join us for a free session",
  //   }
  // ];

  const increment = () => {
    // access the current state value
    setCurrent((oldCount) => {
      if (oldCount < Events.length - 1) {
        return oldCount + 1;
      }
      return 0;
    });
  };

  const decrement = () => {
    setCurrent(current == 0 ? Events.length - 1 : current - 1);
  };

  useEffect(() => {
    if(Events.length > 0){
      const interval = setInterval(() => {
        increment();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [Events]);

  const config = {
    delta: 10, // min distance(px) before a swipe starts. *See Notes*
    preventDefaultTouchmoveEvent: false, // call e.preventDefault *See Details*
    trackTouch: true, // track touch input
    trackMouse: false, // track mouse input
    rotationAngle: 0, // set a rotation angle
  };
  const handlers = useSwipeable({
    onSwiped: (eventData) => {
      if (eventData.dir === "Left") {
        if (current < Events.length - 1) {
          setCurrent(current + 1);
        } else {
          setCurrent(0);
        }
      }
      if (eventData.dir === "Right") {
        if (current > 0) {
          setCurrent(current - 1);
        } else {
          setCurrent(Events.length - 1);
        }
      }
    },
    ...config,
  });

  return (
    <section className="bg-white dark:bg-gray-900 mx-auto" {...handlers}>
      <div className="container px-6 py-10 mx-auto">
        <div className="lg:-mx-6 lg:flex lg:items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="object-cover object-center lg:w-1/2 lg:mx-6 w-full h-96 rounded-lg lg:h-[25rem]"
            src={Events[current]?.image}
            alt="Event Image"
          />

          <div className="mt-8 lg:w-1/2 lg:px-6 lg:mt-0">
            <h3 className="mt-2 text-lg font-medium text-green-600">
              {Events[current]?.category}
            </h3>
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-white xl:text-4xl">
              {Events[current]?.title}
            </h1>
            <p className="text-lg font-semibold uppercase text-green-600 ">
              {
                //format date
                Events[current] &&
                  format(new Date(Events[current].when), "eeee, dd MMM")
              }
            </p>

            <p className="max-w-lg mt-4 text-gray-500 dark:text-gray-400 truncate">
              {Events[current]?.description}
            </p>

            {Events[current]?.where && (
              <>
                <h3 className="mt-6 text-lg font-medium text-green-600">
                  Location
                </h3>
                <p className="text-gray-600 dark:text-gray-300 italic">
                  {Events[current]?.where}
                </p>
              </>
            )}
            <Button
              click={() => {
                window.open(`/events/${Events[current].id}`, "__blank");
              }}
              className="mt-5 bg-green-700 hover:bg-green-600"
            >
              Know More
            </Button>

            {Events.length > 1 && (
              <div className="flex items-center justify-between mt-10 lg:justify-start">
                <button
                  className="p-2 text-gray-800 transition-colors duration-300 border rounded-full rtl:-scale-x-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 hover:bg-gray-100"
                  onClick={decrement}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                <button
                  className="p-2 text-gray-800 transition-colors duration-300 border rounded-full rtl:-scale-x-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 lg:mx-6 hover:bg-gray-100"
                  onClick={increment}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Slides;
