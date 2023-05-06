import React from "react";
import {
  Breadcrumbs,
  Button,
  Footer,
  Nav,
  ThemeChanger,
  MessageBox,
  SocialPanel
} from "../../src/components";
import { useState, useEffect } from "react";
import { useUserContext } from "../../src/firebase/authContext";
import { useRouter } from "next/router";

import {
  FaWhatsapp,
  FaDiscord,
  FaInstagram,
  FaHammer,
  FaTimes,
} from "react-icons/fa";
import { GiGraduateCap, GiBrain } from "react-icons/gi";
import { TbBooks } from "react-icons/tb";
import { FiCalendar } from "react-icons/fi";
import { SiGeeksforgeeks } from "react-icons/si";

import { withProtected } from "../../src/routes";

import { teamDatabase } from "../../src/firebase/fetchData";

const Tags = (props) => {
  const tags = props.tags
    .split(",")
    .map((tag) => tag.trim())
    .filter((tag) => tag !== "");
  return (
    <>
      <div className="mt-1 h-fit flex flex-wrap -m-1">
        {tags.map((tag, index) => {
          return (
            <span
              key={index}
              className="m-1 flex flex-wrap justify-between items-center text-xs sm:text-sm bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded px-4 py-2 font-bold leading-loose cursor-pointer dark:text-gray-300"
            >
              {tag}
            </span>
          );
        })}
      </div>
    </>
  );
};

const Join = () => {
  const router = useRouter();

  const { username } = router.query;

  const [authorData, setUserData] = useState({});

  useEffect(() => {
    const getTeam = async () => {
      const teamData = await teamDatabase.get();
      //remove all data where regComplete is false
      const teamArray = teamData.filter(
        (team) => team.gfg.split("/")[4] === username
      );
      console.log(teamArray[0]);
      setUserData(teamArray[0]);
    };
    getTeam();
  }, [username]);

  return (
    <>
      <Nav />
      <Breadcrumbs />
      <ThemeChanger />
      <div className="container min-h-screen px-6 py-1 mx-auto">
        <div className="container grid grid-cols-1 mx-auto px-6 mt-5 xl:mt-0 xl:gap-5 space-y-5 md:space-y-auto lg:grid-cols-5 h-fit">
          <div className="col-span-1 w-full max-w-sm m-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="object-cover object-center w-full h-56"
              src={authorData.photoURL}
              alt="avatar"
            />

            <div className="flex items-center px-6 py-3 bg-gray-900 dark:bg-gray-700">
              <h1 className="text-lg font-bold text-white">{authorData.role}</h1>
            </div>

            <div className="px-6 py-4">
              <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
                {authorData.displayName}
              </h1>

              <p className="py-2 text-gray-700 dark:text-gray-400 mb-2">
                {authorData.bio}
              </p>

              <SocialPanel
                github={authorData.github}
                linkedin={authorData.linkedin}
                portfolio={authorData.website}
                instagram={authorData.instagram}
                gfg={authorData.gfg}
              />

              <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                <GiGraduateCap className="text-xl" />
                <h1 className="px-2 text-sm capitalize">
                  {authorData.year} year
                </h1>
              </div>

              <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                <TbBooks className="text-xl" />
                <h1 className="px-2 text-sm">{authorData.batch}</h1>
              </div>

              <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                <FaHammer className="text-xl" />
                <h1 className="px-2 text-sm">Skills</h1>
              </div>
              <Tags tags={authorData.skills || " "} />

              <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                <GiBrain className="text-xl" />
                <h1 className="px-2 text-sm">Learning</h1>
              </div>
              <Tags tags={authorData.learning || " "} />
            </div>
          </div>

          <div className="flex flex-col xl:mx-5 col-span-4">
            <div className="p-6 border rounded-xl border-r-gray-200 dark:border-gray-700">
              <div className="md:flex md:items-start md:-mx-4 md:justify-between">
                <span className="inline-block p-2 text-green-500 bg-green-100 rounded-xl md:mx-4 dark:text-white dark:bg-green-500">
                  <SiGeeksforgeeks className="text-2xl" />
                </span>

                <div className=" mt-4 md:mx-4 md:mt-0">
                  <h1 className="text-2xl font-medium text-gray-700 capitalize dark:text-white">
                    My GFG Profile
                  </h1>
                </div>
                <Button
                  className="bg-green-700 hover:bg-green-600 mt-4 md:mx-4 md:mt-0"
                  click={() => {
                    window.open(
                      authorData.gfg,
                      "__blank"
                    );
                  }}
                >
                  View
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default withProtected(Join);
