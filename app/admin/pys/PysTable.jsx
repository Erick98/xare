"use client";
import getData from "@/firebase/firestore/getData";
import getList from "@/firebase/firestore/getList";
import numeral from "numeral";
import { useEffect, useState } from "react";

const Item = ({ item }) => {
  const [business, setBusiness] = useState({});

  useEffect(() => {
    getData("business", item.business).then((snap) => {
      setBusiness(snap.result.data());
    });
  }, [item.business]);

  return (
    <tr>
      <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
        <div className="flex items-center">
          <div className="h-11 w-11 flex-shrink-0 flex items-center justify-center">
            <img alt="" src={business.logo} className="w-11 h-auto" />
          </div>
          <div className="ml-4">
            <div className="font-medium text-gray-900">{item.title}</div>
            <div className="mt-1 text-gray-500">{business.title}</div>
          </div>
        </div>
      </td>
      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
        <div className="text-gray-900">{item.type}</div>
        <div className="mt-1 text-gray-500">{item.periodicity}</div>
      </td>
      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
        {item.availability === "Disponible" ? (
          <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
            Disponible
          </span>
        ) : (
          <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
            No Disponible
          </span>
        )}
      </td>
      <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
        <a
          href={`/admin/pys/${item.id}`}
          className="text-indigo-600 hover:text-indigo-900"
        >
          Ver más<span className="sr-only">, {item.id}</span>
        </a>
      </td>
    </tr>
  );
};

export default function PysTable() {
  const [list, setList] = useState([]);

  useEffect(() => {
    getList("pys").then((snap) => {
      setList(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Título
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Detalle
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Disponibilidad
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {list.map((item) => (
                  <Item key={item.id} item={item} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
