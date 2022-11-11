import React from 'react'
import { withPublic } from '../../src/routes'
import { useState, useEffect } from 'react'

import { useRouter } from 'next/router'

import { Nav, Breadcrumbs, Footer, ThemeChanger, Button } from '../../src/components'

import { getEvent } from '../../src/firebase/eventData'

const Event = () => {

  const router = useRouter()
  const { id } = router.query

  const [event, setEvent] = useState({})



  useEffect(() => {
    const get = async (id) => {
      const event = await getEvent(id)
      setEvent(event)
    }
    get(id)
  }, [])

  return (
    <div>
      <Nav />
      <Breadcrumbs />
      <ThemeChanger />
      <div className="min-h-screen container-md px-6 py-10 mx-auto">
        <div className="border-l-[2px] border-green-500 pl-1">
          <h1 className="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl my-4 dark:text-white">
            {event?.title}
          </h1>

        </div>
        <div className="w-full flex items-center justify-center p-2 bg-gray-800 rounded-xl">
          <img
            className="object-cover object-center w-fit lg:w-auto max-h-96 rounded-lg lg:h-[30rem]"
            // src={event?.image}
            src="http://unsplash.it/2000/2500"
            alt="Event Image"
          />
        </div>
        <p className="max-w-lg mt-4 text-gray-500 dark:text-gray-400">
          {event?.description}
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default Event