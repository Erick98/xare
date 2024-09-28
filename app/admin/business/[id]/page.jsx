"use client";
import EditableField from "@/components/EditableField";
import addData from "@/firebase/firestore/addData";
import deleteDocument from "@/firebase/firestore/deleteDocument";
import getData from "@/firebase/firestore/getData";
import getList from "@/firebase/firestore/getList";
import updateData from "@/firebase/firestore/updateData";
import uploadFile from "@/firebase/storage/uploadFile";
import { PaperClipIcon } from "@heroicons/react/24/outline";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const structure = [
  {
    label: "Título",
    index: "title",
  },
  {
    label: "Nombre de contacto principal",
    index: "main_contact",
  },
  {
    label: "Correo electrónico de contacto principal",
    index: "main_email",
  },
  {
    label: "Teléfono de contacto principal",
    index: "main_phone",
  },
  {
    label: "Dirección",
    index: "address",
  },
  {
    label: "Página Web",
    index: "website_url",
  },
  {
    label: "Estatus",
    index: "status",
    type: "select",
    options: ["pending", "active", "inactive"],
  },
  {
    label: "Fecha de Creación",
    index: "date",
    editable: false,
  },
  {
    label: "Facebook",
    index: "facebook",
  },
  {
    label: "Instagram",
    index: "instagram",
  },
  {
    label: "Twitter",
    index: "twitter",
  },
  {
    label: "TikTok",
    index: "tiktok",
  },
  {
    label: "Descripción corta de la empresa",
    index: "short_description",
  },
  {
    label: "Notas",
    index: "notes",
  },
];

export default function Page() {
  const { id } = useParams();

  const [data, setData] = useState({});
  const [documents, setDocuments] = useState([]);

  const dataFunction = () => {
    getData("business", id).then((snap) => {
      setData(snap.result.data());
    });
  };
  const documentsFunction = () => {
    getList(`business/${id}/documents`).then((snap) => {
      const data = snap.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setDocuments(data);
    });
  };

  const handleCover = (e) => {
    e.preventDefault();
    const { file } = e.target.elements;
    uploadFile(`/business/${id}`, file.files[0]).then((fileSnap) => {
      const { downloadURL } = fileSnap.result;
      updateData("business", id, {
        cover: downloadURL,
      }).then(() => {
        alert("Portada actualizada correctamente");
        e.target.reset();
        dataFunction();
      });
    });
  };

  const handleLogo = (e) => {
    e.preventDefault();
    const { file } = e.target.elements;
    uploadFile(`/business/${id}`, file.files[0]).then((fileSnap) => {
      const { downloadURL } = fileSnap.result;
      updateData("business", id, {
        logo: downloadURL,
      }).then(() => {
        alert("Logo actualizado correctamente");
        e.target.reset();
        dataFunction();
      });
    });
  };

  const handleFile = (e) => {
    e.preventDefault();
    const { title, file } = e.target.elements;
    uploadFile(`/business/${id}`, file.files[0]).then((fileSnap) => {
      const { downloadURL } = fileSnap.result;
      addData(`business/${id}/documents`, {
        title: title.value,
        url: downloadURL,
      }).then(() => {
        alert("Archivo agregado correctamente");
        e.target.reset();
        documentsFunction();
      });
    });
  };

  useEffect(() => {
    if (id) {
      dataFunction();
      documentsFunction();
    }
  }, [id]);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          Información de Empresa
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          Información detallada de la empresa.
        </p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              <p>Logo de la Empresa</p>
              <img src={data.logo} alt="" />
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <form onSubmit={handleLogo} className="flex items-end gap-4">
                <div className="flex-1">
                  <div>
                    <input
                      id="file"
                      name="file"
                      type="file"
                      placeholder="Comprobante de domicilio / Identificación Oficial"
                      className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="flex">
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ml-auto"
                  >
                    Actualizar Logo
                  </button>
                </div>
              </form>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              <p>Portada de la Empresa</p>
              <img src={data.cover} alt="" />
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <form onSubmit={handleCover} className="flex items-end gap-4">
                <div className="flex-1">
                  <div>
                    <input
                      id="file"
                      name="file"
                      type="file"
                      placeholder="Comprobante de domicilio / Identificación Oficial"
                      className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="flex">
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ml-auto"
                  >
                    Actualizar Portada
                  </button>
                </div>
              </form>
            </dd>
          </div>
          {structure.map((field) => (
            <EditableField
              collection="business"
              key={field.index}
              data={data}
              field={field}
              dataFunction={dataFunction}
              id={id}
            />
          ))}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Agregar Documentación
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <form onSubmit={handleFile} className="grid grid-cols-1 gap-4">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Título de Archivo
                  </label>
                  <div className="mt-2">
                    <input
                      id="title"
                      name="title"
                      type="text"
                      placeholder="Comprobante de domicilio / Identificación Oficial"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="file"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Archivo
                  </label>
                  <div className="mt-2">
                    <input
                      id="file"
                      name="file"
                      type="file"
                      placeholder="Comprobante de domicilio / Identificación Oficial"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="flex">
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ml-auto"
                  >
                    Agregar Archivo
                  </button>
                </div>
              </form>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Documentos de la empresa
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <ul
                role="list"
                className="divide-y divide-gray-100 rounded-md border border-gray-200"
              >
                {documents.map((doc, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6"
                  >
                    <div className="flex w-0 flex-1 items-center">
                      <PaperClipIcon
                        aria-hidden="true"
                        className="h-5 w-5 flex-shrink-0 text-gray-400"
                      />
                      <div className="ml-4 flex min-w-0 flex-1 gap-2">
                        <span className="truncate font-medium">
                          {doc.title}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4 flex flex-shrink-0 space-x-4">
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Descargar
                      </a>
                      <span aria-hidden="true" className="text-gray-200">
                        |
                      </span>
                      <button
                        type="button"
                        className="rounded-md bg-white font-medium text-red-900 hover:text-red-800"
                        onClick={() => {
                          deleteDocument(
                            `business/${id}/documents`,
                            doc.id
                          ).then(() => {
                            alert("Archivo eliminado correctamente");
                            documentsFunction();
                          });
                        }}
                      >
                        Eliminar
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
