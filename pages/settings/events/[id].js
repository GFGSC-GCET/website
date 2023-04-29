import React from "react";
import { AdminProtected } from "../../../src/routes";

import { useState, useEffect } from "react";

import { useRouter } from "next/router";

import {
  Nav,
  Breadcrumbs,
  Footer,
  ThemeChanger,
  Button,
} from "../../../src/components";

import { getEvent } from "../../../src/firebase/eventData";

import { EventTab } from "../../../src/components/settingTabs";

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
          <div className="col-span-full md:col-span-2">
            <div className="md:m-2 p-2 dark:bg-gray-800 bg-gray-200 rounded-lg">
              <h2 className="text-xl font-semibold text-green-600 mx-auto text-center">
                Registered Members
              </h2>
            </div>
          </div>
          <div className="col-span-full md:col-span-4">
            <EventTab loadEvent={event}/>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminProtected (Event);
