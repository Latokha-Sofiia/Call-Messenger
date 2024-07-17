import * as React from "react"
import * as styles from "./App.module.scss"
import { Outlet } from "react-router-dom"
import NavigationPanel from "./components/NavigationPanel/NavigationPanel"

export const App = () => {
  return (
    <div className={styles.wrapper}>
      <NavigationPanel></NavigationPanel>
      <div className={styles.main_content}>
        <Outlet />
      </div>
    </div>
  )
}

export default App
