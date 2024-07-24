import * as styles from "./Chat.module.scss"
import ConfItem from "@/components/shared/ChatItem/ConfItem"
import React from "react"
import { IOneChatOnSidebar } from "@/core/models"

interface IConfChatProps extends IOneChatOnSidebar {
  onClick: () => void
}

const Chat: React.FC<IConfChatProps> = ({
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
export default Chat
