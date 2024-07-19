import React from "react"
import { observer } from "mobx-react-lite"
import { notificationStore } from "@/core/store/NotificationStore/NotificationStore"
import TodoNotification from "@/core/constants/TodoNotification/TodoNotification"
import { INotificationType } from "../Notifications/NotificationsTypes"

const NotificationList = observer(() => {
  return (
    <>
      {notificationStore.notifications.map((notification) => (
        <TodoNotification
          id={notification.id}
          setActive={() =>
            notificationStore.removeNotification(notification.id)
          }
          childrenContent={notification.content}
          childrenTitle={notification.message}
          type={notification.type as INotificationType}
        />
      ))}
    </>
  )
})

export default NotificationList
