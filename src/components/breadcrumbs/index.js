import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { RiHomeFill } from "react-icons/ri";

const Breadcrumbs = () => {
  const router = useRouter();
  const url = router.asPath;

  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [breadcrumbsPath, setBreadcrumbsPath] = useState([]);

  useEffect(() => {
    const crumbs = url.split("/");
    crumbs.shift();
    setBreadcrumbs(crumbs);

    const crumbsPath = [];
    crumbs.forEach((crumb, index) => {
      crumbsPath.push(crumbs.slice(0, index + 1).join("/"));
    });
    setBreadcrumbsPath(crumbsPath);
  }, [url]);

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="container flex items-center px-6 py-4 mx-auto whitespace-nowrap flex-wrap">
        <Link legacyBehavior href="/">
          <a className="text-gray-600 dark:text-gray-200">
            <RiHomeFill className="mr-4" />
          </a>
        </Link>

        {breadcrumbs.map((crumb, index) => {
          return (
            <span className="flex items-center" key={index}>
              <span className="text-gray-500 dark:text-gray-300 rtl:-scale-x-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>

              <Link legacyBehavior href={`/${breadcrumbsPath[index]}`}>
                <a className="mx-5 text-gray-600 dark:text-gray-200 hover:underline capitalize">
                  {crumb}
                </a>
              </Link>
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default Breadcrumbs;
