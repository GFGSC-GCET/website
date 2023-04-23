import React from "react";
import { withProtected } from "../../src/routes";

import { useState, useEffect, useRef } from "react";

import {
  Breadcrumbs,
  Button,
  Footer,
  Nav,
  ThemeChanger,
} from "../../src/components";

import {
  EventTab,
  ProfileTab,
  TeamTab,
  ManageEventTab,
} from "../../src/components/settingTabs";

import { FaUserEdit, FaCalendar } from "react-icons/fa";
import { RiTeamFill } from "react-icons/ri";
import { MdOutlineEditCalendar } from "react-icons/md";

import { useUserContext } from "../../src/firebase/authContext";

const Settings = () => {
  const { user } = useUserContext();

  const [selectedTab, setSelectedTab] = useState(0);

  const tabs = [
    {
      id: 0,
      tabId: "profile",
      name: "Edit Profile",
      icon: <FaUserEdit />,
      component: <ProfileTab />,
      allowTo: ["member", "admin"],
    },
    {
      id: 1,
      tabId: "team",
      name: "Manage Team",
      icon: <RiTeamFill />,
      component: <TeamTab />,
      allowTo: ["admin"],
    },
    {
      id: 2,
      tabId: "addEvent",
      name: "Add Event",
      icon: <FaCalendar />,
      component: <EventTab />,
      allowTo: ["admin"],
    },
    {
      id: 3,
      tabId: "manageEvent",
      name: "Manage Event",
      icon: <MdOutlineEditCalendar />,
      component: <ManageEventTab />,
      allowTo: ["admin"],
    },
  ];
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    if (isMounted) {
      const hash = window.location.hash;
      const tabId = hash.split("#")[1];
      const tab = tabs.find((tab) => tab.tabId === tabId);
      tab ? setSelectedTab(tab.id) : setSelectedTab(0);
    } else {
      setMounted(true);
    }
  }, [isMounted]);
  return (
    <>
      <Nav />
      <Breadcrumbs />
      <ThemeChanger />
      <div className="min-h-screen">
        <div className="container px-6 py-10 mx-auto">
          <h1 className="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white">
            You are in <br />{" "}
            <span className="text-green-500" title="Settings">
              Settings
            </span>{" "}
            Page
          </h1>
        </div>
        <hr className="container mx-auto pb-5 border-gray-200 dark:border-gray-700 " />
        <div className="container grid grid-cols-1 mx-auto px-6 mt-5 xl:mt-0 xl:gap-5 lg:grid-cols-5 h-fit">
          <div className="col-span-1 w-full h-42 mb-2">
            <div className="z-20 w-full rounded-md ">
              {tabs.map((tab, index) => {
                return (
                  <>
                    {tab.allowTo.includes(user.webRole) && (
                      <a
                        onClick={() => {
                          setSelectedTab(index);
                        }}
                        key={index}
                        className={`flex items-center px-3 py-3 text-lg text-gray-900 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer border-l-[5px] border-transparent ${
                          tab.id == selectedTab
                            ? "border-green-500 dark:bg-gray-800 bg-green-50"
                            : null
                        } `}
                      >
                        <span className="mr-2">{tab.icon}</span>
                        <span className="mx-1">{tab.name}</span>
                      </a>
                    )}
                  </>
                );
              })}
            </div>
            <hr className="my-5 border-gray-200 dark:border-gray-700 " />
          </div>

          <div className="col-span-4 w-full lg:px-10">
            {tabs[selectedTab].allowTo.includes(user.webRole) &&
              tabs[selectedTab].component}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default withProtected(Settings);
