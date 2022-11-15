import React from "react";
import MemberTag from "../memberTag";
import SocialPanel from "../socialPanel";
import Link from 'next/link';

const Tags = (props) => {
  let tags = props.tags
    .split(",")
    .map((tag) => tag.trim())
    .filter((tag) => tag !== "");
  //displaying the first 5 skills
  const more = tags.length - 4;
  tags.length = 4;
  return (
    <>
      <div className="mt-1 h-fit flex flex-wrap -m-1">
        {tags.map((tag, index) => {
          return (
            <span
              key={index}
              className="m-1 flex flex-wrap justify-between items-center text-sm bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-full px-3  py-0.5  leading-loose cursor-pointer dark:text-gray-300"
            >
              {tag}
            </span>
          );
        })}
        {more > 0 && (
          <span className="m-1 flex flex-wrap justify-between items-center text-sm bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-full px-3  py-0.5  leading-loose cursor-pointer dark:text-gray-300">
            +{more} more skills
          </span>
        )}
      </div>
    </>
  );
};

const TeamCard = (props) => {
  const gfgProfileURL = props.member.gfg;
  const gfgUsername = gfgProfileURL.split("/")[4];


  return (
    <Link href={"/team/" + gfgUsername +'?uid='+props.member.uid} as={"/team/" + gfgUsername} passHref target="_blank">
      <div className=" px-8 pt-6 pb-2 duration-300 transform border cursor-pointer rounded-xl group dark:border-gray-700 hover:border-green-500 hover:dark:border-green-500">
        <div className="flex flex-col sm:-mx-4 sm:flex-row">
          <img
            className="flex-shrink-0 object-cover w-20 h-20 rounded-full sm:mx-4 ring-2 ring-gray-300"
            alt="avatar"
            src={props.member.photoURL}
          />

          <div className="mt-4 sm:mx-4 sm:mt-0">
            <div className="flex-col space-y-2 justify-start items-start">
              <h1 className="text-xl font-semibold text-gray-700 capitalize line-clamp-1 md:text-1xl dark:text-white">
                {props.member.displayName}
              </h1>
              <SocialPanel
                github={props.member.github}
                linkedin={props.member.linkedin}
                portfolio={props.member.website}
                instagram={props.member.instagram}
                gfg={props.member.gfg}
              />
              <MemberTag member_level={props.member.role} />
            </div>
          </div>
        </div>

        <p className="my-4 text-gray-500 capitalize line-clamp-2 dark:text-gray-300">
          {props.member.bio || "No Bio"}
        </p>
        <Tags tags={props.member.skills || "No, Skill"} />

        <div className="flex mt-4 -mx-2"></div>
      </div>
    </Link>
  );
};

export default TeamCard;
