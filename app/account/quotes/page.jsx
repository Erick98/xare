"use client";
import { useAuthContext } from "@/context/AuthContext";
import addData from "@/firebase/firestore/addData";
import getData from "@/firebase/firestore/getData";
import getList from "@/firebase/firestore/getList";
import getQuotes from "@/firebase/firestore/getQuotes";
import updateData from "@/firebase/firestore/updateData";
import uploadFile from "@/firebase/storage/uploadFile";
import { onSnapshot } from "firebase/firestore";
import numeral from "numeral";
import { useEffect, useState } from "react";

const statuses = ["pending", "quoted", "sended", "success", "canceled"];

const Item = ({ quote, status }) => {
  const [customer, setCustomer] = useState({});
  const [pys, setPys] = useState({});
  const [fields, setFields] = useState([]);
  const [sale, setSale] = useState(null);

  const customerFunction = () => {
    getData("customers", quote.customer).then((snap) => {
      setCustomer(snap.result.data());
    });
  };
  const pysFunction = () => {
    getData("pys", quote.pys).then((snap) => {
      setPys(snap.result.data());
    });
  };
  const fieldsFunction = () => {
    getList(`pys/${quote.pys}/fields`).then((snap) => {
      const list = snap.docs.map((item) => ({ ...item.data(), id: item.id }));
      setFields(list);
    });
  };
  const saleFunction = () => {
    if (quote.sale) {
      getData("sales", quote.sale).then((snap) => {
        setSale(snap.result.data());
      });
    }
  };

  useEffect(() => {
    if (quote.customer) {
      customerFunction();
    }
  }, [quote.customer]);
  useEffect(() => {
    if (quote.pys) {
      pysFunction();
      fieldsFunction();
    }
  }, [quote.pys]);
  useEffect(() => {
    if (quote.sale) {
      saleFunction();
    }
  }, [quote.sale]);

  const handleQuoted = (event) => {
    event.preventDefault();
    updateData("quotes", quote.id, {
      status: "sended",
    }).then(() => {
      alert("Cotización enviada");
    });
  };
  const handleSended = (status) => (event) => {
    event.preventDefault();
    updateData("quotes", quote.id, {
      status,
    }).then(() => {
      alert("Cliente actualizado");
    });
  };
  const handleSale = (event) => {
    event.preventDefault();
    const { amount, file } = event.target.elements;
    uploadFile(`/sales/${quote.id}`, file.files[0]).then((fileSnap) => {
      addData("sales", {
        amount: amount.value,
        file: fileSnap.result.downloadURL,
        quote: quote.id,
        date: new Date().valueOf(),
        customer: quote.customer,
        site: quote.site,
        business: quote.business,
        pys: quote.pys,
        status: "pending",
      }).then((saleId) => {
        updateData("quotes", quote.id, {
          status: "success",
          sale: saleId,
        }).then(() => {
          alert("Venta registrada");
        });
      });
    });
  };

  return (
    <div className="bg-white rounded-lg p-4 w-full text-sm flex flex-col gap-2 max-h-44 overflow-y-auto shadow-lg">
      <p>{customer.name}</p>
      <p>{customer.email}</p>
      <p>{customer.phone}</p>
      <p>{pys.title}</p>
      <p className="text-center mt-4 font-black">Respuestas al formulario</p>
      <ul className="list-outside ml-4 list-disc text-xs">
        {fields.map((field) => (
          <li className="mt-2" key={field.id}>
            <p className="font-bold">{field.title}:</p>
            <p>{quote[field.id]}</p>
          </li>
        ))}
      </ul>
      {status === "quoted" && (
        <>
          <hr className="mt-6" />
          <div className="mt-4">
            <p>
              <b>Precio Final:</b> {numeral(quote.amount).format("$0,0.00")}
            </p>
            <div className="mt-4">
              <a
                href={quote.quote}
                target="_blank"
                rel="noreferrer"
                className="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
              >
                Descargar cotización
              </a>
            </div>
          </div>
          <hr className="mt-4" />
          <div className="flex flex-col gap-2 mt-6">
            <button
              onDoubleClick={handleQuoted}
              className="bg-green-500 text-white rounded-md p-2 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Confirmar envío de cotización
            </button>
          </div>
        </>
      )}
      {status === "sended" && (
        <>
          <div className="mt-4">
            <p>
              <b>Precio Final:</b> {numeral(quote.amount).format("$0,0.00")}
            </p>
            <div className="mt-4">
              <a
                href={quote.quote}
                target="_blank"
                rel="noreferrer"
                className="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
              >
                Descargar cotización
              </a>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
            <button
              onDoubleClick={handleSended("success")}
              className="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Cliente exitoso
            </button>
            <button
              onDoubleClick={handleSended("canceled")}
              className="bg-red-500 text-white rounded-md p-2 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Cliente cancelado
            </button>
          </div>
        </>
      )}

      {status === "success" && (
        <>
          <div className="mt-4">
            <p>
              <b>Precio Final:</b> {numeral(quote.amount).format("$0,0.00")}
            </p>
            <div className="mt-4">
              <a
                href={quote.quote}
                target="_blank"
                rel="noreferrer"
                className="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
              >
                Descargar cotización
              </a>
            </div>
          </div>
          <hr className="mt-4" />
          {!sale ? (
            <div className="mt-4">
              <p>Agrega tu venta para registrar tu comisión más rápdio.</p>
              <form
                className="mt-4 grid grid-cols-1 gap-4"
                onSubmit={handleSale}
              >
                <div>
                  <label
                    htmlFor="amount"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    Monto Total de Venta (Monto de pago)
                  </label>
                  <div className="mt-2.5">
                    <input
                      id="amount"
                      name="amount"
                      type="number"
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="file"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    Comprobante de Pago
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
                    Registrar Venta
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="mt-4">
              <p>La venta ya fue registrada.</p>
              <p>
                <b>Monto Total de Venta:</b>{" "}
                {numeral(sale.amount).format("$0,0.00")}
              </p>
              <div className="mt-4">
                <a
                  href={sale.file}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
                >
                  Comprobante de pago
                </a>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default function Page() {
  const { user } = useAuthContext();

  const [userData, setUserData] = useState({});
  const [site, setSite] = useState(null);
  const [quotes, setQuotes] = useState([]);

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
  const quotesFunction = () => {
    onSnapshot(getQuotes(userData.site), (snap) => {
      const data = snap.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setQuotes(data);
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
      quotesFunction();
    }
  }, [userData.site]);

  return (
    <div>
      <h1>Cotizaciones</h1>
      <p>{site && site.name}</p>
      <div className="grid grid-cols-1 md:grid-cols-5 overflow-x-scroll p-4 gap-6">
        {statuses.map((item) => (
          <div
            key={item}
            className="flex flex-col items-center justify-start p-4 border border-gray-200 shadow-lg rounded"
          >
            <p>
              {item === "pending"
                ? "PENDIENTES"
                : item === "quoted"
                ? "COTIZADAS"
                : item === "sended"
                ? "ENVIADAS"
                : item === "success"
                ? "EXITOSAS"
                : item === "canceled"
                ? "CANCELADAS"
                : ""}
            </p>
            <hr className="my-4 border-gray-200 w-full" />
            {quotes
              .filter((quote) => quote.status === item)
              .map((quote) => (
                <Item key={quote.id} quote={quote} status={item} />
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
