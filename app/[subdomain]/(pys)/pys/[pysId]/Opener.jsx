"use client";

import { useState } from "react";
import Process from "./Process";

export default function Opener({ pys, site, range, fields }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="submit"
        className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        onClick={() => setOpen(true)}
      >
        {pys.way === "Directa" ? "Compra Ahora" : "Cotiza Ahora"}
      </button>
      <Process
        range={range}
        fields={fields}
        pys={pys}
        site={site}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
}
