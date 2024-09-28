"use client";
import getList from "@/firebase/firestore/getList";
import { useEffect, useState } from "react";

export default function BusinessList() {
  const [list, setList] = useState([]);

  useEffect(() => {
    getList("business").then((snap) => {
      setList(snap.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  }, []);

  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3"
    >
      {list.map((item) => (
        <a
          key={item.id}
          className="relative col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg text-center shadow"
          href={`/admin/business/${item.id}`}
        >
          <img
            alt=""
            src={item.cover}
            className="absolute inset-0 -z-10 h-full w-full object-cover rounded-lg opacity-30"
          />
          <div className="flex flex-1 flex-col p-8">
            <img
              alt={item.title}
              src={item.logo}
              className="mx-auto h-32 flex-shrink-0"
            />
            <h3 className="mt-6 text-sm font-bold text-gray-900">
              {item.title}
            </h3>
            <dl className="flex flex-grow flex-col justify-between">
              <dt className="sr-only">Role</dt>
              <dd className="mt-3 flex flex-row flex-wrap gap-2 justify-center">
                {item.sector.map((sec) => (
                  <span
                    key={sec}
                    className="inline-flex items-center rounded-full bg-sky-50/50 px-2 py-1 text-xs font-medium text-sky-700 ring-1 ring-inset ring-sky-600/20"
                  >
                    {sec}
                  </span>
                ))}
              </dd>
              <dt className="sr-only">Title</dt>
              <dd className="text-xs font-semibold truncate text-gray-800 mt-2">
                {item.website_url}
              </dd>
            </dl>
          </div>
        </a>
      ))}
    </ul>
  );
}
