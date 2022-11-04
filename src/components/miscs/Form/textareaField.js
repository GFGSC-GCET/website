import React from "react";
import { Field, ErrorMessage, useField } from "formik";

const TextareaField = ({ label, disabled, spanClass,description, id, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className={spanClass}>
      <label className="text-sm font-bold">{label}</label>
      <div className="text-xs mb-2">{description}</div>
      <Field
        id={id}
        as="textarea"
        {...field}
        className={`w-full bg-gray-200 dark:bg-gray-700 px-3 py-2 rounded-md focus:ring focus:ring-opacity-75 focus:ring-green-400 dark:border-gray-700 dark:text-gray-100 outline-0 disabled:cursor-not-allowed h-20`}
        disabled={disabled}
      />

      <ErrorMessage
        name={field.name}
        component="div"
        className="text-red-500 text-xs"
      />
    </div>
  );
};

export default TextareaField;
