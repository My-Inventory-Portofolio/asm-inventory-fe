import { Button } from "primereact/button"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteAssets } from "@/api/assets"
import { deletePembelian } from "@/api/pembelian"
import toast from "react-hot-toast"
import Cookies from "js-cookie"

const toastError = (msg: string) => {
  toast.remove()
  toast.error(msg)
}

type TDialogDelete = {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  selectedData: any
}

export default function DialogDelete({
  setVisible,
  selectedData,
}: TDialogDelete) {
  const queryClient = useQueryClient()
  const role = Cookies.get("role")

  // post mutation function
  const deletePembelianMutation = useMutation({
    mutationFn: deletePembelian,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pembelian"] })
    },
  })

  const handleOnCancel = () => {
    setVisible(false)
    console.log("hit on cancel")
  }

  const handleOnSubmit = () => {
    setVisible(false)
    if (selectedData) {
      deletePembelianMutation.mutate({
        kode: selectedData.kode,
        imgId: selectedData.nota.split("|")[1],
        role: role,
      })
    } else {
      toastError("token expired, please re-login")
    }
  }

  return (
    selectedData && (
      <div className="m-0 p-0">
        Apakah anda yakin ingin mendelete data ini?
        <div className="flex justify-content-end gap-2 mt-3">
          <Button
            icon="pi pi-times"
            rounded
            text
            severity="help"
            aria-label="Cancel"
            onClick={handleOnCancel}
          />
          <Button
            icon="pi pi-check"
            rounded
            severity="help"
            text
            aria-label="Filter"
            onClick={handleOnSubmit}
          />
        </div>
      </div>
    )
  )
}
