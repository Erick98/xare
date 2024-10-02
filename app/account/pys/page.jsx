"use client";
import getWhereList from "@/firebase/firestore/getWhereList";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";
import {
  ArrowUpRightIcon,
  LinkIcon,
  PaperClipIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import getData from "@/firebase/firestore/getData";
import getList from "@/firebase/firestore/getList";
import numeral from "numeral";

const Detail = ({ open, setOpen }) => {
  const [data, setData] = useState({});
  const [images, setImages] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [range, setRange] = useState([]);

  useEffect(() => {
    if (open) {
      getData("pys", open).then((snap) => {
        setData(snap.result.data());
      });
      getList(`/pys/${open}/images`).then((snap) => {
        setImages(snap.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
      getList(`/pys/${open}/documents`).then((snap) => {
        setDocuments(snap.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
      getList(`/pys/${open}/range`).then((snap) => {
        setRange(snap.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
    }
  }, [open]);

  return (
    <Dialog open={!!open} onClose={setOpen} className="relative z-40">
      <div className="fixed inset-0" />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
            >
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="bg-indigo-700 px-4 py-6 sm:px-6">
                  <div className="flex items-center justify-between">
                    <DialogTitle className="text-base font-semibold leading-6 text-white">
                      {data.title}
                    </DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="relative rounded-md bg-indigo-700 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                      >
                        <span className="absolute -inset-2.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-1">
                    <p className="text-sm text-indigo-300">
                      {data.description}
                    </p>
                  </div>
                </div>
                <div className="relative flex-1 px-4 py-6 sm:px-6">
                  <TabGroup className="flex flex-col-reverse">
                    <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                      <TabList className="grid grid-cols-4 gap-6">
                        {images.map((image) => (
                          <Tab
                            key={image.id}
                            className="group relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                          >
                            <span className="sr-only">{image.title}</span>
                            <span className="absolute inset-0 overflow-hidden rounded-md">
                              <img
                                alt={image.title}
                                src={image.url}
                                className="h-full w-full object-cover object-center"
                              />
                            </span>
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute inset-0 rounded-md ring-2 ring-transparent ring-offset-2 group-data-[selected]:ring-indigo-500"
                            />
                          </Tab>
                        ))}
                      </TabList>
                    </div>
                    <TabPanels className="aspect-h-1 aspect-w-1 w-full">
                      {images.map((image) => (
                        <TabPanel key={image.id}>
                          <img
                            alt={image.title}
                            src={image.url}
                            className="h-full w-full object-cover object-center sm:rounded-lg"
                          />
                        </TabPanel>
                      ))}
                    </TabPanels>
                  </TabGroup>
                  <div className="mt-2">
                    <dl className="grid grid-cols-1 sm:grid-cols-2">
                      <div className="border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          Ver {data.type} en mi página
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                          <a
                            className="text-indigo-600 flex items-center underline"
                            href="#"
                          >
                            <LinkIcon className="w-4 h-4 text-indigo-600 mr-2" />
                            <span>Visitar página</span>
                          </a>
                        </dd>
                      </div>
                      <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          Tipo
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                          {data.type}
                        </dd>
                      </div>
                      <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          Disponibilidad
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                          {data.availability}
                        </dd>
                      </div>
                      <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          Relevancia
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                          {data.standout}
                        </dd>
                      </div>
                      <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          Comisión
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                          {data.periodicity}
                        </dd>
                      </div>
                      <div className="border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          Detalle de Comisión
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                          {data.comission}
                        </dd>
                      </div>
                      <div className="border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          Documentos importantes
                        </dt>
                        <dd className="mt-2 text-sm text-gray-900">
                          <ul
                            role="list"
                            className="divide-y divide-gray-100 rounded-md border border-gray-200"
                          >
                            {documents.map((item) => (
                              <li
                                key={item.id}
                                className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6"
                              >
                                <div className="flex w-0 flex-1 items-center">
                                  <PaperClipIcon
                                    aria-hidden="true"
                                    className="h-5 w-5 flex-shrink-0 text-gray-400"
                                  />
                                  <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                    <span className="truncate font-medium">
                                      {item.title}
                                    </span>
                                  </div>
                                </div>
                                <div className="ml-4 flex-shrink-0">
                                  <a
                                    href={item.url}
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                  >
                                    Descargar
                                  </a>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </dd>
                      </div>
                      {data.way === "Directa" && (
                        <div className="border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0">
                          <dt className="text-sm font-medium leading-6 text-gray-900">
                            Precio(s)
                          </dt>
                          <dd className="mt-2 text-sm text-gray-900">
                            <ul
                              role="list"
                              className="divide-y divide-gray-100 rounded-md border border-gray-200"
                            >
                              {range.map((item) => (
                                <li
                                  key={item.id}
                                  className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6"
                                >
                                  <div className="flex w-0 flex-1 items-center">
                                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                      <span className="font-medium">
                                        De {item.from} -{" "}
                                        {item.to === "0"
                                          ? "En Adelante"
                                          : item.to}{" "}
                                        :{" "}
                                        {numeral(item.price).format("$0,0.00")}
                                      </span>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </dd>
                        </div>
                      )}
                      <div className="border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          Formulario de Alta de Cliente
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                          <a
                            className="text-indigo-600 flex items-center underline"
                            href="#"
                          >
                            <LinkIcon className="w-4 h-4 text-indigo-600 mr-2" />
                            <span>Ver formulario</span>
                          </a>
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default function Pys() {
  const [list, setList] = useState([]);
  const [open, setOpen] = useState(false);

  const pysFunction = () => {
    getWhereList("pys", "availability", "==", "Disponible").then((snap) => {
      setList(
        snap.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        })
      );
    });
  };

  useEffect(() => {
    pysFunction();
  }, []);

  return (
    <div className=" max-w-4xl mx-auto">
      <div className="border-b border-gray-200 bg-white py-5">
        <h3 className="text-2xl font-semibold leading-6 text-gray-900">
          Productos y Servicios
        </h3>
        <p className="mt-2 text-md text-gray-500">
          Aquí puedes encontrar todos los productos y servicios que puedes
          comenzar a vender, encuentra toda la información, cómo lo puedes
          comenzar a vender y proceso de alta de cada uno de los clientes.
        </p>
      </div>
      <ul
        role="list"
        className="divide-y divide-gray-100 grid grid-cols-1 md:grid-cols-2"
      >
        {list.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between gap-x-6 py-5 px-2"
            onClick={() => {
              setOpen(item.id);
            }}
          >
            <div className="min-w-0">
              <div className="flex items-start gap-x-3">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {item.title}
                </p>
                {item.standout === "Destacado" && (
                  <p className="text-yellow-800 bg-yellow-50 ring-yellow-600/20 mt-0.5 whitespace-nowrap rounded-md px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset">
                    {item.standout}
                  </p>
                )}
              </div>
              <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                <p className="whitespace-nowrap">Tipo: {item.type}</p>
                <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                  <circle r={1} cx={1} cy={1} />
                </svg>
                <p className="truncate">Comisión: {item.periodicity}</p>
              </div>
            </div>
            <div className="flex flex-none items-center gap-x-4">
              <button
                className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-indigo-600 shadow-sm ring-1 ring-inset ring-indigo-300 hover:bg-indigo-50 sm:block cursor-pointer"
                onClick={() => {
                  setOpen(item.id);
                }}
              >
                Ver información<span className="sr-only">, {item.id}</span>
              </button>
            </div>
          </li>
        ))}
      </ul>
      <Detail open={open} setOpen={setOpen} />
    </div>
  );
}
