import { getItem } from "@/firebase/firestore/getItem";
import getSite from "@/firebase/firestore/getSite";
import Header from "./Header";
import getList from "@/firebase/firestore/getList";
import ContactForm from "@/components/ContactForm";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";
import Opener from "./Opener";
import _ from "lodash";

export default async function Page({ params }) {
  const { subdomain, pysId } = params;
  const site = await getSite(subdomain);
  const pys = await getItem("pys", pysId);
  const images =
    (await getList(`/pys/${pys.id}/images`)).docs.map((item) => ({
      ...item.data(),
      id: item.id,
    })) || [];
  const range =
    (await getList(`/pys/${pys.id}/range`)).docs.map((item) => ({
      ...item.data(),
      id: item.id,
    })) || [];
  const fields =
    _.orderBy(
      (await getList(`/pys/${pys.id}/fields`)).docs.map((item) => ({
        ...item.data(),
        id: item.id,
      })),
      ["index"],
      ["asc"]
    ) || [];

  return (
    <>
      <Header site={site} pys={pys} />
      <main className="mx-auto mt-8 max-w-2xl px-4 pb-16 sm:px-6 sm:pb-24 lg:max-w-7xl lg:px-8 pt-20 relative isolate">
        <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8 relative isolate">
          <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0 ">
            <h2 className="sr-only">Images</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8 lg:sticky lg:top-24">
              <img
                alt={pys.title}
                src={pys.cover}
                className="lg:col-span-2 rounded-lg"
              />
              {images.map((image) => (
                <img
                  key={image.id}
                  alt={image.title}
                  src={image.url}
                  className="hidden lg:block rounded-lg"
                />
              ))}
            </div>
          </div>

          <div className="mt-8 lg:col-span-5">
            <div className="flex justify-between">
              <h1 className="text-xl font-medium text-gray-900">{pys.title}</h1>
            </div>
            <div className="mt-8">
              <div>
                <h2 className="text-sm font-medium text-gray-900">
                  Descripción
                </h2>

                <p className="prose prose-sm mt-4 text-gray-500">
                  {pys.description}
                </p>
              </div>

              <Opener range={range} fields={fields} pys={pys} site={site} />
            </div>

            <div className="mt-10">
              <div
                dangerouslySetInnerHTML={{ __html: pys.content }}
                className="prose prose-sm mt-4 text-gray-500"
              />
            </div>
          </div>
        </div>
      </main>
      <div id="contacto" className="relative isolate bg-white min-h-screen">
        <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
          <div className="relative px-6 pb-20 pt-24 sm:pt-32 lg:static lg:px-8 lg:py-48">
            <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
              <div className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden bg-gray-100 ring-1 ring-gray-900/10 lg:w-1/2">
                <svg
                  aria-hidden="true"
                  className="absolute inset-0 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
                >
                  <defs>
                    <pattern
                      x="100%"
                      y={-1}
                      id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
                      width={200}
                      height={200}
                      patternUnits="userSpaceOnUse"
                    >
                      <path d="M130 200V.5M.5 .5H200" fill="none" />
                    </pattern>
                  </defs>
                  <rect
                    fill="white"
                    width="100%"
                    height="100%"
                    strokeWidth={0}
                  />
                  <svg
                    x="100%"
                    y={-1}
                    className="overflow-visible fill-gray-50"
                  >
                    <path d="M-470.5 0h201v201h-201Z" strokeWidth={0} />
                  </svg>
                  <rect
                    fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
                    width="100%"
                    height="100%"
                    strokeWidth={0}
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                Contácto
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Recibe información detallada de nuestro equipo, recibe una
                oferta personal sobre los productos o servicios que requieres,
                un asesor te contactará para brindarte información detallada.
              </p>
              <dl className="mt-10 space-y-4 text-base leading-7 text-gray-600">
                <div className="flex gap-x-4">
                  <dt className="flex-none">
                    <span className="sr-only">Telephone</span>
                    <PhoneIcon
                      aria-hidden="true"
                      className="h-7 w-6 text-gray-400"
                    />
                  </dt>
                  <dd>
                    <a
                      href={`tel:+52 ${site.phone}`}
                      className="hover:text-gray-900"
                    >
                      +52 {site.phone}
                    </a>
                  </dd>
                </div>
                <div className="flex gap-x-4">
                  <dt className="flex-none">
                    <span className="sr-only">Email</span>
                    <EnvelopeIcon
                      aria-hidden="true"
                      className="h-7 w-6 text-gray-400"
                    />
                  </dt>
                  <dd>
                    <a
                      href={`mailto:${site.email}`}
                      className="hover:text-gray-900"
                    >
                      {site.email}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          <ContactForm from="pys" itemId={pysId} siteId={site.id} />
        </div>
      </div>
    </>
  );
}
