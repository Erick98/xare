"use client";

import addData from "@/firebase/firestore/addData";

export default function BusinessForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      title,
      sector,
      main_contact,
      main_email,
      main_phone,
      address,
      website_url,
    } = e.target.elements;

    addData("business", {
      title: title.value,
      sector: Array.from(sector.selectedOptions).map((option) => option.value),
      main_contact: main_contact.value,
      main_email: main_email.value,
      main_phone: main_phone.value,
      address: address.value,
      website_url: website_url.value,
      status: "pending",
      date: new Date().valueOf(),
    }).then((id) => {
      window.location.href = `/admin/business/${id}`;
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
          htmlFor="sector"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Sector
        </label>
        <select
          id="sector"
          name="sector"
          className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
          required
          multiple={true}
          defaultValue={[]}
        >
          <option>agricultura</option>
          <option>alimentos y bebidas</option>
          <option>automotriz</option>
          <option>belleza</option>
          <option>comunicaciones</option>
          <option>construcción</option>
          <option>cursos</option>
          <option>deportes</option>
          <option>educación</option>
          <option>energía</option>
          <option>entretenimiento</option>
          <option>financiero</option>
          <option>ganadería</option>
          <option>hogar</option>
          <option>inmobiliario</option>
          <option>mantenimiento y reparaciones</option>
          <option>minería</option>
          <option>moda</option>
          <option>pesca</option>
          <option>restaurantero</option>
          <option>salud</option>
          <option>servicios profesionales</option>
          <option>tecnología</option>
          <option>transporte</option>
          <option>turístico</option>
          <option>venta mayorista</option>
          <option>venta minorista</option>
          <option>agua</option>
          <option>otro</option>
        </select>
      </div>
      <div className="mb-4">
        <label
          htmlFor="main_contact"
          className="block text-sm font-medium text-gray-700"
        >
          Nombre de contacto principal
        </label>
        <input
          type="text"
          name="main_contact"
          id="main_contact"
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="main_email"
          className="block text-sm font-medium text-gray-700"
        >
          Correo electrónico de contacto principal
        </label>
        <input
          type="email"
          name="main_email"
          id="main_email"
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="main_phone"
          className="block text-sm font-medium text-gray-700"
        >
          Teléfono de contacto principal
        </label>
        <input
          type="text"
          name="main_phone"
          id="main_phone"
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="address"
          className="block text-sm font-medium text-gray-700"
        >
          Dirección
        </label>
        <input
          type="text"
          name="address"
          id="address"
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="website_url"
          className="block text-sm font-medium text-gray-700"
        >
          Página Web
        </label>
        <input
          type="text"
          name="website_url"
          id="website_url"
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
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
