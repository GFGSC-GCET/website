import React from "react";
import {
  Breadcrumbs,
  Footer,
  Nav,
  ThemeChanger,
  TeamCard,
} from "../../src/components";
import { useState, useEffect } from "react";

const TeamHome = () => {
  const TeamData = [
    {
      uid: "xQ135Mw",
      name: "Areeb ",
      role: "Technical Coordinator",
      tags: ["Coordinator", "Technical"],
      image: "https://unsplash.it/200/200",
      priority: 80,
    },
    {
      uid: "LQ535Dq",
      name: "Umair",
      role: "Technical Lead",
      tags: ["Core", "Lead", "Technical"],
      image: "https://unsplash.it/200/200?random=234e",
      priority: 90,
    },
    {
      uid: "LQ535Dq",
      name: "Anshika",
      role: "Technical Lead",
      tags: ["Core", "Lead", "Technical"],
      image: "https://unsplash.it/200/200?random=242",
      priority: 90,
    },
  ];

  const [team, setTeam] = useState(TeamData);

  const [searchBar, setSearchBar] = useState('');

  useEffect(() => {
    const filteredTeamName = TeamData.filter((member) => {
      return member.name.toLowerCase().includes(searchBar.toLowerCase());
    });
    const filteredTeamRole = TeamData.filter((member) => {
      return member.role.toLowerCase().includes(searchBar.toLowerCase());
    });
    const filteredTeamTags = TeamData.filter((member) => {
      return member.tags.join().toLowerCase().includes(searchBar.toLowerCase());
    });
    //merge the filtered arrays without duplicates
    const filteredTeam = [...new Set([...filteredTeamName, ...filteredTeamRole, ...filteredTeamTags])];
    //sort on the basis of priorty
    const Sorted = filteredTeam.sort((a, b) => b.priority - a.priority);
    setTeam(Sorted);
  }, [searchBar]);
  

  return (
    <div>
      <Nav />
      <Breadcrumbs />
      <ThemeChanger />
      <section class="min-h-screen bg-white dark:bg-gray-900">
        <div class="container px-6 py-10 mx-auto">
          <h1 class="text-3xl font-semibold text-center text-gray-800 capitalize lg:text-4xl dark:text-white">
            Our GFGSC-GCET Team
          </h1>

          <p class="max-w-2xl mx-auto my-6 text-center text-gray-500 dark:text-gray-300">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
            incidunt ex placeat modi magni quia error alias, adipisci rem
            similique, at omnis eligendi optio eos harum.
          </p>

          <section class="relative w-full max-w-md px-5 py-4 mx-auto rounded-md">
            <div class="relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  class="w-5 h-5 text-gray-400"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </span>

              <input
                type="text"
                class="w-full py-3 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                placeholder="Search Name, Role, Skills"
                value = {searchBar}
                onChange = {(e)=>{setSearchBar(e.target.value)}}
              />
            </div>
          </section>

          <div class="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 xl:grid-cols-4">
            {
              team.map((member,index)=>{
                return <TeamCard member={member} key={index}/>
              })
            }
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default TeamHome;
