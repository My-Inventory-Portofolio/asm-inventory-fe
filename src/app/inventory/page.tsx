// components
import InventoryComp from "./components/inventory"
import Auth from "@/utils/auth"

export default function HeadlessDemo() {
  return (
    <Auth>
      <InventoryComp />
    </Auth>
  )
}
