"use client"

import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { editAssets } from "@/api/assets"
import { InputMask } from "primereact/inputmask"
import ErrorComp from "@/reusable/errorComp"

type TTempFormData = {
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

type TFormData = {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  tempFormData: TTempFormData
  handleResetFormData: () => void
}

export default function FormDataKartuStok({
  setVisible,
  tempFormData,
  handleResetFormData,
}: TFormData) {
  const queryClient = useQueryClient()
  const [formData, setFormData] = useState(tempFormData)
  const [thereIsNoAset, setThereIsNoAset] = useState(false)

  // handle on close
  const handleOnClose = (): void => {
    setVisible(false)
    handleResetFormData()
  }

  // edit mutation function
  const editAssetsMutation = useMutation({
    mutationFn: editAssets,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assets"] })
      queryClient.invalidateQueries({ queryKey: ["kartu_stok"] })
    },
  })

  // handle submit new todo
  const handleOnSubmit = (): void => {
    editAssetsMutation.mutate(formData)
    setVisible(false)
    handleResetFormData()
    setFormData(tempFormData)
  }

  // handle on change
  const handleOnChange = (e: any): void => {
    const { name, value } = e.target
    if (name === "no_aset" && value && thereIsNoAset) {
      setThereIsNoAset(false)
    }
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
              disabled={true}
              onChange={(e) => handleOnChange(e)}
            />
            {thereIsNoAset && ErrorComp("No aset tidak boleh kosong")}
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
            <InputMask
              className="p-inputtext-sm mt-1 w-full"
              name="tgl_check"
              value={formData.tgl_check}
              onChange={(e: any) => handleOnChange(e)}
              mask="9999-99-99"
              placeholder="yyyy-mm-dd"
              slotChar="yyyy-mm-dd"
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
        <Button
          size="small"
          onClick={handleOnClose}
          className="bg-red-400 border-none"
        >
          Cancel
        </Button>
        <Button
          size="small"
          onClick={handleOnSubmit}
          className="bg-green-400 border-none"
        >
          Submit
        </Button>
      </div>
    </>
  )
}
