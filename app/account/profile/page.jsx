"use client";

import { useAuthContext } from "@/context/AuthContext";
import getData from "@/firebase/firestore/getData";
import updateData from "@/firebase/firestore/updateData";
import uploadFile from "@/firebase/storage/uploadFile";
import { useEffect, useState } from "react";

export default function Page() {
  const { user } = useAuthContext();
  const [userData, setUserData] = useState({});

  const userFunction = () => {
    getData("users", user.uid).then((snap) => {
      setUserData(snap.result.data());
    });
  };

  useEffect(() => {
    if (user.uid) {
      userFunction();
    }
  }, [user.uid]);

  const handleProfile = (e) => {
    e.preventDefault();
    const { file } = e.target.elements;
    uploadFile(`/users/${user.uid}`, file.files[0]).then((fileSnap) => {
      const { downloadURL } = fileSnap.result;
      updateData("users", user.uid, {
        profile: downloadURL,
      }).then(() => {
        alert("Foto de perfil actualizada correctamente.");
        e.target.reset();
        userFunction();
      });
    });
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div>
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Perfil
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-500">
          Completa la información de tu perfil.
        </p>

        <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              <p>Foto de Perfil</p>
              <img src={userData.profile} alt="" />
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <form onSubmit={handleProfile} className="flex items-end gap-4">
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
                    Actualizar Foto de Perfil
                  </button>
                </div>
              </form>
            </dd>
          </div>
          <div className="pt-6 sm:flex">
            <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
              Nombre Completo
            </dt>
            <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
              <div className="text-gray-900">{userData.name}</div>
            </dd>
          </div>
          <div className="pt-6 sm:flex">
            <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
              Nombre de Usuario
            </dt>
            <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
              <div className="text-gray-900">{userData.username}</div>
            </dd>
          </div>
          <div className="pt-6 sm:flex">
            <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
              Email
            </dt>
            <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
              <div className="text-gray-900">{userData.email}</div>
            </dd>
          </div>
          <div className="pt-6 sm:flex">
            <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
              Teléfono
            </dt>
            <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
              <div className="text-gray-900">{userData.phone}</div>
            </dd>
          </div>
          <div className="pt-6 sm:flex">
            <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
              Estatus
            </dt>
            <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
              <div className="text-gray-900">
                {userData.status === "active"
                  ? "Activo"
                  : userData.status === "inactive"
                  ? "Inactivo"
                  : "Pendiente"}
              </div>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
