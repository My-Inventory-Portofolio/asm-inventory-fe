import Styles from "../styles/index.module.css"
import Login from "./inventory/utils/login"

export default function Home() {
  return (
    <div className={`${Styles.background} flex align-items-center`}>
      <Login />
    </div>
  )
}
