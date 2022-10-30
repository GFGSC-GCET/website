import React from 'react'
import { useState } from 'react'

import {Nav, Breadcrumbs, Footer, ThemeChanger, Slides, Button} from '../../src/components'


const Events = () => {

  const [searchBar, setSearchBar] = useState('');

  return (
    <>
      <Nav />
      <Breadcrumbs />
      <ThemeChanger />
      <div className="min-h-screen container px-6 py-10 mx-auto">
        <h1 class="px-6 text-3xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white">
          <span
            class="text-green-500"
            title="Geeks for Geeks Student Club of Galgotas College of Engineering & Technology"
          >
            Upcoming
          </span>{" "}
          Events
        </h1>

        {/* Slides Component with Upcoming Events */}
        <Slides />

        <hr class="my-8 border-gray-200 dark:border-gray-700" />

        {/* Past Events */}

        <div className="flex justify-between flex-col px-6">
          <h1 class="py-6 text-3xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white">
            <span
              class="text-green-500"
              title="Geeks for Geeks Student Club of Galgotas College of Engineering & Technology"
            >
              Past
            </span>&nbsp;Events
          </h1>

          <input
            type="text"
            class="w-full py-3 pl-10 pr-4 text-gray-700 bg-gray-100 border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
            placeholder="Search Events, Topics...."
            value = {searchBar}
            onChange = {(e)=>{setSearchBar(e.target.value)}}
          />
        </div>

        <div class="container px-6 py-10 mx-auto">
          <div class="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            <div>
              <img
                class="object-cover object-center w-full h-64 rounded-lg lg:h-80"
                src="https://images.unsplash.com/photo-1624996379697-f01d168b1a52?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                alt=""
              />

              <div class="mt-8">
                <span class="text-green-500 uppercase">Coding</span>

                <h1 class="mt-4 text-xl font-semibold text-gray-800 dark:text-white">
                  What do you want to know about UI
                </h1>

                <p class="mt-2 text-gray-500 dark:text-gray-400">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam
                  est asperiores vel, ab animi recusandae nulla veritatis id
                  tempore sapiente
                </p>

                <div class="flex items-center justify-between mt-4">
                  <div>
                    <a
                      href="#"
                      class="text-lg font-medium text-gray-700 dark:text-gray-300 hover:underline hover:text-gray-500"
                    >
                      John snow
                    </a>

                    <p class="text-sm text-gray-500 dark:text-gray-400">
                      February 1, 2022
                    </p>
                  </div>
                  <Button class="inline-block text-green-500 underline hover:text-green-400">Know More</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Events