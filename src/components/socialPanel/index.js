import React from "react";
import {
  RiGithubFill,
  RiGlobalFill,
  RiInstagramFill,
  RiLinkedinFill,
} from "react-icons/ri";

import { SiGeeksforgeeks } from "react-icons/si";

const SocialPanel = (props) => {
  console.log(props);
  const gfg = props?.gfg;
  const github = props?.github;
  const instagram = props?.instagram;
  const portfolio = props?.portfolio;
  const linkedin = props?.linkedin;
  return (
    <>
      <div className="flex space-x-3">
        {gfg && (
          <a href={gfg} target="__blank">
            <SiGeeksforgeeks
              size={20}
              className="ease-in-out transform transition duration-200 hover:scale-125 hover:text-green-500"
            />
          </a>
        )}
        {github && (
          <a href={github} target="__blank">
            <RiGithubFill
              size={20}
              className="ease-in-out transform transition duration-200 hover:scale-125 hover:text-purple-400"
            />
          </a>
        )}
        {linkedin && (
          <a href={linkedin} target="__blank">
            <RiLinkedinFill
              size={20}
              className="ease-in-out transform transition duration-200 hover:scale-125  hover:text-blue-400"
            />
          </a>
        )}
        {instagram && (
          <a href={instagram} target="__blank">
            <RiInstagramFill
              size={20}
              className="ease-in-out transform transition duration-200 hover:scale-125  hover:text-pink-400"
            />
          </a>
        )}{" "}
        {portfolio && (
          <a href={portfolio} target="__blank">
            <RiGlobalFill
              size={20}
              className="ease-in-out transform transition duration-200 hover:scale-125  hover:text-green-400"
            />
          </a>
        )}
      </div>
    </>
  );
};

export default SocialPanel;
