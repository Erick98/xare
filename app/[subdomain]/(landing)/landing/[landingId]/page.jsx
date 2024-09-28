import ContactForm from "@/components/ContactForm";
import { getItem } from "@/firebase/firestore/getItem";
import getSite from "@/firebase/firestore/getSite";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";

export async function generateMetadata({ params }) {
  const { subdomain, landingId } = params;
  const data = await getSite(subdomain);
  const landing = await getItem("landings", landingId);

  if (!data || !landing) {
    return notFound();
  }

  const title = `${data.name} | ${landing.title}`;

  return {
    title,
    description: landing.description,
    openGraph: {
      title,
      images: [landing.cover],
    },
  };
}

const Item = async ({ id }) => {
  const item = await getItem("pys", id);

  return (
    <div className="group relative">
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
  );
};

export default async function Page({ params }) {
  const { landingId, subdomain } = params;
  const landing = await getItem("landings", landingId);
  const site = await getSite(subdomain);
  return (
    <>
      <div className="flex flex-col border-b border-gray-200 lg:border-0 bg-gray-100">
        <nav aria-label="Offers" className="order-last lg:order-first">
          <div className="mx-auto max-w-7xl py-4">
            <img className="w-16" src={site.logo} alt={site.name} />
          </div>
        </nav>

        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute hidden h-full w-1/2 bg-gray-100 lg:block"
          />
          <div className="relative bg-gray-100 lg:bg-transparent">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:grid lg:grid-cols-2 lg:px-8">
              <div className="mx-auto max-w-2xl py-24 lg:max-w-none lg:py-64">
                <div className="lg:pr-16">
                  <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl xl:text-6xl">
                    {landing.title}
                  </h1>
                  <p className="mt-4 text-xl text-gray-600">
                    {landing.description}
                  </p>
                  <div className="mt-6">
                    <a
                      href="#contacto"
                      className="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 font-medium text-white hover:bg-indigo-700"
                    >
                      Contáctanos
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="h-48 w-full sm:h-64 lg:absolute lg:right-0 lg:top-0 lg:h-full lg:w-1/2">
            <img
              alt=""
              src="https://tailwindui.com/img/ecommerce-images/home-page-02-hero-half-width.jpg"
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-2xl text-center mt-20">
        <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Conoce más
        </h2>
        <p className={`mt-6 text-base font-semibold leading-7 text-gray-500`}>
          {landing.content}
        </p>
      </div>
      <hr className="max-w-2xl mx-auto mt-12" />
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-3">
          {landing.pys.map((id) => (
            <Item key={id} id={id} />
          ))}
        </div>
      </div>
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
          <ContactForm siteId={site.id} from="landing" itemId={landing.id} />
        </div>
      </div>
    </>
  );
}
