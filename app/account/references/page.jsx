"use client";
import { useAuthContext } from "@/context/AuthContext";
import getData from "@/firebase/firestore/getData";
import { LinkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

export default function Page() {
  const { user } = useAuthContext();

  const [userData, setUserData] = useState({});
  const [site, setSite] = useState(null);
  const [sellers, setSellers] = useState([]);
  const [companies, setCompanies] = useState([]);

  const userDataFunction = () => {
    getData("users", user.uid).then((snap) => {
      setUserData(snap.result.data());
    });
  };
  const siteFunction = () => {
    getData("sites", userData.site).then((snap) => {
      setSite(snap.result.data());
    });
  };
  const sellersFunction = () => {
    getWhereList("users", "referral", "==", userData.site).then((snap) => {
      const data = snap.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setSellers(data);
    });
  };
  const companiesFunction = () => {
    getWhereList("companies", "referral", "==", userData.site).then((snap) => {
      const data = snap.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setCompanies(data);
    });
  };

  useEffect(() => {
    if (user.uid) {
      userDataFunction();
    }
  }, [user.uid]);
  useEffect(() => {
    if (userData.site) {
      siteFunction();
      sellersFunction();
      companiesFunction();
    }
  }, [userData.site]);

  return (
    <div>
      <div className="max-w-6xl mx-auto">
        <div className="px-4">
          <h1 className="text-xl font-bold">Refiere vendedores y empresas.</h1>
          <p className="text-gray-500 mt-4">
            Recibe comisión por cada venta que realicen tus referidos. ¿Cómo
            funciona? Regístra vendedores y recibe una comisión del 10% sobre lo
            generado en comisiones por el vendedor referido y una comisión del
            20% de las comisiones generadas de las ventas de las empresas
            referidas.
          </p>
          {/* CLICK PARA COPIAR LA URL */}
          <div className="flex justify-start mt-8 gap-8">
            <button
              className="bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center justify-center"
              onClick={() => {
                navigator.clipboard
                  .writeText(
                    `https://${site.subdomain}.xare.io/referral/seller`
                  )
                  .then(() => {
                    alert("URL copiada a la memoria");
                  });
              }}
            >
              <LinkIcon className="h-4 w-4 text-white mr-2" />{" "}
              <span>Referir Vendedor</span>
            </button>
            <button
              className="bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center justify-center"
              onClick={() => {
                navigator.clipboard
                  .writeText(
                    `https://${site.subdomain}.xare.io/referral/company`
                  )
                  .then(() => {
                    alert("URL copiada a la memoria");
                  });
              }}
            >
              <LinkIcon className="h-4 w-4 text-white mr-2" />{" "}
              <span>Referir Empresa</span>
            </button>
          </div>
        </div>
        <hr className="mt-8" />
        <div className="mt-8 grid md:grid-cols-2 grid-cols-1 divide-x">
          <div className="p-4">
            <h2 className="text-lg font-bold">Vendedores Referidos</h2>
            <div className="mt-4">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
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
                        Estatus
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {sellers.map((item) => (
                      <tr key={item.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                          {item.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {item.email}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {item.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="p-4">
            <h2 className="text-lg font-bold">Empresas Referidas</h2>
            <div className="mt-4">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                      >
                        Empresa
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
                        Estatus
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {companies.map((item) => (
                      <tr key={item.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                          {item.title}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {item.main_email}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {item.status}
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
