import getOutstanding from "@/firebase/firestore/getOutstanding";
import getSite from "@/firebase/firestore/getSite";

export default async function Page({ params }) {
  const { subdomain } = params;

  const site = await getSite(subdomain);
  const list = await getOutstanding();

  return (
    <>
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20 pt-14">
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:-mr-80 lg:-mr-96"
        />
        <div className="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
            <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:col-span-2 xl:col-auto">
              {site.title}
            </h1>
            <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
              <p className="text-lg leading-8 text-gray-600">
                {site.description}
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <a
                  href="/productos"
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Ver Productos <span aria-hidden="true">→</span>
                </a>
                <a
                  href="/servicios"
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Ver Servicios <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
            <img
              alt={site.name}
              src={site.cover}
              className="mt-10 aspect-[6/5] w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36"
            />
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
      </div>
      <div className="mx-auto max-w-2xl text-center">
        <p className={`text-base font-semibold leading-7 text-gray-500`}>
          Nuestros principales productos y servicios
        </p>
        <h2 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Destacados
        </h2>
      </div>
      <hr className="max-w-2xl mx-auto mt-12" />
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-3">
          {list.map((item) => (
            <div key={item.slug} className="group relative">
              <div className="aspect-h-4 aspect-w-4 overflow-hidden rounded-lg bg-gray-100">
                <img
                  alt={item.title}
                  src={item.cover}
                  className="object-cover object-center"
                />
                <div
                  aria-hidden="true"
                  className="flex items-end p-4 opacity-0 group-hover:opacity-100"
                >
                  <div className="w-full rounded-md bg-white bg-opacity-75 px-4 py-2 text-center text-sm font-medium text-gray-900 backdrop-blur backdrop-filter">
                    Ver más
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between space-x-8 text-base font-medium text-gray-900">
                <h3>
                  <a href={`/pys/${item.id}`}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {item.title}
                  </a>
                </h3>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                {item.description.split(". ")[0]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
