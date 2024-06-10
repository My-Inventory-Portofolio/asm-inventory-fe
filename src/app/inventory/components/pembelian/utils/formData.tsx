"use client"

import { Button } from "primereact/button"
import { FileUpload, ItemTemplateOptions } from "primereact/fileupload"
import { InputText } from "primereact/inputtext"
import { useRef, useState } from "react"
import { postPembelian } from "@/api/pembelian"
import { Tooltip } from "primereact/tooltip"
import ErrorComp from "@/reusable/errorComp"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { InputMask } from "primereact/inputmask"
import Cookies from "js-cookie"

type TTempFormData = {
  kode: string
  jenis: string
  tgl_beli: string
  harga_beli: string
  supplier: string
  serial_number: string
  keterangan: string
  nota: string
}

type TFormData = {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  tempFormData: TTempFormData
  flagEdit: boolean
}

export function FormDataPembelian({
  setVisible,
  tempFormData,
  flagEdit,
}: TFormData) {
  const [formData, setFormData] = useState(tempFormData)
  const [tempFile, setTempFile]: any = useState([])
  const [errMsg, setErrMsg] = useState({
    kode: false,
    image: false,
  })
  const queryClient = useQueryClient()
  const role = Cookies.get("role")

  // post mutation function
  const postPembelianMutation = useMutation({
    mutationFn: postPembelian,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pembelian"] })
    },
  })

  // handle on change
  const handleOnChange = (e: any): void => {
    const { name, value } = e.target
    if (name === "kode" && value && errMsg.kode) {
      setErrMsg({ ...errMsg, ["kode"]: false })
    }
    setFormData({ ...formData, [name]: value })
  }

  const handleOnSubmit = async (e: any) => {
    // await postPembelian({ ...formData, ["file"]: tempFile.files[0] })
    let flag = false
    let newErrMsg = {
      kode: false,
      image: false,
    }
    if (!formData.kode) {
      newErrMsg["kode"] = true
      flag = true
    }
    if (tempFile.length === 0) {
      newErrMsg["image"] = true
      flag = true
    }
    if (flag) {
      setErrMsg(newErrMsg)
    } else {
      postPembelianMutation.mutate({
        ...formData,
        ["file"]: tempFile,
        ["role"]: role,
      })
      setVisible(false)
    }
  }

  const handleOnClose = () => {
    setVisible(false)
  }

  const onTemplateRemove = (file: File, callback: Function) => {
    callback()
  }

  // custom file upload
  const headerTemplate = (options: any) => {
    const { className, chooseButton, cancelButton } = options

    return (
      <div
        className={className}
        style={{
          backgroundColor: "transparent",
          display: "flex",
          alignItems: "center",
        }}
      >
        {chooseButton}
        {cancelButton}
      </div>
    )
  }

  const itemTemplate = (inFile: object, props: ItemTemplateOptions) => {
    const file: any = inFile as File

    const handleRemoveTempFile = (index: number) => {
      let newTempFile = tempFile
      newTempFile[index] = null
      newTempFile = newTempFile.filter((_: any) => _ !== null)
      setTempFile(newTempFile)
    }

    return (
      <div
        className="flex align-items-center relative"
        style={{ height: "500px" }}
      >
        <img
          alt={file.name}
          role="presentation"
          src={file.objectURL}
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
        />
        <Button
          type="button"
          icon="pi pi-times"
          className="p-button-rounded p-button-danger absolute top-0 right-0"
          onClick={() => {
            onTemplateRemove(file, props.onRemove)
            handleRemoveTempFile(props.index)
          }}
        />
      </div>
    )
  }

  const chooseOptions = {
    icon: "pi pi-fw pi-images",
    Tooltip: "Pilih File",
    className: "custom-choose-btn p-button-outlined",
  }

  const cancelOptions = {
    icon: "pi pi-fw pi-trash",
    Tooltip: "Pilih File",
    className: "custom-cancel-btn p-button-danger  p-button-outlined",
  }

  return (
    <>
      <div
        className="overflow-y-auto flex gap-4"
        style={{ height: "70vh", width: "40vw" }}
      >
        <div className="grid mx-0 h-fit">
          <div className="col-6">
            <label>Kode</label>
            <InputText
              value={formData.kode}
              name="kode"
              type="text"
              className="p-inputtext-sm mt-1 w-full"
              disabled={flagEdit}
              onChange={(e) => handleOnChange(e)}
            />
            {errMsg.kode && ErrorComp("Kode tidak boleh kosong")}
          </div>
          <div className="col-6">
            <label>Jenis</label>
            <InputText
              value={formData.jenis}
              name="jenis"
              type="text"
              className="p-inputtext-sm mt-1 w-full"
              disabled={flagEdit}
              onChange={(e) => handleOnChange(e)}
            />
          </div>
          <div className="col-6">
            <label>Tanggal Beli</label>
            <InputMask
              className="p-inputtext-sm mt-1 w-full"
              name="tgl_beli"
              value={formData.tgl_beli}
              onChange={(e: any) => handleOnChange(e)}
              mask="99/99/99"
              placeholder="dd/mm/yy"
              slotChar="dd/mm/yy"
            />
          </div>
          <div className="col-6">
            <label>Harga Beli</label>
            <InputText
              value={formData.harga_beli}
              name="harga_beli"
              type="text"
              className="p-inputtext-sm mt-1 w-full"
              disabled={flagEdit}
              onChange={(e) => handleOnChange(e)}
            />
          </div>
          <div className="col-6">
            <label>Supplier</label>
            <InputText
              value={formData.supplier}
              name="supplier"
              type="text"
              className="p-inputtext-sm mt-1 w-full"
              disabled={flagEdit}
              onChange={(e) => handleOnChange(e)}
            />
          </div>
          <div className="col-6">
            <label>Serial Number</label>
            <InputText
              value={formData.serial_number}
              name="serial_number"
              type="text"
              className="p-inputtext-sm mt-1 w-full"
              disabled={flagEdit}
              onChange={(e) => handleOnChange(e)}
            />
          </div>
          <div className="col-6">
            <label>Keterangan</label>
            <InputText
              value={formData.keterangan}
              name="keterangan"
              type="text"
              className="p-inputtext-sm mt-1 w-full"
              disabled={flagEdit}
              onChange={(e) => handleOnChange(e)}
            />
          </div>
          <div className="col-12">
            <label>Nota</label>

            <FileUpload
              // style={{ height: "500px" }}
              multiple
              name="demo[]"
              url={"/api/upload"}
              accept="image/*"
              maxFileSize={1000000}
              emptyTemplate={
                <p className="m-0">Drag and drop files to here to upload.</p>
              }
              itemTemplate={itemTemplate}
              headerTemplate={headerTemplate}
              onClear={() => setTempFile([])}
              onSelect={(e) => {
                setTempFile(e.files)
                setErrMsg({ ...errMsg, ["image"]: false })
              }}
              chooseLabel="Pilih Nota"
              cancelLabel="Remove"
              chooseOptions={chooseOptions}
              cancelOptions={cancelOptions}
            />
            {errMsg.image && ErrorComp("Image tidak boleh kosong")}
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
