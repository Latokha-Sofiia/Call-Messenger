import * as styles from "./TodoNotification.module.scss"
import React from "react"
import {
  getIconForNotificationType,
  INotificationType,
} from "@/core/constants/Notifications/NotificationsTypes"
import NotificationItem from "@/core/constants/Notifications/NotificationItem"
export interface ITodoNotificationProps {
  id: string
  setActive: () => void
  childrenContent: string | undefined
  childrenTitle: string
  type: INotificationType
}

const TodoNotification: React.FC<ITodoNotificationProps> = ({
  childrenContent,
  childrenTitle,
  type,
}) => {
  const icon = getIconForNotificationType(type)

  return (
    <NotificationItem
      childrenTitle={childrenTitle}
      childrenContent={childrenContent}
      imgType={icon}
    />
  )
}

export default TodoNotification
