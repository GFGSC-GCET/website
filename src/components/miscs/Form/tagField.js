import React from "react";
import { useState, useEffect } from "react";
import { ErrorMessage, useField } from "formik";

const TagField = ({ label, disabled, spanClass, placeholder, id, ...props }) => {
  const [field, meta] = useField(props);
  const [tags, setTags] = useState([]);

  useEffect(()=>{    
    const input = field.value||'';
    const newTags = input
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");
    setTags(newTags);
  },[field.value])

  return (
    <div className={spanClass}>
      <label className="text-sm font-bold">{label}</label>
      <div className="flex flex-col">
        <input
          id={id}
          {...field}
          className={`w-full bg-gray-200 dark:bg-gray-700 px-3 py-2 rounded-md focus:ring focus:ring-opacity-75 focus:ring-green-400 dark:border-gray-700 dark:text-gray-100 outline-0 disabled:cursor-not-allowed`}
          disabled={disabled}
          placeholder={placeholder}
        />
      </div>
      <ErrorMessage
        name={field.name}
        component="div"
        className="text-red-500 text-xs"
      />
      <div className="mt-1 h-fit flex flex-wrap -m-1">
        {tags.map((tag, index) => {
          return (
            <span
              key={index}
              className="m-1 flex flex-wrap justify-between items-center text-xs sm:text-sm bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded px-4 py-2 font-bold leading-loose cursor-pointer dark:text-gray-300"
            >
              {tag}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default TagField;
