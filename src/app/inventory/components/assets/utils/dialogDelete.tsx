import { Button } from "primereact/button"

type TDialogDelete = {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export default function DialogDelete({ setVisible }: TDialogDelete) {
  const handleOnCancel = () => {
    setVisible(false)
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
          onClick={handleOnCancel}
        />
      </div>
    </div>
  )
}
