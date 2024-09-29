"use client";
import addData from "@/firebase/firestore/addData";
import getList from "@/firebase/firestore/getList";
import updateData from "@/firebase/firestore/updateData";
import numeral from "numeral";
import { useEffect, useState } from "react";

export default function Page() {
  const [sites, setSites] = useState([]);
  const [comissions, setComissions] = useState([]);

  const sitesFunction = () => {
    getList("sites").then((snap) => {
      const list = snap.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setSites(list);
    });
  };
  const comissionsFunction = () => {
    getList("comissions").then((snap) => {
      const list = snap.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setComissions(list);
    });
  };

  useEffect(() => {
    sitesFunction();
    comissionsFunction();
  }, []);

  const handleComission = (e) => {
    e.preventDefault();
    const site = e.target.site.value;
    const date = new Date(e.target.date.value).valueOf();
    const amount = Number(e.target.amount.value);
    const concept = e.target.concept.value;
    const status = e.target.status.value;
    const data = {
      site,
      date,
      amount,
      concept,
      status,
    };
    addData("comissions", data).then(() => {
      comissionsFunction();
      alert("Comisión agregada correctamente");
      e.target.reset();
    });
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      <div>
        <h1 className="text-2xl font-semibold">Agregar Comisión</h1>
        <form
          onSubmit={handleComission}
          className="grid grid-cols-1 gap-4 mt-6"
        >
          <div>
            <label
              htmlFor="site"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Sitio
            </label>
            <select
              id="site"
              name="site"
              className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option>** Seleccionar opción **</option>
              {sites.map((site) => (
                <option key={site.id} value={site.id}>
                  {site.name} - {site.subdomain}.xare.io
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Fecha de Comisión
            </label>
            <div className="mt-2">
              <input
                id="date"
                name="date"
                type="date"
                placeholder="you@example.com"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Monto
            </label>
            <div className="mt-2">
              <input
                id="amount"
                name="amount"
                type="number"
                placeholder="
                0.00"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="concept"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Concepto
            </label>
            <div className="mt-2">
              <textarea
                id="concept"
                name="concept"
                rows="3"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              ></textarea>
            </div>
          </div>
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Estatus
            </label>
            <select
              id="status"
              name="status"
              className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option>** Seleccionar opción **</option>
              <option value="pending">Pendiente</option>
              <option value="paid">Pagado</option>
            </select>
          </div>
          <div>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Agregar
            </button>
          </div>
        </form>
      </div>
      <div className="col-span-2">
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Fecha
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Concepto
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Estatus
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Monto
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {comissions.map((item) => (
                    <tr key={item.id}>
                      <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">
                        {item.id}
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">
                        {new Date(item.date).toLocaleDateString()}
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-900">
                        {item.concept}
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                        {item.status === "pending" ? (
                          <span
                            onDoubleClick={() => {
                              updateData("comissions", item.id, {
                                status: "paid",
                              }).then(() => {
                                comissionsFunction();
                              });
                            }}
                            className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800 cursor-pointer"
                          >
                            Pendiente
                          </span>
                        ) : (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Pagado
                          </span>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                        {numeral(item.amount).format("$0,0.00")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
