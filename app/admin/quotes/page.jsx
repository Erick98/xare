"use client";
import getData from "@/firebase/firestore/getData";
import getDataRt from "@/firebase/firestore/getDataRt";
import getList from "@/firebase/firestore/getList";
import updateData from "@/firebase/firestore/updateData";
import uploadFile from "@/firebase/storage/uploadFile";
import { onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

const statuses = ["pending", "quoted", "sended", "success", "canceled"];

const Item = ({ quote, status }) => {
  const [customer, setCustomer] = useState({});
  const [pys, setPys] = useState({});
  const [fields, setFields] = useState([]);

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

  const handlePending = (event) => {
    event.preventDefault();
    const { amount, file } = event.target.elements;
    uploadFile(`/quotes/${quote.id}`, file.files[0]).then((fileSnap) => {
      updateData("quotes", quote.id, {
        status: "quoted",
        amount: amount.value,
        quote: fileSnap.result.downloadURL,
      }).then(() => {
        alert("Cotización enviada");
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
      {status === "pending" && (
        <>
          <hr className="mt-4" />
          <form
            className="grid grid-cols-1 gap-4 mt-4"
            onSubmit={handlePending}
          >
            <div>
              <label
                htmlFor="amount"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Monto Total
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
        </>
      )}
    </div>
  );
};

export default function Page() {
  const [quotes, setQuotes] = useState([]);

  const quotesFunction = () => {
    onSnapshot(getDataRt("quotes"), (snap) => {
      const data = snap.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setQuotes(data);
    });
  };

  useEffect(() => {
    quotesFunction();
  }, []);

  return (
    <div>
      <h1>Cotizaciones</h1>
      <div className="grid grid-cols-5 overflow-x-scroll p-4 gap-6">
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
