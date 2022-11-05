import React from "react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import { AdminProtected } from "../../../src/routes";

import { useUserContext } from "../../../src/firebase/authContext";

import { ProfileTab } from "../../../src/components/settingTabs";

const AdminUserSettings = () => {
  const { member } = useUserContext();

  const router = useRouter();
  const { uid } = router.query;

  const [memberData, setMemberData] = useState({});

  const getMember = async () => {
    const memberRes = await member.get({uid: uid});
    memberRes?.regComplete ? router.push("/") : null;
    console.log(memberRes);
    setMemberData(memberRes);
  };

  useEffect(() => {
    getMember();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <ProfileTab member={memberData} />
        </div>
      </div>
    </div>
  );
};

export default AdminProtected(AdminUserSettings);
