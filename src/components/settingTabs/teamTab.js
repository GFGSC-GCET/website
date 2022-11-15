import { useState, useEffect } from "react";
import MiniSearch from "minisearch";
import { teamDatabase } from "../../firebase/fetchData";
import { useRouter } from "next/router";

const TeamCard = (props) => {
  const router = useRouter();
  return (
    <div
      className="px-12 py-4 transition-colors duration-300 transform border cursor-pointer rounded-xl hover:border-green-500 group dark:border-gray-700 dark:hover:border-green-600"
      onClick={() => {
        window.open("/settings/user/" + props.member.uid, "__blank");
      }}
    >
      <div className="flex flex-row ">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="flex-shrink-0 object-cover w-24 h-24 rounded-full sm:mx-4 ring-4 ring-gray-300"
          src={props.member.photoURL}
          alt={props.member.displayName + " Profile Image"}
        />

        <div className="mt-4 mx-4">
          <h1 className="text-xl font-semibold text-gray-700 capitalize md:text-2xl dark:text-white">
            {props.member.displayName}
          </h1>
          <p className="mt-2 text-gray-500 capitalize dark:text-gray-300">
            {props.member.role || "Member"}
          </p>
        </div>
      </div>
    </div>
  );
};

const TeamTab = () => {
  const [teamData, setTeamData] = useState([]);
  useEffect(() => {
    const getTeam = async () => {
      const teamData = await teamDatabase.get();

      setTeamData(teamData);
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
      "displayName",
      "uid",
      "collegeEmail",
      "year",
      "batch",
      "bio",
      "learning",
      "skills",
      "gfg",
      "github",
      "linkedin",
      "website",
      "instagram",
      "photoURL",
      "createdAt",
      "regComplete",
      "priority",
      "admin",
      "role",
    ], // fields to index for full-text search
    storeFields: [
      "displayName",
      "uid",
      "collegeEmail",
      "year",
      "batch",
      "bio",
      "learning",
      "skills",
      "gfg",
      "github",
      "linkedin",
      "website",
      "instagram",
      "photoURL",
      "createdAt",
      "regComplete",
      "priority",
      "admin",
      "role",
    ], // fields to return with search results
    searchOptions: {
      boost: { title: 2 },
      fuzzy: 0.2,
      prefix: true,
    },
  });

  useEffect(() => {
    if (searchBar == "") {
      const Sorted = teamData.sort((a, b) => b.priority - a.priority);
      setTeam(Sorted);
    } else {
      //sort on the basis of priorty
      const withId = teamData.map((item, index) => {
        return { ...item, id: index + 1 };
      });
      miniSearch.addAll(withId);
      let filteredTeam = miniSearch.search(searchBar);
      console.log(filteredTeam);
      const Sorted = filteredTeam.sort((a, b) => b.priority - a.priority);
      setTeam(Sorted);
    }
  }, [searchBar]);

  return (
    <>
      <div className="container flex flex-col">
        <input
          type="text"
          className="w-full py-3 pl-10 pr-4 text-gray-700 bg-gray-100 border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none"
          placeholder="Search Team Members"
          value={searchBar}
          onChange={(e) => {
            setSearchBar(e.target.value);
          }}
        />
        <div className="flex flex-col">
          {/* create a list of team members */}
          <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 lg:grid-cols-2 ">
            {team.map((member, index) => {
              return <TeamCard member={member} key={index} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamTab;
