import React from "react";
import { useState, useEffect } from "react";

import {
  Nav,
  Breadcrumbs,
  Footer,
  ThemeChanger,
  Slides,
  Button,
} from "../../src/components";

import Link from "next/link";

import { withPublic } from "../../src/routes";

import { getEventList } from "../../src/firebase/eventData";
import format from 'date-fns/format'

import MiniSearch from "minisearch";
import Head from "next/head";

const Events = () => {
  const [eventList, setEventList] = useState([]);
  const [pastEventList, setPastEventList] = useState([]);
  useEffect(() => {
    const getEvents = async () => {
      const events = await getEventList();
      //if event.when is in the future, add to upcomingEventList
      //if event.when is in the past, add to pastEventList
      const pastEvents = [];
      for (const [key, value] of Object.entries(events)) {
        const date = new Date(value.when);
        if (date < Date.now()) {
          pastEvents.push(value);
        }
      }
      setPastEventList(pastEvents);
      const sortedByDate = pastEvents.sort(
        (a, b) => new Date(b.when) - new Date(a.when)
      );
      setEventList(sortedByDate);
    };
    getEvents();
  }, []);
  
  const [searchBar, setSearchBar] = useState("");

    let miniSearch = new MiniSearch({
    fields: ['category','description','image','link','title','when','where','id'], // fields to index for full-text search
    storeFields: ['category','description','image','link','title','when','where','id'], // fields to return with search results
    searchOptions: {
      boost: { title: 2 },
      fuzzy: 0.2,
      prefix: true
    },
  });


  useEffect(() => {
    if (searchBar == ''){
      const sortedByDate = pastEventList.sort(
        (a, b) => new Date(b.when) - new Date(a.when)
      );
      setEventList(sortedByDate);
    }else{
      miniSearch.addAll(pastEventList);
      let filteredEvents = miniSearch.search(searchBar)
      const sortedByDate =  filteredEvents.sort((a, b) => new Date(b.when) - new Date(a.when));
      setEventList(sortedByDate);
    }
  }, [searchBar]);


  return (
    <>
      <Head>
        <title>Events</title>
        <meta name="description" content="Event Page for GFGSC_GCET" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <Breadcrumbs />
      <ThemeChanger />
      <div className="min-h-screen container px-6 py-10 mx-auto">
        <h1 className="px-6 text-3xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white">
          <span
            className="text-green-500"
            title="Geeks for Geeks Student Club of Galgotas College of Engineering & Technology"
          >
            Upcoming
          </span>{" "}
          Events
        </h1>

        {/* Slides Component with Upcoming Events */}
        <Slides />

        <hr className="my-8 border-gray-200 dark:border-gray-700" />

        {/* Past Events */}

        <div className="flex justify-between flex-col px-6">
          <h1 className="py-6 text-3xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white">
            <span
              className="text-green-500"
              title="Geeks for Geeks Student Club of Galgotas College of Engineering & Technology"
            >
              Past
            </span>
            &nbsp;Events
          </h1>

          <input
            type="text"
            className="w-full py-3 pl-10 pr-4 text-gray-700 bg-gray-100 border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none"
            placeholder="Search Events, Topics...."
            value={searchBar}
            onChange={(e) => {
              setSearchBar(e.target.value);
            }}
          />
        </div>

        <div className="container px-6 py-10 mx-auto">

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {
            eventList.map((event,index) => {
              return (
                  <div key={index}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className="object-cover object-center w-full h-64 rounded-lg lg:h-80"
                      src={event?.image}
                      alt="Event Image"
                    />

                    <div className="mt-8">
                      <span className="text-green-500 uppercase">{event?.category}</span>

                      <h1 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white">
                        {event?.title}
                      </h1>

                      <p className="mt-2 text-gray-500 dark:text-gray-400 truncate">
                        {event?.description}
                      </p>

                      <div className="flex items-center justify-between mt-4">
                        <div>
                          <a
                            href="#"
                            className="text-lg font-medium text-gray-700 dark:text-gray-300 hover:underline hover:text-gray-500"
                          >
                            {event?.where || "Date"}
                          </a>

                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {format(new Date(event?.when), 'MMMM dd, yyyy')}
                          </p>
                        </div>
                        <Button click={()=>{window.open(`/events/${event?.id}`,'__blank')}} className="inline-block text-green-500 bg-green-700 hover:bg-green-600">
                          Know More
                        </Button>
                      </div>
                    </div>
                  </div>
              )
            })
          }
          </div>

        </div>
        
      </div>
      <Footer />
    </>
  );
};

export default withPublic(Events);
