import React from "react";

const TeamCard = (props) => {
  return (
    <div className="flex flex-col items-center p-8 transition-colors duration-300 transform border cursor-pointer rounded-xl hover:border-transparent group hover:bg-green-600 dark:border-gray-700 dark:hover:border-transparent">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="object-cover w-32 h-32 rounded-full ring-4 ring-gray-300"
        src={
          props.member.image ||
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
        }
        alt={props.member.name}
      />

      <h1 className="mt-4 text-2xl font-semibold text-gray-700 capitalize dark:text-white group-hover:text-white">
        {props.member.name}
      </h1>

      <p className="mt-2 text-gray-500 capitalize dark:text-gray-300 group-hover:text-gray-300">
        {props.member.role}
      </p>

      <div className="flex mt-3 -mx-2"></div>
    </div>
  );
};

export default TeamCard;
