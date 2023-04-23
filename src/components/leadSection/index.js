import React from "react";
import Button from "../miscs/button";

import { teamDatabase } from "../../firebase/fetchData";
import { useState, useEffect } from "react";

import { useRouter } from "next/router";

const LeadSection = () => {
  const router = useRouter();

  const [teamData, setTeamData] = useState([]);
  useEffect(() => {
    const getTeam = async () => {
      const teamData = await teamDatabase.get();
      //remove all data where regComplete is false
      const teamArray = teamData.filter(
        (team) => team.regComplete == true && team.priority >= 40
      );
      setTeamData(teamArray);
    };
    getTeam();
  }, []);

  const [team, setTeam] = useState([]);
  useEffect(() => {
    const Sorted = teamData.sort((a, b) => b.priority - a.priority);
    setTeam(Sorted);
  }, [teamData]);

  return (
    <div>
      {teamData.length != 0 && (
        <>
          <hr className="my-8 border-gray-200 dark:border-gray-700" />
          <section className="bg-white dark:bg-gray-900">
            <div className="container px-6 py-8 mx-auto flex flex-col justify-center">
              <h2 className="text-3xl font-semibold text-center text-gray-800 capitalize lg:text-4xl dark:text-white">
                Our Leads
              </h2>

              <div className="grid gap-8 mt-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-auto place-items-center">
                {teamData.map((member, index) => {
                  return (
                    <div className="w-full max-w-xs text-center mx-auto" key={index}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        className="object-cover object-center w-full h-48 mx-auto rounded-lg"
                        src={member.photoURL}
                        alt="avatar"
                      />

                      <div className="mt-2">
                        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">
                          {member.displayName}
                        </h3>
                        <span className="mt-1 font-medium text-gray-600 dark:text-gray-300">
                          {member.role}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <Button
                className="bg-green-700 mx-auto mt-16"
                click={() => {
                  router.push("/team");
                }}
              >
                View All
              </Button>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default LeadSection;
