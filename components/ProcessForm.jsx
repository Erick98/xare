"use client";
import { useEffect, useState } from "react";
import Field from "./Field";
import _ from "lodash";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import addData from "@/firebase/firestore/addData";

const StepZero = ({ handleSubmit, data }) => {
  return (
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
            defaultValue={data.name}
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
            defaultValue={data.email}
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
            defaultValue={data.phone}
          />
        </div>
      </div>
      <div>
        <button
          type="submit"
          className="mt-4 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Continuar
        </button>
      </div>
    </form>
  );
};

const StepOne = ({ handleSubmit, fields, data, prevStep }) => {
  const [selecteds, setSelecteds] = useState({});

  const handleSelect = (option, fieldId) => {
    if (selecteds[fieldId]) {
      if (_.find(selecteds[fieldId], option)) {
        setSelecteds({
          ...selecteds,
          [fieldId]: selecteds[fieldId].filter(
            (selected) => selected !== option
          ),
        });
      } else {
        setSelecteds({
          ...selecteds,
          [fieldId]: [...selecteds[fieldId], option],
        });
      }
    } else {
      setSelecteds({
        ...selecteds,
        [fieldId]: [option],
      });
    }
  };

  return (
    <form
      className="relative flex-1 px-4 sm:px-6 grid grid-cols-1 gap-4"
      onSubmit={(e) => handleSubmit(e, selecteds)}
    >
      <div className="flex">
        <button
          type="button"
          onClick={prevStep}
          className="mt-4 flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-2 py-2 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mr-auto"
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </button>
      </div>
      {fields.map((field) =>
        field.type !== "multiselect" ? (
          <Field defaultValue={data[field.id]} key={field.id} item={field} />
        ) : (
          <ul
            key={field.id}
            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
            {field.options.map((option) => (
              <li
                className="cursor-pointer hover:bg-gray-100 text-gray-900 px-4 py-2 text-sm flex justify-between items-center border-b border-gray-200 last:border-b-0 transition-colors duration-200 ease-in-out hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-opacity-50"
                onClick={() => handleSelect(option, field.id)}
                key={option}
              >
                <span className="flex-1">{option}</span>
                {selecteds[field.id] && _.find(selecteds[field.id], option) && (
                  <span className="text-indigo-600">✓</span>
                )}
              </li>
            ))}
          </ul>
        )
      )}
      <div>
        <button
          type="submit"
          className="mt-4 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Continuar
        </button>
      </div>
    </form>
  );
};

const StepTwo = ({ site }) => {
  return (
    <div>
      <div>
        <h2 className="text-center text-3xl font-bold text-gray-900">
          Gracias por tu interés
        </h2>
        <p className="mt-4 text-lg text-center text-gray-700">
          Te contactaremos en un momento para proporcionarte una propuesta
          económica adecuada a tus necesidades.
        </p>
        <p className="mt-2 text-lg text-center text-gray-700">
          Conoce todos nuestros servicios{" "}
          <a className="text-indigo-600" href="/">
            aquí
          </a>
          .
        </p>
        <hr className="mt-4" />
        <p className="text-center mt-4 text-xl text-gray-900 underline">
          ¿Necesitas más información?
        </p>
        <p className="text-center mt-2 text-lg text-gray-700">
          Contáctanos por WhatsApp para recibir más información detallada{" "}
          <a className="text-indigo-600" href={`https://wa.me/52${site.phone}`}>
            {site.phone}
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default function ProcessForm({ site, pys, fields }) {
  const [step, setStep] = useState(0);
  const [customer, setCustomer] = useState({});
  const [formData, setFormData] = useState({});

  const nextStep = () => {
    setStep(step + 1);
  };
  const prevStep = () => {
    setStep(step - 1);
  };
  const submitCustomer = (event) => {
    event.preventDefault();
    const { name, email, phone } = event.target.elements;
    setCustomer({
      name: name.value,
      email: email.value,
      phone: phone.value,
    });
    nextStep();
  };
  const submitForm = (event, selecteds) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    const fullData = { ...data, ...selecteds };
    if (pys.way === "Directa") {
      setFormData(fullData);
      nextStep();
    } else {
      addData("customers", {
        ...customer,
        site: site.id,
        date: new Date().valueOf(),
      }).then((id) => {
        addData("quotes", {
          ...data,
          customer: id,
          date: new Date().valueOf(),
          site: site.id,
          pys: pys.id,
          business: pys.business,
        }).then(() => {
          nextStep();
        });
      });
    }
  };

  return (
    <div>
      {step === 0 && <StepZero data={customer} handleSubmit={submitCustomer} />}
      {step === 1 && (
        <StepOne
          prevStep={prevStep}
          data={formData}
          handleSubmit={submitForm}
          fields={fields}
        />
      )}
      {step === 2 && <StepTwo site={site} />}
    </div>
  );
}
