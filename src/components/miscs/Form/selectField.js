import React from "react";
import { Field, ErrorMessage, useField } from "formik";

const SelectField = ({ label, disabled, spanClass,options, id, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div  className={spanClass}>
      <label className="text-sm font-bold">{label}</label>
      {/* create a select dropdown*/}
      <Field
        id={id}
        as="select"
        {...field}
        className={`w-full bg-gray-200 dark:bg-gray-700 px-3 py-2 rounded-md focus:ring focus:ring-opacity-75 focus:ring-green-400 dark:border-gray-700 dark:text-gray-100 outline-0 disabled:cursor-not-allowed`}
        disabled={disabled}
      >
        {/* create options for the select dropdown*/}
        {field.value == '' && 
          <option value="" selected disabled>
            Select {label}
          </option>
        }

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Field>

      <ErrorMessage
        name={field.name}
        component="div"
        className="text-red-500 text-xs"
      />
    </div>
  );
};

export default SelectField;
