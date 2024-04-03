import { Button } from "primereact/button"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteAssets } from "@/api/assets"

type TDialogDelete = {
  noAset: string
  setNoAset: React.Dispatch<React.SetStateAction<string>>
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export default function DialogDelete({
  noAset,
  setNoAset,
  setVisible,
}: TDialogDelete) {
  const queryClient = useQueryClient()

  // post mutation function
  const deleteAssetsMutation = useMutation({
    mutationFn: deleteAssets,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assets"] })
    },
  })

  const handleOnCancel = () => {
    setVisible(false)
  }

  const handleOnSubmit = () => {
    setVisible(false)
    deleteAssetsMutation.mutate({ no_aset: noAset })
  }

  return (
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
}
