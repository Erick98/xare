"use client";
import { useAuthContext } from "@/context/AuthContext";
import getData from "@/firebase/firestore/getData";
import getList from "@/firebase/firestore/getList";
import { useEffect, useState } from "react";

export default function Page() {
  const { user } = useAuthContext();

  const [userData, setUserData] = useState({});
  const [sites, setSites] = useState([]);
  const [customers, setCustomers] = useState([]);

  const userDataFunction = () => {
    getData("users", user.uid).then((snap) => {
      setUserData(snap.result.data());
    });
  };
  const sitesFunction = () => {
    getList("sites").then((snap) => {
      const list = snap.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setSites(list);
    });
  };
  const customersFunction = () => {
    getList("customers").then((snap) => {
      const data = snap.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setCustomers(data);
    });
  };

  useEffect(() => {
    if (user.uid) {
      userDataFunction();
    }
  }, [user.uid]);

  useEffect(() => {
    if (userData.site) {
      sitesFunction();
      customersFunction();
    }
  }, [userData.site]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, phone, site } = e.target.elements;
    addData("customers", {
      name: name.value,
      email: email.value,
      phone: phone.value,
      site: site.value,
      date: new Date().valueOf(),
    }).then(() => {
      customersFunction();
      e.target.reset();
      alert("Cliente agregado");
    });
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Agregar Cliente
        </h1>
        <form
          className="relative mt-6 flex-1 px-4 sm:px-6 grid grid-cols-1 gap-4"
          onSubmit={handleSubmit}
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Nombre Completo
            </label>
            <div className="mt-2.5">
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="given-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Email
            </label>
            <div className="mt-2.5">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Teléfono
            </label>
            <div className="mt-2.5">
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="site"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Sitio
            </label>
            <select
              id="site"
              name="site"
              className="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option>** Seleccionar opción **</option>
              {sites.map((site) => (
                <option key={site.id} value={site.id}>
                  {site.name} - {site.subdomain}.xare.io
                </option>
              ))}
            </select>
          </div>
          <div className="flex">
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ml-auto"
            >
              Agregar Cliente
            </button>
          </div>
        </form>
      </div>
      <div className="col-span-2">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Fecha
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                      >
                        Nombre
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Teléfono
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                      >
                        <span className="sr-only">Ver más</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {customers.map((person) => (
                      <tr key={person.email}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                          {/* DATE IN FORMAT FROM VALUEOF */}
                          {new Date(person.date).toLocaleDateString()}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {person.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {person.email}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {person.phone}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                          <a
                            href={`/account/customers/${person.id}`}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Ver más
                            <span className="sr-only">, {person.id}</span>
                          </a>
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
    </div>
  );
}
