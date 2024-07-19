import * as styles from "./ConfChat.module.scss"
import ConfItem from "@/components/confPage/ConfItem/ConfItem"
import React from "react"
import { IOneChatOnSidebar } from "@/core/models"

const ConfChat: React.FC<IOneChatOnSidebar> = ({ title, date, photo_url }) => {
  return (
    <div className={styles.oneChat}>
      <ConfItem title={title} date={date} photo_url={photo_url}></ConfItem>
    </div>
  )
}
export default ConfChat
