"use client";
import { useAuthContext } from "@/context/AuthContext";
import getData from "@/firebase/firestore/getData";
import getWhereList from "@/firebase/firestore/getWhereList";
import uploadFile from "@/firebase/storage/uploadFile";
import numeral from "numeral";
import { useEffect, useState } from "react";

const Item = ({ sale }) => {
  const [customer, setCustomer] = useState({});
  const [pys, setPys] = useState({});
  const [site, setSite] = useState({});

  const customerFunction = () => {
    getData("customers", sale.customer).then((snap) => {
      setCustomer(snap.result.data());
    });
  };
  const pysFunction = () => {
    getData("pys", sale.pys).then((snap) => {
      setPys(snap.result.data());
    });
  };
  const siteFunction = () => {
    getData("sites", sale.site).then((snap) => {
      setSite(snap.result.data());
    });
  };

  useEffect(() => {
    if (sale.customer) {
      customerFunction();
    }
  }, [sale]);
  useEffect(() => {
    if (sale.pys) {
      pysFunction();
    }
  }, [sale]);
  useEffect(() => {
    if (sale.site) {
      siteFunction();
    }
  }, [sale]);

  return (
    <div className="bg-white shadow-sm rounded-md p-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            {pys.title}
            {sale.status === "pending" ? (
              <span className="bg-yellow-200 text-yellow-800 rounded-full px-2 py-1 text-xs ml-2">
                En Revisión
              </span>
            ) : sale.status === "success" ? (
              <span className="bg-green-200 text-green-800 rounded-full px-2 py-1 text-xs ml-2">
                Exitoso
              </span>
            ) : (
              <span className="bg-yellow-200 text-yellow-800 rounded-full px-2 py-1 text-xs ml-2">
                En Revisión
              </span>
            )}
          </h3>
          <p className="text-sm text-gray-500">{customer.name}</p>
          <p className="text-sm text-gray-500">{site.name}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">
            {numeral(sale.amount).format("$0,0.00")}
          </p>
          <p className="text-sm text-gray-500">
            {new Date(sale.date).toLocaleDateString()}
          </p>
          <a
            href={sale.file}
            target="_blank"
            className="text-sm text-indigo-600 hover:underline"
          >
            Ver archivo
          </a>
        </div>
      </div>
    </div>
  );
};

export default function Page() {
  const { user } = useAuthContext();
  const [userData, setUserData] = useState({});
  const [site, setSite] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [sales, setSales] = useState([]);
  const [pys, setPys] = useState([]);

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
  const customersFunction = () => {
    getWhereList("customers", "site", "==", userData.site).then((snap) => {
      const data = snap.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setCustomers(data);
    });
  };
  const salesFunction = () => {
    getWhereList("sales", "site", "==", userData.site).then((snap) => {
      const data = snap.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      const ordered = data.sort((a, b) => b.date - a.date);
      setSales(ordered);
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
      customersFunction();
      salesFunction();
    }
  }, [userData.site]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { customer, pys, amount, file } = e.target.elements;
    var data = {
      customer: customer.value,
      pys: pys.value,
      amount: amount.value,
      site: userData.site,
      date: new Date().valueOf(),
      status: "pending",
    };
    const pysData = await getData("pys", pys.value).then((snap) =>
      snap.result.data()
    );
    data.business = pysData.business;
    uploadFile(`/sales/${quote.id}`, file.files[0]).then((fileSnap) => {
      data.file = fileSnap.result.downloadURL;
      addData("sales", data).then(() => {
        salesFunction();
        e.target.reset();
        alert("Venta agregada");
      });
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Ventas</h1>
      <p className="text-gray-500 mt-4">
        Aquí podrás ver el historial de tus ventas.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 mt-6 gap-6">
        <div>
          <h2>Agregar Venta</h2>
          <p className="text-gray-500 mt-2 text-sm">
            ¿Existen ventas que no encuentras o no se han registrado? Agregalas
            a continuación para revisarlo, autorizarlo al instante y asignar tus
            comisiones más rápido.
          </p>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 mt-6">
            <div>
              <label
                htmlFor="customer"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Cliente
              </label>
              <select
                id="customer"
                name="customer"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
              >
                <option value="">Selecciona un cliente</option>
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="pys"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Producto o Servicio
              </label>
              <select
                id="pys"
                name="pys"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
              >
                <option value="">Selecciona un producto o servicio</option>
                {pys.map((py) => (
                  <option key={py.id} value={py.id}>
                    {py.title}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="amount"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Monto
              </label>
              <input
                id="amount"
                name="amount"
                type="number"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
              />
            </div>
            <div>
              <label
                htmlFor="file"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Archivo
              </label>
              <div className="mt-2.5">
                <input
                  id="file"
                  name="file"
                  type="file"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
                />
              </div>
            </div>
            <div className="flex">
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ml-auto"
              >
                Enviar Cotización
              </button>
            </div>
          </form>
        </div>
        <div className="col-span-2">
          <h2>Historial de Ventas</h2>
          <p className="text-gray-500 mt-2 text-sm">
            Aquí podrás ver el historial de tus ventas.
          </p>
          <div className="mt-6">
            {sales.map((sale) => (
              <Item key={sale.id} sale={sale} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
