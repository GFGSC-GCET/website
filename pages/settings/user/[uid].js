import React from "react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import { AdminProtected } from "../../../src/routes";

import { useUserContext } from "../../../src/firebase/authContext";

import { Breadcrumbs, Footer, Nav, ThemeChanger, AdminProfileForm } from '../../../src/components' 

import {BiError} from 'react-icons/bi'

const AdminUserSettings = () => {
  const { member } = useUserContext();

  const router = useRouter();
  const { uid } = router.query;

  const [memberData, setMemberData] = useState({});

  const getMember = async () => {
    const memberRes = await member.get({uid: uid});
    setMemberData(memberRes);
  };

  useEffect(() => {
    getMember();
  }, []);

  return (
    <>
      <Nav />
      <Breadcrumbs />
      <ThemeChanger />
      <div className="container mx-auto my-10 max-w-6xl px-5">
      <h1 className="py-6 text-3xl font-semibold text-gray-800 lg:text-4xl dark:text-white">
        Editing Profile of <br/>
        <span
          className="text-green-500"
        >
          {memberData.displayName}
        </span>
      </h1>
      {memberData.regComplete == false && (
        <div className="flex w-full max-w-md overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 my-5">
          <div className="flex items-center justify-center w-12 bg-red-500">
            <div className="w-6 h-6 text-2xl text-white">
              <BiError />
            </div>
          </div>

          <div className="px-4 py-2 -mx-3">
            <div className="mx-3">
              <span className="font-semibold text-red-500 dark:text-red-400">
                { memberData.displayName }&apos;s registration incomplete
              </span>
              <p className="text-sm text-gray-600 dark:text-gray-200">
                All mandatory fields are required to save changes.
              </p>
            </div>
          </div>
        </div>
      )}
        {memberData.email != null ? (
          <AdminProfileForm user={memberData} />
        ) : (
          <h1 className="text-3xl text-center">Loading...</h1>
        )}
      </div>
      <Footer />
    </>
  );
};

export default AdminProtected(AdminUserSettings);
