"use client";
import { useAuthContext } from "@/context/AuthContext";
import getData from "@/firebase/firestore/getData";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";

export default function Page() {
  const { user } = useAuthContext();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (user.uid) {
      getData("users", user.uid).then((snap) => {
        setUserData(snap.result.data());
      });
    }
  }, [user]);

  return (
    <div className="bg-white px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
        <p className="text-base font-semibold leading-7 text-indigo-600">
          ¡Bienvenid@ a Xare!
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          ¡Hola {userData.name}, ya eres parte de nuestro equipo!
        </h1>
        <p className="mt-6 text-xl leading-8">
          Nos alegra tenerte con nosotros. Es momento de comenzar a trabajar en
          tus objetivos profesionales y financieros. Con Xare, puedes crear tu
          propio negocio en minutos y empezar a vender productos y servicios de
          tu interés, proporcionados por empresas profesionales y verificadas,
          garantizando así la satisfacción de tus clientes.
        </p>
        <div className="mt-10 max-w-2xl">
          <h2 className="text-2xl font-bold tracking-tight text-gray-800 sm:text-3xl">
            ¿Cómo comenzar?
          </h2>
          <p>
            Para ayudarte a sacar el máximo provecho de la plataforma y
            brindarte las mejores herramientas en ventas, marketing y
            tecnología, te recomendamos seguir estos pasos:
          </p>
          <ul role="list" className="mt-8 max-w-xl space-y-8 text-gray-600">
            <li className="flex gap-x-3">
              <CheckCircleIcon
                aria-hidden="true"
                className="mt-1 h-5 w-5 flex-none text-indigo-600"
              />
              <span>
                <strong className="font-semibold text-gray-900">
                  ¡Ya tienes acceso!
                </strong>{" "}
                Nuestra prioridad es darte un trato personalizado y guiarte
                durante tu primera experiencia en nuestra plataforma. No dudes
                en contactarnos en cualquier momento:
                <ol className="list-decimal list-inside">
                  <li>
                    <b>Escríbenos a:</b>{" "}
                    <a
                      className="text-indigo-600 underline"
                      href="mailto:contacto@xare.io"
                    >
                      contacto@xare.io
                    </a>
                  </li>
                  <li>
                    <b>Mándanos un WhatsApp al:</b>{" "}
                    <a
                      className="text-indigo-600 underline"
                      href="https://wa.me/525539643612"
                    >
                      +52 55 3964 3612
                    </a>
                  </li>
                </ol>
                Podemos agendar una videoconferencia para explicarte en detalle
                todas las funciones disponibles y cómo usarlas para lograr tus
                objetivos.
              </span>
            </li>
            <li className="flex gap-x-3">
              <CheckCircleIcon
                aria-hidden="true"
                className="mt-1 h-5 w-5 flex-none text-indigo-600"
              />
              <span>
                <strong className="font-semibold text-gray-900">
                  Crea tu marca personal
                </strong>{" "}
                Antes de comenzar a promocionar tus productos y servicios,
                ingresa a la sección{" "}
                <a className="text-indigo-600 underline" href="/account/site">
                  Sitio
                </a>{" "}
                en la plataforma. Aquí podrás:
                <ul className="list-disc list-inside">
                  <li>Crear tu marca personal.</li>
                  <li>
                    Completar la información de contacto para que tus clientes
                    te encuentren fácilmente.
                  </li>
                  <li>
                    Configurar tu página web para presentar tus servicios de
                    forma atractiva y profesional.
                  </li>
                </ul>
              </span>
            </li>
            <li className="flex gap-x-3">
              <CheckCircleIcon
                aria-hidden="true"
                className="mt-1 h-5 w-5 flex-none text-indigo-600"
              />
              <span>
                <strong className="font-semibold text-gray-900">
                  Explora Productos y Servicios
                </strong>{" "}
                En la sección{" "}
                <a className="text-indigo-600 underline" href="/account/pys">
                  Productos y Servicios
                </a>{" "}
                encontrarás todo lo que puedes ofrecer a tus clientes:
                <ul className="list-disc list-inside">
                  <li>
                    <b>Detalles de comisiones:</b> Entiende las comisiones
                    asociadas a cada producto o servicio.
                  </li>
                  <li>
                    <b>Cómo ofrecer productos y servicios:</b> Obtén consejos y
                    estrategias para promover lo que ofreces.
                  </li>
                  <li>
                    <b>Información necesaria para cotizaciones:</b> Conoce los
                    datos esenciales que se requieren para cotizar de manera
                    eficiente.
                  </li>
                  <li>
                    <b>Materiales de apoyo:</b> Descarga presentaciones y
                    recursos útiles para tu proceso de ventas.
                  </li>
                </ul>
              </span>
            </li>
          </ul>
          <h2 className="text-2xl font-bold tracking-tight text-gray-800 sm:text-3xl mt-6">
            ¡Estamos aquí para apoyarte!
          </h2>
          <p className="mt-8">
            Queremos ayudarte a alcanzar tus objetivos financieros y a
            aprovechar al máximo nuestra herramienta. Si necesitas cualquier
            orientación o apoyo adicional, ¡estamos para asistirte!
          </p>
          <p className="mt-6">
            ¡Es momento de iniciar tu camino hacia el éxito con Xare!
          </p>
        </div>
      </div>
    </div>
  );
}
