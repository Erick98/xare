"use client";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function Header({ site, pys }) {
  const router = useRouter();

  return (
    <header className="bg-white w-full fixed top-0 left-0 shadow z-40">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex flex-1">
          <div className="flex">
            <button
              type="button"
              onClick={() => router.back()}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <ChevronLeftIcon
                aria-hidden="true"
                className="h-6 w-6 font-bold text-indigo-900"
              />
            </button>
          </div>
        </div>
        <div className="flex justify-center">
          <h1 className="text-base font-semibold leading-6 text-gray-900 uppercase">
            {pys.title}
          </h1>
        </div>
        <a href="/" className="-m-1.5 p-1.5 flex-1 flex justify-end">
          <span className="sr-only">Your Company</span>
          <img alt={site.name} src={site.logo} className="h-8 w-auto" />
        </a>
      </nav>
    </header>
  );
}
