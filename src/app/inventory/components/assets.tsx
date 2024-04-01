import { Button } from "primereact/button"
import { getAllDataAssets } from "@/api/assets"
import { useQuery } from "@tanstack/react-query"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"

export default function Assets() {
  // Queries
  const asetData = useQuery({ queryKey: ["todos"], queryFn: getAllDataAssets })

  const columnTable = [
    { field: "no_aset", header: "No Aset" },
    { field: "nama_device", header: "Nama Device" },
    { field: "spec", header: "Spec" },
    { field: "merek", header: "Merk" },
    { field: "variant", header: "Variant" },
    { field: "model", header: "Model" },
    { field: "pic", header: "Pic" },
    { field: "owner", header: "Owner" },
    { field: "lokasi", header: "Lokasi" },
    { field: "keterangan", header: "Keterangan" },
    { field: "tgl_check", header: "Tgl Check" },
    { field: "serial_number", header: "Serial Number" },
  ]

  return (
    <div className="p-3">
      <div className="flex justify-content between">
        <div className="w-full text-2xl font-semibold">Aset</div>
        <Button
          icon="pi pi-plus"
          size="small"
          tooltip="Tambah Aset"
          tooltipOptions={{ position: "bottom" }}
        />
      </div>
      {asetData?.data && (
        <div className="mt-2 w-full">
          <DataTable value={asetData?.data} loading={!asetData?.data}>
            {columnTable?.map(({ field, header }) => (
              <Column field={field} header={header} />
            ))}
          </DataTable>
        </div>
      )}
    </div>
  )
}
