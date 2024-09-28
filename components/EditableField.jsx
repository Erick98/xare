"use client";

import updateData from "@/firebase/firestore/updateData";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function EditableField({
  data,
  field,
  collection,
  dataFunction,
  id,
}) {
  const [isEditable, setIsEditable] = useState(false);
  const [value, setValue] = useState(data[field.index]);

  const handleUpdate = () => {
    updateData(collection, id, { [field.index]: value }).then(() => {
      setIsEditable(false);
      dataFunction();
    });
  };

  return (
    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt className="text-sm font-medium leading-6 text-gray-900">
        {field.label}
      </dt>
      <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
        {isEditable === false ? (
          <>
            <span className="flex-grow">{data[field.index]}</span>
            {field.editable !== false && (
              <span className="ml-4 flex-shrink-0">
                <button
                  type="button"
                  className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500"
                  onClick={() => setIsEditable(true)}
                >
                  Actualizar
                </button>
              </span>
            )}
          </>
        ) : (
          <>
            {field.type === "select" ? (
              <select
                name={field.index}
                id={field.index}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                defaultValue={data[field.index]}
                onChange={(e) => setValue(e.target.value)}
              >
                {field.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : field.type === "textarea" ? (
              <textarea
                name={field.index}
                id={field.index}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                defaultValue={data[field.index]}
                onChange={(e) => setValue(e.target.value)}
              />
            ) : (
              <input
                type="text"
                name={field.index}
                id={field.index}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                defaultValue={data[field.index]}
                onChange={(e) => setValue(e.target.value)}
              />
            )}
            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center px-2 py-1 ml-2 border border-transparent text-base font-medium rounded-md  focus:outline-none focus:ring-2 focus:ring-offset-2 text-white bg-indigo-600 hover:bg-indigo-700"
                onClick={handleUpdate}
              >
                <CheckIcon className="w-6 h-6 font-extrabold" />
              </button>
              <button
                className="inline-flex items-center px-2 py-1 ml-2 border border-transparent text-base font-medium rounded-md  focus:outline-none focus:ring-2 focus:ring-offset-2 text-white bg-red-600 hover:bg-red-700"
                onClick={() => {
                  setIsEditable(false);
                  setValue(data[field.index]);
                }}
              >
                <XMarkIcon className="w-6 h-6 font-extrabold" />
              </button>
            </div>
          </>
        )}
      </dd>
    </div>
  );
}
