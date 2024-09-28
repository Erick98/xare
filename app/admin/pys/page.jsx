import PysForm from "./PysForm";
import PysTable from "./PysTable";

export default function Page() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <div className="col-span-1">
        <h1 className="text-3xl font-bold">Agregar Productos y Servicios</h1>
        <PysForm />
      </div>
      <div className="col-span-2">
        <PysTable />
      </div>
    </div>
  );
}
