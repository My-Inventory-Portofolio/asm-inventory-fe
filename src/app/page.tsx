// import Styles from "../styles/index.module.css"
// import Login from "../utils/login"

// export default function Home() {
//   return (
//     <div className={`${Styles.background} flex align-items-center`}>
//       <Login />
//     </div>
//   )
// }

import BackgroundChanger from "./inventory/components/backgroundChanger/backgroundChanger"
import Login from "@/utils/login"
import styles from "../styles/index.module.css"

export default function Home() {
  return (
    <div className={styles.container}>
      <BackgroundChanger />

      <div className={styles.content}>
        <Login />
      </div>
    </div>
  )
}
