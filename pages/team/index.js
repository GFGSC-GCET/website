import React from "react";
import {
  Breadcrumbs,
  Footer,
  Nav,
  ThemeChanger,
  TeamCard,
} from "../../src/components";

import { useState, useEffect } from "react";
import MiniSearch from "minisearch";
import { teamDatabase } from "../../src/firebase/fetchData";

const TeamHome = () => {
  const [teamData, setTeamData] = useState([]);
  useEffect(() => {
    const getTeam = async () => {
      const teamData = await teamDatabase.get();
      //remove all data where regComplete is false
      const teamArray = teamData.filter(
        (team) => team.regComplete === true
      );
      setTeamData(teamArray);
    };
    getTeam();
  }, []);
  
  const [team, setTeam] = useState([]);
  useEffect(() => {
    const Sorted = teamData.sort((a, b) => b.priority - a.priority);
    //add id to each element
    setTeam(Sorted);
  }, [teamData]);

  const [searchBar, setSearchBar] = useState("");
  let miniSearch = new MiniSearch({
    fields: [
      "displayName","uid","collegeEmail","year","batch","bio","learning","skills",'gfg',"github","linkedin","website","instagram","photoURL","createdAt","regComplete","priority","admin","role",], // fields to index for full-text search
    storeFields: [
      "displayName","uid","collegeEmail","year","batch","bio","learning","skills",'gfg',"github","linkedin","website","instagram","photoURL","createdAt","regComplete","priority","admin","role",], // fields to return with search results
    searchOptions: {
      boost: { displayName: 2 },
      fuzzy: 0.2,
      prefix: true
    },
  });

  useEffect(() => {
    if (searchBar == ''){
      const Sorted = teamData.sort((a, b) => b.priority - a.priority);
      setTeam(Sorted);
    }else{
      //sort on the basis of priorty
      const withId = teamData.map((item, index) => {
        return { ...item, id: index+1 };
      });
      miniSearch.addAll(withId);
      let filteredTeam = miniSearch.search(searchBar)
      console.log(filteredTeam)
      const Sorted = filteredTeam.sort((a, b) => b.priority - a.priority);
      setTeam(Sorted); 
    }
  }, [searchBar]);

  return (
    <div>
      <Nav />
      <Breadcrumbs />
      <ThemeChanger />
      <section className="min-h-screen bg-white dark:bg-gray-900">
        <div className="container px-6 py-10 mx-auto">
          <h1 className="text-3xl font-semibold text-center text-gray-800 capitalize lg:text-4xl dark:text-white">
            Our <span className="text-green-500">GFGSC-GCET</span> Team
          </h1>

          <p className="max-w-2xl mx-auto my-6 text-center text-gray-500 dark:text-gray-300">
            Our GFGSC-GCET team is dynamic with a passion for management and depth in their respective
areas of expertise. Our dedicated team bring energy, fresh ideas and pride to their work.
          </p>

          <section className="relative w-full max-w-md px-5 py-4 mx-auto rounded-md">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="w-5 h-5 text-gray-400"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </span>

              <input
                type="text"
                className="w-full py-3 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none"
                placeholder="Search Name, Role, Skills"
                value={searchBar}
                onChange={(e) => {
                  setSearchBar(e.target.value);
                }}
              />
            </div>
          </section>

          <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 xl:grid-cols-3">
            {team.map((member, index) => {
              return <TeamCard member={member} key={index} />;
            })}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default TeamHome;
