import { deleteKeluhan } from "@/api/keluhan"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Button } from "primereact/button"

type TSelectedData = {
  id: number
  extension: string
  email: string
  keluhan: string
}

type TDialogDone = {
  selectedData: TSelectedData | undefined
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export default function DialogDone({ setVisible, selectedData }: TDialogDone) {
  const queryClient = useQueryClient()

  // post mutation function
  const deleteKeluhanMutation = useMutation({
    mutationFn: deleteKeluhan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["keluhan"] })
    },
  })

  const handleOnSubmit = () => {
    setVisible(false)
    deleteKeluhanMutation.mutate({ id: selectedData?.id })
  }

  return (
    selectedData && (
      <div className="h-5rem w-20rem flex justify-content-between flex-column">
        <div>Apakah tugas sudah diselesaikan?</div>
        <div>
          <div className="flex justify-content-end gap-2">
            <Button
              size="small"
              onClick={() => setVisible(false)}
              style={{ padding: "5px" }}
              className="bg-red-400 border-none"
            >
              Belum
            </Button>
            <Button
              size="small"
              onClick={handleOnSubmit}
              style={{ padding: "5px" }}
              className="bg-green-400 border-none"
            >
              Sudah
            </Button>
          </div>
        </div>
      </div>
    )
  )
}
