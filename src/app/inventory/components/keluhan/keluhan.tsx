import { useState } from "react"
import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"
import { Dialog } from "primereact/dialog"
import DialogDone from "./utils/DialogDone"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getAllDataKeluhan } from "@/api/keluhan"

type TSelectedData = {
  id: number
  extension: string
  email: string
  keluhan: string
}

// function keluhan
export default function Keluhan() {
  // pagination state
  const [keyword, setKeyword] = useState("")
  const [visibleDialogDone, setVisibleDialogDone] = useState(false)
  const [selectedData, setSelectedData] = useState<TSelectedData>()
  const queryClient = useQueryClient()

  // state keluhan data
  const keluhanData: TSelectedData[] | undefined = queryClient.getQueryData([
    "keluhan",
  ])

  // function refresh button
  const handleRefreshBtn = () =>
    queryClient.invalidateQueries({ queryKey: ["keluhan"] })

  // Queries
  useQuery({
    queryKey: ["keluhan"],
    queryFn: getAllDataKeluhan,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })

  const handleOnClickCheckBtn = (e: any) => {
    setVisibleDialogDone(true)
    setSelectedData(e)
  }

  return (
    <div className="px-3 py-1">
      <div className="flex justify-content-between">
        <div className="flex align-items-center" style={{ width: "20%" }}>
          <div className="text-md font-semibold flex align-items-center">
            Keluhan
          </div>
          <i
            className="pi pi-briefcase pt-1 ml-2"
            style={{ fontSize: "1rem" }}
          ></i>
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
            className="p-inputtext-sm"
            placeholder="still udner development"
            disabled
            value={keyword}
            onChange={(e: any) => setKeyword(e?.target?.value)}
          />
        </div>
      </div>
      <div
        style={{
          maxHeight: "calc(100vh - 16rem)",
          margin: "20px 0 0 0",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(10rem, 1fr))",
          gap: "1rem",
          overflow: "auto",
        }}
      >
        {keluhanData &&
          keluhanData.map((e, index) => (
            <div
              key={index}
              className="border-round-2xl border-1 px-0 py-0"
              style={{
                height: "8rem",
                display: "flex",
                flexDirection: "column",
                position: "relative",
              }}
            >
              <div
                style={{
                  height: "80%",
                  borderRadius: "1rem 1rem 0 0",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                }}
              >
                Extension
                <div className="text-center">
                  <Button
                    label={e.extension}
                    link
                    style={{
                      fontSize: "2rem",
                      padding: "10px 0 0 0",
                    }}
                    tooltip={`task/problem:\n${e.keluhan}`}
                    tooltipOptions={{ position: "bottom" }}
                  />
                  <div className="text-xs">{e.email.split("@")[0]}</div>
                </div>
              </div>
              <Button
                size="small"
                style={{
                  padding: "5px",
                  position: "absolute",
                  right: "5px",
                  bottom: "5px",
                }}
                onClick={() => handleOnClickCheckBtn(e)}
                rounded
                text
                aria-label="Filter"
              >
                <i className="pi pi-check" style={{ fontSize: "0.8rem" }}></i>
              </Button>
            </div>
          ))}
      </div>
      <Dialog
        header={`${selectedData?.extension}-${
          selectedData?.email.split("@")[0]
        }`}
        visible={visibleDialogDone}
        onHide={() => setVisibleDialogDone(false)}
      >
        <DialogDone
          setVisible={setVisibleDialogDone}
          selectedData={selectedData}
        />
      </Dialog>
    </div>
  )
}
