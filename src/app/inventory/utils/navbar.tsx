import { Button } from "primereact/button"

type VisibleType = {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export default function NavBar({ visible, setVisible }: VisibleType) {
  return (
    <div className="flex align-items-center pl-3">
      <Button
        size="small"
        icon="pi pi-bars"
        onClick={() => setVisible(!visible)}
      />
    </div>
  )
}
