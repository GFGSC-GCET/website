import React from "react";

const Tags = (props) => {
  const tags = props.tags
    .split(",")
    .map((tag) => tag.trim())
    .filter((tag) => tag !== "");
    return (
      <>
      <div class="mt-1 h-fit flex flex-wrap -m-1">

      {
        tags.map((tag, index) => {
          return (
          <span
            key={index}
            className="m-1 flex flex-wrap justify-between items-center text-xs sm:text-sm bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded px-4 py-2 font-bold leading-loose cursor-pointer dark:text-gray-300"
          >
            {tag}
          </span>
          );
        })
      }
      </div>
      </>
    );
};


const TeamCard = (props) => {
  return (
    <div class="px-12 py-8 transition-colors duration-300 transform border cursor-pointer rounded-xl hover:border-green-500 group dark:border-gray-700 dark:hover:border-green-600">
      <div class="flex flex-col sm:-mx-4 sm:flex-row">
        <img
          class="flex-shrink-0 object-cover w-24 h-24 rounded-full sm:mx-4 ring-4 ring-gray-300"
          src={props.member.photoURL}
          alt={props.member.displayName + " Profile Image"}
        />

        <div class="mt-4 sm:mx-4 sm:mt-0">
          <h1 class="text-xl font-semibold text-gray-700 capitalize md:text-2xl dark:text-white">
            {props.member.displayName}
          </h1>
          <p class="mt-2 text-gray-500 capitalize dark:text-gray-300">
            {props.member.role || "Member"}
          </p>
          <a
            href={props.member.github}
            class="mt-2 text-gray-500 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-500"
          >
            {props.member.github || ""}
          </a>
        </div>
      </div>

      <p class="mt-4 text-gray-500 capitalize dark:text-gray-300 truncate">
        {props.member.bio || "No Bio"}
      </p> 
      <Tags tags={props.member.skills || "No, Skill"} />

      <div class="flex mt-4 -mx-2"></div>
    </div>
  );
};

export default TeamCard;
