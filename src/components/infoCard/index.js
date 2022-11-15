import React from "react";

const InfoCard = (props) => {
  const title = props.title;
  const description = props.description;
  const Icon = props.icon;
  return (
    <>
      <div className="px-6 py-5 border rounded-xl border-r-gray-200 dark:border-gray-700">
        <div className="md:flex md:items-start lg:items-center md:-mx-4">
          <span className="inline-block mt-1 lg:mt-0 p-2 text-green-500 bg-opacity-20 bg-green-600 rounded-xl md:mx-4">
            <div className="flex items-center justify-center w-8 h-8">
              <Icon className="text-current " size={40} />
            </div>
          </span>

          <div className="md:mx-4 md:mt-0 prose lg:prose-md dark:prose-invert">
            <h2 className="mt-4 md:mt-0">{title}</h2>
            <p className="-mt-2">{description}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoCard;
