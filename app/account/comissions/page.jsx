"use client";
import { useAuthContext } from "@/context/AuthContext";
import getData from "@/firebase/firestore/getData";
import getWhereList from "@/firebase/firestore/getWhereList";
import numeral from "numeral";
import { useEffect, useState } from "react";

export default function Page() {
  const { user } = useAuthContext();
  const [userData, setUserData] = useState({});
  const [comissions, setComissions] = useState([]);

  const userDataFunction = () => {
    getData("users", user.uid).then((snap) => {
      setUserData(snap.result.data());
    });
  };
  const comissionsFunction = () => {
    getWhereList("comissions", "site", "==", userData.site).then((snap) => {
      const data = snap.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      const ordered = data.sort((a, b) => b.date - a.date);
      setComissions(ordered);
    });
  };

  useEffect(() => {
    if (user.uid) {
      userDataFunction();
    }
  }, [user.uid]);
  useEffect(() => {
    if (userData.site) {
      comissionsFunction();
    }
  }, [userData.site]);

  return (
    <div>
      <h1>Comisiones</h1>
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
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
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
  );
}
