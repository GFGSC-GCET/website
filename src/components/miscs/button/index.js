import React from "react";

const Button = (props) => {
  return (
    <button
      className={`px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-green-700 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80 ${props.className}`}
      onClick={props.click}
    >
      {props.children}
    </button>
  );
};

export default Button;
