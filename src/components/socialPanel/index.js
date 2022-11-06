import React from "react";
import {
  RiGithubFill,
  RiGlobalFill,
  RiInstagramFill,
  RiLinkedinFill,
} from "react-icons/ri";

const SocialPanel = (props) => {
  console.log(props);
  const github = props.github;
  const instagram = props.instagram;
  const portfolio = props.portfolio;
  const linkedin = props.linkedin;
  return (
    <>
      <div class="flex space-x-3">
        {github && (
          <a href={github}>
            <RiGithubFill
              size={20}
              class="ease-in-out transform transition duration-200 hover:scale-125 hover:text-purple-400"
            />
          </a>
        )}
        {linkedin && (
          <a href={linkedin}>
            <RiLinkedinFill
              size={20}
              class="ease-in-out transform transition duration-200 hover:scale-125  hover:text-green-400"
            />
          </a>
        )}
        {instagram && (
          <a href={instagram}>
            <RiInstagramFill
              size={20}
              class="ease-in-out transform transition duration-200 hover:scale-125  hover:text-green-400"
            />
          </a>
        )}{" "}
        {portfolio && (
          <a href={portfolio}>
            <RiGlobalFill
              size={20}
              class="ease-in-out transform transition duration-200 hover:scale-125  hover:text-green-400"
            />
          </a>
        )}
      </div>
    </>
  );
};

export default SocialPanel;
