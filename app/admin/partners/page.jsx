import PartnerForm from "./PartnerForm";
import PartnerTable from "./PartnerTable";

export default function Page() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="col-span-1">
        <h1 className="text-3xl font-bold">Agregar Socio</h1>
        <PartnerForm />
      </div>
      <div className="col-span-2">
        <PartnerTable />
      </div>
    </div>
  );
}
