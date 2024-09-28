"use client";

import addData from "@/firebase/firestore/addData";
import getList from "@/firebase/firestore/getList";
import { useEffect, useState } from "react";

export default function PysForm() {
  const [list, setList] = useState([]);

  useEffect(() => {
    getList("business").then((snap) => {
      setList(
        snap.docs.map((doc) => ({ id: doc.id, title: doc.data().title }))
      );
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, type, description, availability, business, periodicity } =
      e.target.elements;

    addData("pys", {
      title: title.value,
      type: type.value,
      description: description.value,
      availability: availability.value,
      business: business.value,
      periodicity: periodicity.value,
      date: new Date().valueOf(),
    }).then((id) => {
      // window.location.href = `/admin/pys/${id}`;
      alert("Elemento agregado");
      e.target.reset();
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8">
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Título
        </label>
        <input
          type="text"
          name="title"
          id="title"
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="type"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Tipo
        </label>
        <select
          id="type"
          name="type"
          className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
          required
        >
          <option>** Selecciona una opción **</option>
          <option>Producto</option>
          <option>Servicio</option>
        </select>
      </div>
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Descripción
        </label>
        <textarea
          name="description"
          id="description"
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="availability"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Disponibilidad
        </label>
        <select
          id="availability"
          name="availability"
          className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
          required
        >
          <option>** Selecciona una opción **</option>
          <option>Disponible</option>
          <option>No Disponible</option>
        </select>
      </div>
      <div className="mb-4">
        <label
          htmlFor="business"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Empresa
        </label>
        <select
          id="business"
          name="business"
          className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
          required
        >
          <option>** Selecciona una opción **</option>
          {list.map((item) => (
            <option key={item.id} value={item.id}>
              {item.title}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label
          htmlFor="periodicity"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Periodicidad
        </label>
        <select
          id="periodicity"
          name="periodicity"
          className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
          required
        >
          <option>** Selecciona una opción **</option>
          <option>Pago Único</option>
          <option>Pago Recurrente</option>
        </select>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Agregar
        </button>
      </div>
    </form>
  );
}
