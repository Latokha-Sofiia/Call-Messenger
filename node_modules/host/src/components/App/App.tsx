import * as React from "react"
import * as styles from "./App.module.scss"
import { Outlet } from "react-router-dom"
import Sidebar from "@/components/Sidebar/Sidebar"

export const App = () => {
  return (
    <div className={styles.wrapper}>
      <Sidebar></Sidebar>
      <div className={styles.main_content}>
        <Outlet />
      </div>
    </div>
  )
}

export default App
