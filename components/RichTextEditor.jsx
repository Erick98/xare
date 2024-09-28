"use client";
import ReactQuill from "react-quill";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";

export default function RichTextEditor({ handleSubmit, defaultValue, title }) {
  const [editorHtml, setEditorHtml] = useState(null);

  useEffect(() => {
    if (defaultValue === undefined) {
      setEditorHtml("");
    } else {
      setEditorHtml(defaultValue);
    }
  }, [defaultValue]);

  return (
    <form onSubmit={(e) => handleSubmit(e, editorHtml)}>
      <h3 className="text-base font-semibold leading-7 text-gray-900 mb-6">
        {title}
      </h3>
      <div className="relative mb-16">
        {editorHtml !== null && (
          <ReactQuill
            style={{
              height: "350px",
              borderRadius: "6px",
            }}
            theme="snow"
            value={editorHtml}
            onChange={setEditorHtml}
          />
        )}
      </div>
      <div className="flex justify-end mt-4">
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Guardar Contenido
        </button>
      </div>
    </form>
  );
}
