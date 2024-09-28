import getPys from "@/firebase/firestore/getPys";
import getSite from "@/firebase/firestore/getSite";

export default async function Page({ params }) {
  const { subdomain } = params;

  const site = await getSite(subdomain);
  const list = await getPys("Servicio");

  return (
    <main className="bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className={`text-base font-semibold leading-7 text-gray-500`}>
          {site.title}
        </p>
        <h2 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Nuestros Servicios
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
    </main>
  );
}
