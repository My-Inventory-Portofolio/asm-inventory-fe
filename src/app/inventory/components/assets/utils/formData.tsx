"use client"

import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"
import { useEffect, useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { postAssets } from "@/api/assets"

type TVisible = {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export default function FormDataAssets({ setVisible }: TVisible) {
  const queryClient = useQueryClient()
  const [formData, setFormData] = useState({
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

  const resetFormData = () => {
    setFormData({
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

  // handle on close
  const handleOnClose = () => {
    setVisible(false)
    resetFormData()
  }

  // post mutation function
  const postAssetsMutation = useMutation({
    mutationFn: postAssets,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assets"] })
    },
  })

  // handle submit new todo
  const handleOnSubmit = (): void => {
    postAssetsMutation.mutate(formData)
    resetFormData()
  }

  // handle on change
  const handleOnChange = (e: any) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  return (
    <>
      <div
        className="overflow-auto flex gap-4"
        style={{ height: "430px", width: "50vw" }}
      >
        <div className="flex flex-column gap-2 w-6">
          <div>
            <label>No. Aset</label>
            <InputText
              value={formData.no_aset}
              name="no_aset"
              type="text"
              className="p-inputtext-sm mt-1 w-full w-full"
              onChange={(e) => handleOnChange(e)}
            />
          </div>
          <div>
            <label>Nama Device</label>
            <InputText
              value={formData.nama_device}
              name="nama_device"
              type="text"
              className="p-inputtext-sm mt-1 w-full"
              onChange={(e) => handleOnChange(e)}
            />
          </div>
          <div>
            <label>Spec</label>
            <InputText
              value={formData.spec}
              name="spec"
              type="text"
              className="p-inputtext-sm mt-1 w-full"
              onChange={(e) => handleOnChange(e)}
            />
          </div>
          <div>
            <label>Merk</label>
            <InputText
              value={formData.merek}
              name="merek"
              type="text"
              className="p-inputtext-sm mt-1 w-full"
              onChange={(e) => handleOnChange(e)}
            />
          </div>
          <div>
            <label>Variant</label>
            <InputText
              value={formData.variant}
              name="variant"
              type="text"
              className="p-inputtext-sm mt-1 w-full"
              onChange={(e) => handleOnChange(e)}
            />
          </div>
          <div>
            <label>Model</label>
            <InputText
              value={formData.model}
              name="model"
              type="text"
              className="p-inputtext-sm mt-1 w-full"
              onChange={(e) => handleOnChange(e)}
            />
          </div>
        </div>

        {/* ===  */}
        <div className="flex flex-column gap-2 w-6">
          <div>
            <label>PIC</label>
            <InputText
              value={formData.pic}
              name="pic"
              type="text"
              className="p-inputtext-sm mt-1 w-full"
              onChange={(e) => handleOnChange(e)}
            />
          </div>
          <div>
            <label>Owner</label>
            <InputText
              value={formData.owner}
              name="owner"
              type="text"
              className="p-inputtext-sm mt-1 w-full"
              onChange={(e) => handleOnChange(e)}
            />
          </div>
          <div>
            <label>Lokasi</label>
            <InputText
              value={formData.lokasi}
              name="lokasi"
              type="text"
              className="p-inputtext-sm mt-1 w-full"
              onChange={(e) => handleOnChange(e)}
            />
          </div>
          <div>
            <label>Keterangan</label>
            <InputText
              value={formData.keterangan}
              name="keterangan"
              type="text"
              className="p-inputtext-sm mt-1 w-full"
              onChange={(e) => handleOnChange(e)}
            />
          </div>
          <div>
            <label>Tgl Check</label>
            <InputText
              value={formData.tgl_check}
              name="tgl_check"
              type="text"
              className="p-inputtext-sm mt-1 w-full"
              onChange={(e) => handleOnChange(e)}
            />
          </div>
          <div>
            <label>Serial Number</label>
            <InputText
              value={formData.serial_number}
              name="serial_number"
              type="text"
              className="p-inputtext-sm mt-1 w-full"
              onChange={(e) => handleOnChange(e)}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-content-end gap-2">
        <Button size="small" onClick={handleOnClose}>
          Cancel
        </Button>
        <Button size="small" onClick={handleOnSubmit}>
          Submit
        </Button>
      </div>
    </>
  )
}
