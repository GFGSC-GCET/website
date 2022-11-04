import React from "react";
import Link from "next/link";
import { FaGithub, FaLaptopCode } from "react-icons/fa";
import { GiBrain } from "react-icons/gi";

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-between p-6 bg-gray-100 dark:bg-gray-800 sm:flex-row z-[900] mt-10">
      <a
        href="#"
        className="text-xl font-bold text-gray-600 transition-colors duration-300 dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
      >
        GFGSC-GCET
      </a>

      <p className="text-sm text-gray-600 dark:text-gray-300">
        © Copyright 2022. All Rights Reserved.
      </p>

      <div className="flex items-center -mx-2" title="contribute">
        <Link
          legacyBehavior
          href="https://github.com/GFGSC-GCET/website"
          passHref
        >
          <a className="flex items-center -mx-2">
            Made with <FaLaptopCode className="m-2 text-green-500 text-lg" />{" "}
            Contribute on <FaGithub className="m-2" />
          </a>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
