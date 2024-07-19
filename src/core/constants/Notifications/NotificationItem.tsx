import React from "react"
import * as styles from "./Notification.module.scss"
interface INotificationProps {
  childrenContent: string
  childrenTitle: string
  imgType: string
}
const NotificationItem: React.FC<INotificationProps> = ({
  childrenContent,
  childrenTitle,
  imgType,
}) => {
  return (
    <div className={styles.modal}>
      <img className={styles.img} src={imgType} />

      <div className={styles.rainbowBorder}>
        <div className={styles.modal_content}>
          <div className={styles.title}>{childrenTitle}</div>
          <div className={styles.textContent}>{childrenContent}</div>
        </div>
      </div>
    </div>
  )
}

export default NotificationItem
