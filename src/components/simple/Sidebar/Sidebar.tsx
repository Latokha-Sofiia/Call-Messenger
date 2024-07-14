import * as React from "react"
import * as styles from "./Sidebar.module.scss"
import { Link } from "react-router-dom"

export const Sidebar = () => {
  return (
    <div className={styles.rainbowFrame}>
      <div className={styles.wrapper}>
        <img src="/icons/frame.svg" className={styles.logoWrapper} />

        <div className={styles.list}>
          <Link to={"/todos"} className={styles.listItem}>
            <img src="/icons/dash-board.svg" />
          </Link>
        </div>
        <div className={styles.list}>
          <Link to={"/calls"} className={styles.listItem}>
            <img src="/icons/chat.svg" />
          </Link>
        </div>
        <div className={styles.list}>
          <Link to={"/conferences"} className={styles.listItem}>
            <img src="/icons/scheduled-calls.svg" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
