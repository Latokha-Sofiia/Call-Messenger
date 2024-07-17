import React from "react"
import * as styles from "./ConfItem.module.scss"

interface OneChatOnLeftPanel {
  title: string
  date: string
  photo_url: string
}
export const ConfItem: React.FC<OneChatOnLeftPanel> = ({
  title,
  date,
  photo_url,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.conferenceLogo}>
        <img src={photo_url} className={styles.photoConferenceGroup} />
        <img src="/icons/active-call.svg" className={styles.phoneLogo} />
      </div>
      <div className={styles.dataTextOfChat}>
        <div className={styles.titleOfChat}>{title}</div>
        <div className={styles.dataOfChat}>{date}</div>
      </div>
    </div>
  )
}

export default ConfItem
