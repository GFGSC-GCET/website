import React from "react";
import MemberTree from "../../../data/memberTree.json";

const MemberTag = (props) => {
  const level = props.member_level;
  let levelColorObj =
    MemberTree[level.toLowerCase()] !== null
      ? MemberTree[level.toLowerCase()]
      : MemberTree.head;
  if (!levelColorObj) {
    levelColorObj = MemberTree.head;
  }
  return (
    <>
      <div
        className={
          levelColorObj.bg +
          " -ml-2 w-auto inline-block items-center justify-center  bg-opacity-20 rounded-full py-0.5 px-3"
        }
      >
        <p className={levelColorObj.text + " text-center text-sm font-semibold"}>
          {level}
        </p>
      </div>
    </>
  );
};

export default MemberTag;
