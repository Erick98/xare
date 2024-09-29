"use client";
import { useAuthContext } from "@/context/AuthContext";
import addData from "@/firebase/firestore/addData";
import { getItem } from "@/firebase/firestore/getItem";
import updateData from "@/firebase/firestore/updateData";
import uploadFile from "@/firebase/storage/uploadFile";
import { CubeIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Label,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import getWhereList from "@/firebase/firestore/getWhereList";

export default function Page() {
  const { user } = useAuthContext();

  const [userData, setUserData] = useState({});
  const [site, setSite] = useState(null);
  const [logo, setLogo] = useState(null);
  const [list, setList] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState([]);
  const [landings, setLandings] = useState([]);

  const userFunction = () => {
    getItem("users", user.uid).then((data) => {
      setUserData(data);
    });
  };
  const siteFunction = () => {
    getItem("sites", userData.site).then((data) => {
      setSite(data);
    });
  };
  const landingsFunction = () => {
    getWhereList("landings", "site", "==", userData.site).then((snap) => {
      setLandings(
        snap.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        })
      );
    });
  };
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
    if (user.uid) {
      userFunction();
    } else {
      window.location.href = "/";
    }
  }, [user]);
  useEffect(() => {
    if (userData.site) {
      siteFunction();
      pysFunction();
      landingsFunction();
    }
  }, [userData]);

  const filteredList =
    query === ""
      ? list
      : list.filter((item) => {
          return item.title.toLowerCase().includes(query.toLowerCase());
        });

  const handleSubdomain = async (e) => {
    e.preventDefault();
    const { name, subdomain } = e.target.elements;
    const data = {
      name: name.value,
      subdomain: subdomain.value,
    };
    addData("sites", data).then((id) => {
      updateData("users", user.uid, { site: id }).then(() => {
        userFunction();
      });
    });
  };
  const handleLogo = () => {
    uploadFile(`/sites/${userData.site}`, logo).then((fileSnap) => {
      const { downloadURL } = fileSnap.result;
      updateData("sites", userData.site, {
        logo: downloadURL,
      }).then(() => {
        alert("Logo actualizado correctamente");
        siteFunction();
      });
    });
  };
  const handleCover = (e) => {
    const file = e.target.files[0];
    uploadFile(`/sites/${userData.site}`, file).then((fileSnap) => {
      const { downloadURL } = fileSnap.result;
      updateData("sites", userData.site, {
        cover: downloadURL,
      }).then(() => {
        alert("Portada actualizada correctamente");
        siteFunction();
      });
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      title,
      description,
      phone,
      email,
      facebook,
      instagram,
      twitter,
      tiktok,
    } = e.target.elements;
    const data = {
      title: title.value,
      description: description.value,
      phone: phone.value,
      email: email.value,
      facebook: facebook.value,
      instagram: instagram.value,
      twitter: twitter.value,
      tiktok: tiktok.value,
    };
    updateData("sites", userData.site, data).then(() => {
      alert("Datos actualizados correctamente");
      siteFunction();
    });
  };

  const handleLanding = (e) => {
    e.preventDefault();
    const { title, description, content, cover } = e.target.elements;
    const data = {
      title: title.value,
      description: description.value,
      content: content.value,
      pys: selectedItem.map((item) => item.id),
      site: userData.site,
    };
    addData("landings", data).then((id) => {
      uploadFile(`/landings/${id}`, cover.files[0]).then((fileSnap) => {
        const { downloadURL } = fileSnap.result;
        updateData("landings", id, {
          cover: downloadURL,
        }).then(() => {
          alert("Página de aterrizaje creada correctamente");
          landingsFunction();
        });
      });
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 divide-x gap-4">
      <div className="px-4">
        <h2 className="text-lg font-semibold leading-7 text-gray-900">
          Comienza a editar tu página web
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600 text-justify">
          Completa la siguiente información para comenzar a vender en minutos,
          esta es tu marca personal, puedes orientarla a hablar acerca de ti o
          si prefieres, puedes crearla con una imagen corporativa que represente
          tus ideales y valores. Recuerda que esta es tu oportunidad de mostrar
          al mundo quién eres y por qué eres la mejor opción para atender a tus
          clientes.
        </p>
        {!site ? (
          <form onSubmit={handleSubdomain}>
            <div className="col-span-full mt-6">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Nombre del Sitio
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Nombre del Sitio"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="col-span-full mt-4">
              <label
                htmlFor="subdomain"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Subdominio
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                    https://
                  </span>
                  <input
                    id="subdomain"
                    name="subdomain"
                    type="text"
                    placeholder="misuperempresa"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                  <span className="flex select-none items-center pr-3 text-gray-500 sm:text-sm">
                    xare.io
                  </span>
                </div>
              </div>
              <p
                id="subdomain-description"
                className="mt-2 text-sm text-gray-500"
              >
                Este será el subdominio de tu página web, debe ser único y que
                identifique tu marca personal. Recuerda que no puedes cambiarlo
                después.
              </p>
            </div>
            <div className="mt-4 flex items-center justify-end gap-x-6">
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Establecer
              </button>
            </div>
          </form>
        ) : (
          <div className="mt-6">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              {site.name}
            </h2>
            <a
              href={`https://${site.subdomain}.xare.io`}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-1 text-sm leading-6 text-indigo-600"
            >
              https://{site.subdomain}.xare.io
            </a>
          </div>
        )}
        <hr className="mt-8" />
        {site && (
          <form onSubmit={handleSubmit}>
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="col-span-full">
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Encabezado principal de tu página
                    </label>
                    <div className="mt-2">
                      <input
                        id="title"
                        name="title"
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        defaultValue={site.title}
                      />
                    </div>
                  </div>
                  <div className="col-span-full">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Descripción
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="description"
                        name="description"
                        rows={3}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        defaultValue={site.description}
                      />
                    </div>
                    <p className="mt-3 text-sm leading-6 text-gray-600">
                      Describe tu sitio y tu empresa en pocas palabras, esta
                      será la descripción principal, lo primero que verán tus
                      clientes potenciales al entrar a tu sitio.
                    </p>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="logo"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Logo del sitio
                    </label>
                    <div className="mt-2 flex items-center gap-x-3">
                      <label htmlFor="logo">
                        {site.logo ? (
                          <img className="w-12" src={site.logo} alt="" />
                        ) : (
                          <CubeIcon
                            aria-hidden="true"
                            className="h-12 w-12 text-gray-300 cursor-pointer"
                          />
                        )}
                      </label>
                      <input
                        onChange={(e) => {
                          setLogo(e.target.files[0]);
                        }}
                        type="file"
                        name="logo"
                        id="logo"
                        className="sr-only"
                      />
                      <button
                        type="button"
                        className={`rounded-md px-2.5 py-1.5 text-sm font-semibold shadow-sm ring-1 ring-inset ${
                          logo
                            ? "ring-indigo-300 hover:bg-indigo-50 bg-indigo-50 cursor-pointer text-indigo-600"
                            : "ring-gray-300 hover:bg-gray-50 bg-white cursor-default text-gray-900"
                        }`}
                        disabled={!logo}
                        onClick={handleLogo}
                      >
                        Estabecer Logo
                      </button>
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="cover-photo"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Portada del sitio
                    </label>
                    <div className="relative mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                      <img
                        alt=""
                        src={site.cover}
                        className="absolute inset-0 -z-10 h-full w-full object-cover rounded-lg opacity-30"
                      />
                      <div className="text-center">
                        <PhotoIcon
                          aria-hidden="true"
                          className="mx-auto h-12 w-12 text-gray-300 opacity-40"
                        />
                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md bg-white/40 px-2 font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                          >
                            <span>Subir portada</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                              onChange={handleCover}
                            />
                          </label>
                          <p className="pl-1">o arrastra y suelta</p>
                        </div>
                        <p className="text-xs leading-5 text-gray-600">
                          PNG, JPG
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Datos de Contacto
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Establece tus medios de contacto, aquí te contactarán tus
                  clientes y será la información visible tu sitio.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Teléfono
                    </label>
                    <div className="mt-2">
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        defaultValue={site.phone}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        defaultValue={site.email}
                      />
                    </div>
                  </div>
                </div>
                <h2 className="text-base font-semibold leading-7 text-gray-900 mt-12">
                  Redes Sociales
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Puedes crear unas redes sociales para tu sitio o establecer
                  tus redes sociales personales.
                </p>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="facebook"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Facebook
                    </label>
                    <div className="mt-2">
                      <input
                        id="facebook"
                        name="facebook"
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        defaultValue={site.facebook}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="instagram"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Instagram
                    </label>
                    <div className="mt-2">
                      <input
                        id="instagram"
                        name="instagram"
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        defaultValue={site.instagram}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="twitter"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Twitter (X)
                    </label>
                    <div className="mt-2">
                      <input
                        id="twitter"
                        name="twitter"
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        defaultValue={site.twitter}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="tiktok"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      TikTok
                    </label>
                    <div className="mt-2">
                      <input
                        id="tiktok"
                        name="tiktok"
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        defaultValue={site.tiktok}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Guardar Cambios
              </button>
            </div>
          </form>
        )}
      </div>
      <div className="px-4">
        <h2 className="text-lg font-semibold leading-7 text-gray-900">
          Crear nueva página de aterrizaje
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600 text-justify">
          Recuerda que no puedes editar las páginas una vez creadas pero puedes
          crear y eliminar páginas todas las veces que lo necesites.
        </p>
        <form onSubmit={handleLanding} className="mt-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Título
            </label>
            <div className="mt-2">
              <input
                id="title"
                name="title"
                type="text"
                placeholder="Título de la página"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="mt-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Descripción de página de aterrizaje (Este texto aparecerá al
              principio de la página)
            </label>
            <div className="mt-2">
              <textarea
                id="description"
                name="description"
                rows={3}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="mt-4">
            <label
              htmlFor="cover"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Portada
            </label>
            <div className="relative mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                <PhotoIcon
                  aria-hidden="true"
                  className="mx-auto h-12 w-12 text-gray-300 opacity-40"
                />
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="cover"
                    className="relative cursor-pointer rounded-md bg-white/40 px-2 font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <span>Subir portada</span>
                    <input
                      id="cover"
                      name="cover"
                      type="file"
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">o arrastra y suelta</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">PNG, JPG</p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <label
              htmlFor="content"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Contenido, texto de presentación de los productos y/o servicios
              seleccionados
            </label>
            <div className="mt-2">
              <textarea
                id="content"
                name="content"
                rows={6}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="mt-4">
            <Combobox
              as="div"
              value={selectedItem}
              onChange={setSelectedItem}
              onClose={() => setQuery("")}
              multiple
            >
              <Label className="block text-sm font-medium leading-6 text-gray-900">
                Selecciona los productos y servicios que aparecerán en la página
              </Label>

              <div className="relative mt-2">
                <ComboboxInput
                  className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(event) => setQuery(event.target.value)}
                  onBlur={() => setQuery("")}
                  displayValue={(item) => item?.title}
                />
                <ComboboxButton className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </ComboboxButton>

                {filteredList.length > 0 && (
                  <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {filteredList.map((item) => (
                      <ComboboxOption
                        key={item.id}
                        value={item}
                        className="group relative cursor-default select-none py-2 pl-8 pr-4 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
                      >
                        <span className="block truncate group-data-[selected]:font-semibold">
                          {item.title}
                        </span>

                        <span className="absolute inset-y-0 left-0 hidden items-center pl-1.5 text-indigo-600 group-data-[selected]:flex group-data-[focus]:text-white">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      </ComboboxOption>
                    ))}
                  </ComboboxOptions>
                )}
              </div>
              {selectedItem.length > 0 && (
                <ul className="flex flex-col gap-2 mt-2">
                  {selectedItem.map((item) => (
                    <li
                      className="p-1 border border-indigo-600 bg-indigo-50 text-indigo-600 rounded-md flex items-center"
                      key={item.id}
                    >
                      <span className="flex-1">{item.title}</span>
                      <button
                        onClick={() =>
                          setSelectedItem(
                            selectedItem.filter((i) => i.id !== item.id)
                          )
                        }
                        className="cursor-pointer p-1"
                        type="button"
                      >
                        <XMarkIcon className="h-4 w-4 text-indigo-600" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </Combobox>
          </div>
          <div className="mt-4 flex">
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ml-auto"
            >
              Crear Página
            </button>
          </div>
        </form>
      </div>
      <div className="px-4">
        <h2 className="text-lg font-semibold leading-7 text-gray-900">
          Mis páginas de aterrizaje
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600 text-justify">
          Aquí encontrarás las páginas que has creado, puedes copiar y pegar el
          link o ir directamente a la página, da doble click para eliminar
          alguna página.
        </p>
        <div className="mt-4 grid grid-cols-1 gap-y-4">
          {landings.map((landing) => (
            <div
              key={landing.id}
              className="p-4 border border-gray-900/10 rounded-md"
            >
              <h3 className="text-base font-semibold leading-6 text-gray-900">
                {landing.title}
              </h3>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                {landing.description}
              </p>
              <a
                href={`https://${site.subdomain}.xare.io/landing/${landing.id}`}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-1 text-sm leading-6 text-indigo-600"
              >
                https://{site.subdomain}.xare.io/landing/{landing.id}
              </a>
              <div className="mt-4 flex">
                <button
                  className="text-sm font-semibold text-white bg-red-700 px-2 py-1 rounded ml-auto cursor-pointer"
                  onDoubleClick={() => {
                    if (
                      confirm(
                        "¿Estás seguro de que deseas eliminar esta página?"
                      )
                    ) {
                      alert("Página eliminada correctamente");
                    }
                  }}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
