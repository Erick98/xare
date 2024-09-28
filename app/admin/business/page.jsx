import BusinessForm from "./BusinessForm";
import BusinessList from "./BusinessList";

export default function Page() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <div className="col-span-1">
        <h1 className="text-3xl font-bold">Agregar Empresa</h1>
        <BusinessForm />
      </div>
      <div className="col-span-2">
        <BusinessList />
      </div>
    </div>
  );
}
