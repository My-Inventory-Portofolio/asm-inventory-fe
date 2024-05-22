import { getAllKartuStok } from "@/api/kartu_stok"
import Pagination from "@/reusable/pagination"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { Button } from "primereact/button"
import { Column } from "primereact/column"
import { DataTable } from "primereact/datatable"
import { Dialog } from "primereact/dialog"
import { InputText } from "primereact/inputtext"
import { useEffect, useState } from "react"
import FormDataKartuStok from "./utils/formData"
import Image from "next/image"

type TKartuStok = {
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

export default function KartuStok() {
  const queryClient = useQueryClient()

  const [keyword, setKeyword] = useState<string>("")
  const [keywordDataLength, setKeywordDataLength] = useState(0)
  const [tableData, setTableData] = useState<TKartuStok[]>([])
  const [tempFormData, setTempFormData] = useState({
    no_aset: "",
    nama_device: "",
    spec: "",
    merek: "",
    variant: "",
    model: "",
    pic: "",
    owner: "",
    lokasi: "",
    keterangan: "",
    tgl_check: "",
    serial_number: "",
  })
  const [visibleFormData, setVisibleFormData] = useState(false)

  // query
  const kartuStokData: TKartuStok[] | undefined = queryClient.getQueryData([
    "kartu_stok",
  ])

  // pagination state
  const [first, setFirst] = useState(0)
  const [rows, setRows] = useState(10)

  // Queries
  useQuery({
    queryKey: ["kartu_stok"],
    queryFn: getAllKartuStok,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })

  // form data header
  const headerFormData = (
    <div className="flex align-items-center">
      Edit
      <Image
        src="https://erp.sampurna-group.com/assets/layout/images/logo-white.png"
        alt="Description of your image"
        width={30}
        height={30}
        className="ml-2"
      />
    </div>
  )

  // handle edit btn
  const handleEditColumn = (e: TKartuStok) => {
    setTempFormData(e)
    setVisibleFormData(true)
  }

  // handle reset form data
  const handleResetFormData = (): void => {
    setTempFormData({
      no_aset: "",
      nama_device: "",
      spec: "",
      merek: "",
      variant: "",
      model: "",
      pic: "",
      owner: "",
      lokasi: "",
      keterangan: "",
      tgl_check: "",
      serial_number: "",
    })
  }

  const handleRefreshBtn = () => {
    queryClient.invalidateQueries({ queryKey: ["kartu_stok"] })
  }

  useEffect(() => {
    if (kartuStokData) {
      if (keyword) {
        const keywordData = kartuStokData?.filter((e) =>
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
        const tempTableData = kartuStokData?.slice(
          first,
          first === 0 ? rows : rows + first
        )
        setTableData(tempTableData)
        setKeywordDataLength(kartuStokData.length)
      }
    }
  }, [first, rows, kartuStokData, keyword])

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

  //
  return (
    <div className="px-3 py-1">
      <div className="flex justify-content-between">
        <div className="flex align-items-center" style={{ width: "20%" }}>
          <div className="text-2xl font-semibold flex align-items-center">
            Kartu Stok
          </div>
          <i className="pi pi-box pt-1 ml-2" style={{ fontSize: "1.3rem" }}></i>
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
          <Button
            icon="pi pi-refresh"
            aria-label="Favorite"
            size="small"
            className="mr-2"
            tooltip="Refresh Data"
            tooltipOptions={{
              position: "bottom",
            }}
            onClick={handleRefreshBtn}
          />
          <InputText
            className="p-inputtext-sm mr-2"
            placeholder="search keyword"
            value={keyword}
            onChange={(e: any) => setKeyword(e?.target?.value)}
          />
        </div>
      </div>
      {tableData ? (
        <div className="mt-2" style={{ height: "calc(100vh - 18rem)" }}>
          <DataTable
            value={tableData}
            removableSort
            scrollable
            scrollHeight="flex"
          >
            <Column
              key={"column-table"}
              header="No"
              body={(_, rowIndex) => <>{rowIndex.rowIndex + 1}</>}
            />
            {columnTable?.map(({ field, header }) => (
              <Column
                key={"column-table"}
                style={{ width: "10%" }}
                sortable
                field={field}
                header={header}
              />
            ))}
            <Column
              key={"column-table"}
              body={(e) => (
                <Button
                  size="small"
                  icon="pi pi-pencil"
                  text
                  severity="info"
                  onClick={() => handleEditColumn(e)}
                />
              )}
            />
          </DataTable>
        </div>
      ) : (
        <></>
      )}

      {/* form edit  */}
      <Dialog
        header={headerFormData}
        visible={visibleFormData}
        onHide={() => {
          setVisibleFormData(false)
          handleResetFormData()
        }}
      >
        <FormDataKartuStok
          setVisible={setVisibleFormData}
          tempFormData={tempFormData}
          handleResetFormData={handleResetFormData}
        />
      </Dialog>
    </div>
  )
}
