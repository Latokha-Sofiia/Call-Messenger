import * as styles from "./ConfChat.module.scss"
import ConfItem from "@/components/confPage/ConfOnSidebar/ConfItem/ConfItem"
import React from "react"
import { IOneChatOnSidebar } from "@/core/models"

interface IConfChatProps extends IOneChatOnSidebar {
  onClick: () => void
}

const ConfChat: React.FC<IConfChatProps> = ({
  title,
  date,
  photo_url,
  onClick,
}) => {
  return (
    <div className={styles.oneChat} onClick={onClick}>
      <ConfItem title={title} date={date} photo_url={photo_url}></ConfItem>
    </div>
  )
}
export default ConfChat
