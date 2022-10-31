import React from 'react'
import { ErrorMessage, useField } from 'formik';

const TextField = ({label, disabled, ...props}) => {
  const [field, meta] = useField(props);

  return (
    <div className="col-span-full sm:col-span-full">
      <label className="text-sm">
        {label}
      </label>
      <input
        {...field}
        className={`w-full bg-gray-200 dark:bg-gray-700 px-3 py-2 rounded-md focus:ring focus:ring-opacity-75 focus:ring-green-400 dark:border-gray-700 dark:text-gray-100 outline-0 disabled:cursor-not-allowed`}
        disabled={disabled}
      />
      
      <ErrorMessage name={field.name} component="div" className="text-red-500 text-xs" />
    </div>
  );
}

export default TextField