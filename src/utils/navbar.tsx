import { Button } from "primereact/button"
import Image from "next/image"

type VisibleType = {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export default function NavBar({ visible, setVisible }: VisibleType) {
  return (
    <div className="flex align-items-center pl-3 w-full justify-content-between">
      <div style={{ width: "20%" }}>
        <Button
          size="small"
          icon="pi pi-bars"
          onClick={() => setVisible(!visible)}
          tooltip="Sidebar"
          tooltipOptions={{ position: "bottom" }}
        />
      </div>
      <div
        className="flex align-items-center justify-content-center"
        style={{ width: "20%" }}
      >
        <Image
          src="https://erp.sampurna-group.com/assets/layout/images/logo-white.png"
          alt="ASM LOGO"
          width={30}
          height={30}
        />
        <div className="font-bold text-2xl ml-2">SAMPURNA GROUP</div>
      </div>
      <div className="bg-green-100" style={{ width: "20%" }}></div>
    </div>
  )
}
