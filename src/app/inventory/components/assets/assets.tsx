import { Button } from "primereact/button"
import { getAllDataAssets } from "@/api/assets"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { Dialog } from "primereact/dialog"
import { useEffect, useState } from "react"
import FormDataAssets from "./utils/formData"
import Image from "next/image"
import Pagination from "./utils/pagination"
import DialogDelete from "./utils/dialogDelete"
import SearchBar from "./utils/searchBar"
import { InputText } from "primereact/inputtext"

type TAssetData = {
  keterangan: string
  lokasi: string
  merek: string
  model: string
  nama_device: string
  no_aset: string
  owner: string
  pic: string
  serial_number: string
  spec: string
  tgl_check: string
  variant: string
}

export default function Assets() {
  const queryClient = useQueryClient()
  const [visibleFormData, setVisibleFormData] = useState<boolean>(false)
  const [visibleDialogDelete, setVisibleDialogDelete] = useState<boolean>(false)
  const [keyword, setKeyword] = useState<string>("")
  const [keywordDataLength, setKeywordDataLength] = useState(0)
  const [tableData, setTableData] = useState<TAssetData[]>([])
  const asetData: TAssetData[] | undefined = queryClient.getQueryData([
    "assets",
  ])

  // pagination state
  const [first, setFirst] = useState(0)
  const [rows, setRows] = useState(10)

  // Queries
  useQuery({
    queryKey: ["assets"],
    queryFn: getAllDataAssets,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })

  // form data header
  const headerFormData = (
    <div className="flex align-items-center">
      New Assets
      <Image
        src="https://erp.sampurna-group.com/assets/layout/images/logo-white.png"
        alt="Description of your image"
        width={30}
        height={30}
        className="ml-2"
      />
    </div>
  )

  const handleDeleteColumn = (e: any) => {
    setVisibleDialogDelete(true)
  }

  useEffect(() => {
    if (asetData) {
      if (keyword) {
        const keywordData = asetData?.filter((e) =>
          Object.values(e)
            .join("|")
            .toLowerCase()
            .includes(keyword.toLowerCase())
        )
        setTableData(
          keywordData.slice(first, first === 0 ? rows : rows * (first + 1))
        )
        setKeywordDataLength(keywordData.length)
      } else {
        const tempTableData = asetData.slice(
          first,
          first === 0 ? rows : rows * (first + 1)
        )
        setTableData(tempTableData)
        setKeywordDataLength(asetData.length)
      }
    }
  }, [first, rows, asetData, keyword])

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
    <div className="px-3 py-1">
      <div className="flex justify-content-between">
        <div className="flex align-items-center" style={{ width: "20%" }}>
          <div className="text-2xl font-semibold flex align-items-center">
            Aset
          </div>
          <i
            className="pi pi-money-bill pt-1 ml-2"
            style={{ fontSize: "1.3rem" }}
          ></i>
        </div>

        <div>
          <Pagination
            dataLength={keywordDataLength}
            first={first}
            rows={rows}
            setFirst={setFirst}
            setRows={setRows}
          />
        </div>
        <div
          className="flex align-items-center justify-content-end"
          style={{ width: "20%" }}
        >
          <InputText
            className="p-inputtext-sm mr-2"
            placeholder="search keyword"
            value={keyword}
            onChange={(e: any) => setKeyword(e?.target?.value)}
          />
          <Button
            icon="pi pi-plus"
            size="small"
            tooltip="Tambah Aset"
            tooltipOptions={{ position: "bottom" }}
            onClick={() => setVisibleFormData(true)}
          />
        </div>
      </div>
      {tableData ? (
        <div className="mt-2" style={{ height: "calc(100vh - 18rem)" }}>
          <DataTable value={tableData} scrollable scrollHeight="flex">
            <Column
              key={"column-table"}
              header="No"
              body={(_, rowIndex) => <>{rowIndex.rowIndex + 1}</>}
            />
            {columnTable?.map(({ field, header }) => (
              <Column
                key={"column-table"}
                style={{ width: "10%" }}
                field={field}
                header={header}
              />
            ))}
            <Column
              key={"column-table"}
              body={(e) => (
                <Button
                  size="small"
                  icon="pi pi-trash"
                  text
                  severity="danger"
                  aria-label="Cancel"
                  onClick={() => handleDeleteColumn(e)}
                />
              )}
            />
          </DataTable>
        </div>
      ) : (
        <></>
      )}
      <Dialog
        header={headerFormData}
        visible={visibleFormData}
        onHide={() => setVisibleFormData(false)}
      >
        <FormDataAssets setVisible={setVisibleFormData} />
      </Dialog>
      <Dialog
        header="Delete!"
        visible={visibleDialogDelete}
        onHide={() => setVisibleDialogDelete(false)}
      >
        <DialogDelete setVisible={setVisibleDialogDelete} />
      </Dialog>
    </div>
  )
}
