import React from "react";

const Button = ({...props}) => {
  return (
    <button
      type={props.type}
      className={`${props.className} px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform rounded-md focus:outline-none`}
      onClick={props.click}
    >
      {props.children}
    </button>
  );
};

export default Button;
